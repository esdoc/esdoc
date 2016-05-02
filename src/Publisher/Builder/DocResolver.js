import fs from 'fs';
import path from 'path';
import {markdown} from './util.js';

/**
 * Resolve various properties in doc object.
 */
export default class DocResolver {
  /**
   * create instance.
   * @param {DocBuilder} builder - target doc builder.
   */
  constructor(builder) {
    this._builder = builder;
    this._data = builder._data;
  }

  /**
   * resolve various properties.
   */
  resolve() {
    this._resolveExtendsChain();
    this._resolveNecessary();
    this._resolveAccess();
    this._resolveUnexportIdentifier();
    this._resolveUndocumentIdentifier();
    this._resolveDuplication();
    this._resolveIgnore();
    this._resolveLink();
    this._resolveMarkdown();
    this._resolveTestRelation();
  }

  /**
   * resolve ignore property.
   * remove docs that has ignore property.
   * @private
   */
  _resolveIgnore() {
    if (this._data.__RESOLVED_IGNORE__) return;

    let docs = this._builder._find({ignore: true});
    for (let doc of docs) {
      let longname = doc.longname.replace(/[$]/g, '\\$');
      let regex = new RegExp(`^${longname}[.~#]`);
      this._data({longname: {regex: regex}}).remove();
    }
    this._data({ignore: true}).remove();

    this._data.__RESOLVED_IGNORE__ = true;
  }

  /**
   * resolve access property.
   * if doc does not have access property, the doc is public.
   * but name is started with '-', the doc is private.
   * @private
   */
  _resolveAccess() {
    if (this._data.__RESOLVED_ACCESS__) return;

    let config = this._builder._config;
    let access = config.access || ['public', 'protected', 'private'];
    let autoPrivate = config.autoPrivate;

    this._data().update(function(){
      if (!this.access) {
        if (autoPrivate && this.name.charAt(0) === '_') {
          /** @ignore */
          this.access = 'private';
        } else {
          this.access = 'public';
        }
      }

      if (!access.includes(this.access)) /** @ignore */ this.ignore = true;

      return this;
    });

    this._data.__RESOLVED_ACCESS__ = true;
  }

  /**
   * resolve unexport identifier doc.
   * doc is added ignore property that is not exported.
   * @private
   */
  _resolveUnexportIdentifier() {
    if (this._data.__RESOLVED_UNEXPORT_IDENTIFIER__) return;

    let config = this._builder._config;
    if (!config.unexportIdentifier) {
      this._data({export: false}).update({ignore: true});
    }

    this._data.__RESOLVED_UNEXPORT_IDENTIFIER__ = true;
  }

  /**
   * resolve undocument identifier doc.
   * doc is added ignore property that does not have document tag.
   * @private
   */
  _resolveUndocumentIdentifier() {
    if (this._data.__RESOLVED_UNDOCUMENT_IDENTIFIER__) return;

    if (!this._builder._config.undocumentIdentifier) {
      this._builder._data({undocument: true}).update({ignore: true});
    }

    this._data.__RESOLVED_UNDOCUMENT_IDENTIFIER__ = true;
  }

  /**
   * resolve description as markdown.
   * @private
   */
  _resolveMarkdown() {
    if (this._data.__RESOLVED_MARKDOWN__) return;

    function convert(obj) {
      for (let key of Object.keys(obj)) {
        let value = obj[key];
        if (key === 'description' && typeof value === 'string') {
          obj[key + 'Raw'] = obj[key];
          obj[key] = markdown(value, false);
        } else if (typeof value === 'object' && value) {
          convert(value);
        }
      }
    }

    let docs = this._builder._find();
    for (let doc of docs) {
      convert(doc);
    }

    this._data.__RESOLVED_MARKDOWN__ = true;
  }

  /**
   * resolve @link as html link.
   * @private
   * @todo resolve all ``description`` property.
   */
  _resolveLink() {
    if(this._data.__RESOLVED_LINK__) return;

    let link = (str)=>{
      if (!str) return str;

      return str.replace(/\{@link ([\w\#_\-.:\~\/$]+)}/g, (str, longname)=>{
        return this._builder._buildDocLinkHTML(longname, longname);
      });
    };

    this._data().each((v)=>{
      v.description = link(v.description);

      if (v.params) {
        for (let param of v.params) {
          param.description = link(param.description);
        }
      }

      if (v.return) {
        v.return.description = link(v.return.description);
      }

      if (v.throws) {
        for (let _throw of v.throws) {
          _throw.description = link(_throw.description);
        }
      }

      if (v.see) {
        for (let i = 0; i < v.see.length; i++) {
          if (v.see[i].indexOf('{@link') === 0) {
            v.see[i] = link(v.see[i]);
          } else if(v.see[i].indexOf('<a href') === 0) {
            // ignore
          } else {
            v.see[i] = `<a href="${v.see[i]}">${v.see[i]}</a>`;
          }
        }
      }
    });

    this._data.__RESOLVED_LINK__ = true;
  }

  /**
   * resolve class extends chain.
   * add following special property.
   * - ``_custom_extends_chain``: ancestor class chain.
   * - ``_custom_direct_subclasses``: class list that direct extends target doc.
   * - ``_custom_indirect_subclasses``: class list that indirect extends target doc.
   * - ``_custom_indirect_implements``: class list that target doc indirect implements.
   * - ``_custom_direct_implemented``: class list that direct implements target doc.
   * - ``_custom_indirect_implemented``: class list that indirect implements target doc.
   *
   * @private
   */
  _resolveExtendsChain() {
    if (this._data.__RESOLVED_EXTENDS_CHAIN__) return;

    let extendsChain = (doc) => {
      if (!doc.extends) return;

      let selfDoc = doc;

      // traverse super class.
      let chains = [];
      while (1) {
        if (!doc.extends) break;

        let superClassDoc = this._builder._findByName(doc.extends[0])[0];
        if (superClassDoc) {
          chains.push(superClassDoc.longname);
          doc = superClassDoc;
        } else {
          chains.push(doc.extends[0]);
          break;
        }
      }

      if (chains.length) {
        // direct subclass
        let superClassDoc = this._builder._findByName(chains[0])[0];
        if (superClassDoc) {
          if (!superClassDoc._custom_direct_subclasses) superClassDoc._custom_direct_subclasses = [];
          superClassDoc._custom_direct_subclasses.push(selfDoc.longname);
        }

        // indirect subclass
        for (let superClassLongname of chains.slice(1)) {
          superClassDoc = this._builder._findByName(superClassLongname)[0];
          if (superClassDoc) {
            if (!superClassDoc._custom_indirect_subclasses) superClassDoc._custom_indirect_subclasses = [];
            superClassDoc._custom_indirect_subclasses.push(selfDoc.longname);
          }
        }

        // indirect implements and mixes
        for (let superClassLongname of chains) {
          superClassDoc = this._builder._findByName(superClassLongname)[0];
          if (!superClassDoc) continue;

          // indirect implements
          if (superClassDoc.implements) {
            if (!selfDoc._custom_indirect_implements) selfDoc._custom_indirect_implements = [];
            selfDoc._custom_indirect_implements.push(...superClassDoc.implements);
          }

          // indirect mixes
          //if (superClassDoc.mixes) {
          //  if (!selfDoc._custom_indirect_mixes) selfDoc._custom_indirect_mixes = [];
          //  selfDoc._custom_indirect_mixes.push(...superClassDoc.mixes);
          //}
        }

        // extends chains
        selfDoc._custom_extends_chains = chains.reverse();
      }
    };

    let implemented = (doc) =>{
      let selfDoc = doc;

      // direct implemented (like direct subclass)
      for (let superClassLongname of selfDoc.implements || []) {
        let superClassDoc = this._builder._findByName(superClassLongname)[0];
        if (!superClassDoc) continue;
        if(!superClassDoc._custom_direct_implemented) superClassDoc._custom_direct_implemented = [];
        superClassDoc._custom_direct_implemented.push(selfDoc.longname);
      }

      // indirect implemented (like indirect subclass)
      for (let superClassLongname of selfDoc._custom_indirect_implements || []) {
        let superClassDoc = this._builder._findByName(superClassLongname)[0];
        if (!superClassDoc) continue;
        if(!superClassDoc._custom_indirect_implemented) superClassDoc._custom_indirect_implemented = [];
        superClassDoc._custom_indirect_implemented.push(selfDoc.longname);
      }
    };

    //var mixed = (doc) =>{
    //  var selfDoc = doc;
    //
    //  // direct mixed (like direct subclass)
    //  for (var superClassLongname of selfDoc.mixes || []) {
    //    var superClassDoc = this._builder._find({longname: superClassLongname})[0];
    //    if (!superClassDoc) continue;
    //    if(!superClassDoc._custom_direct_mixed) superClassDoc._custom_direct_mixed = [];
    //    superClassDoc._custom_direct_mixed.push(selfDoc.longname);
    //  }
    //
    //  // indirect mixed (like indirect subclass)
    //  for (var superClassLongname of selfDoc._custom_indirect_mixes || []) {
    //    var superClassDoc = this._builder._find({longname: superClassLongname})[0];
    //    if (!superClassDoc) continue;
    //    if(!superClassDoc._custom_indirect_mixed) superClassDoc._custom_indirect_mixed = [];
    //    superClassDoc._custom_indirect_mixed.push(selfDoc.longname);
    //  }
    //};

    let docs = this._builder._find({kind: 'class'});
    for (let doc of docs) {
      extendsChain(doc);
      implemented(doc);
      //mixed(doc);
    }

    this._data.__RESOLVED_EXTENDS_CHAIN__ = true;
  }

  /**
   * resolve necessary identifier.
   *
   * ```javascript
   * class Foo {}
   *
   * export default Bar extends Foo {}
   * ```
   *
   * ``Foo`` is not exported, but ``Bar`` extends ``Foo``.
   * ``Foo`` is necessary.
   * So, ``Foo`` must be exported by force.
   *
   * @private
   */
  _resolveNecessary() {
    let builder = this._builder;
    this._data({export: false}).update(function() {
      let doc = this;
      let childNames = [];
      if (doc._custom_direct_subclasses) childNames.push(...doc._custom_direct_subclasses);
      if (doc._custom_indirect_subclasses) childNames.push(...doc._custom_indirect_subclasses);
      if (doc._custom_direct_implemented) childNames.push(...doc._custom_direct_implemented);
      if (doc._custom_indirect_implemented) childNames.push(...doc._custom_indirect_implemented);

      for (let childName of childNames) {
        let childDoc = builder._find({longname: childName})[0];
        if (!childDoc) continue;
        if (!childDoc.ignore && childDoc.export) {
          doc.export = true;
          return doc;
        }
      }
    });
  }

  /**
   * resolve test and identifier relation. add special property.
   * - ``_custom_tests``: longnames of test doc.
   * - ``_custom_test_targets``: longnames of identifier.
   *
   * @private
   */
  _resolveTestRelation() {
    if (this._data.__RESOLVED_TEST_RELATION__) return;

    let testDocs = this._builder._find({kind: ['testDescribe', 'testIt']});
    for (let testDoc of testDocs) {
      let testTargets = testDoc.testTargets;
      if (!testTargets) continue;

      for (let testTarget of testTargets) {
        let doc = this._builder._findByName(testTarget)[0];
        if (doc) {
          if (!doc._custom_tests) doc._custom_tests = [];
          doc._custom_tests.push(testDoc.longname);

          if (!testDoc._custom_test_targets) testDoc._custom_test_targets = [];
          testDoc._custom_test_targets.push([doc.longname, testTarget]);
        } else {
          if (!testDoc._custom_test_targets) testDoc._custom_test_targets = [];
          testDoc._custom_test_targets.push([testTarget, testTarget]);
        }
      }
    }

    // test full description
    for (let testDoc of testDocs) {
      let desc = [];
      let parents = (testDoc.memberof.split('~')[1] || '').split('.');
      for (let parent of parents) {
        let doc = this._builder._find({kind: ['testDescribe', 'testIt'], name: parent})[0];
        if (!doc) continue;
        desc.push(doc.descriptionRaw);
      }
      desc.push(testDoc.descriptionRaw);
      testDoc.testFullDescription = desc.join(' ');
    }

    this._data.__RESOLVED_TEST_RELATION__ = true;
  }

  /**
   * resolve duplication identifier.
   * member doc is possible duplication.
   * other doc is not duplication.
   * @private
   */
  _resolveDuplication() {
    if (this._data.__RESOLVED_DUPLICATION__) return;

    let docs = this._builder._find({kind: 'member'});
    let ignoreId = [];
    for (let doc of docs) {
      // member duplicate with getter/setter/method.
      // when it, remove member.
      // getter/setter/method are high priority.
      const nonMemberDup = this._builder._find(
        {longname: doc.longname, kind: {'!is': 'member'}},
        // should use isUndefined here but using a function instead
        // because of https://github.com/typicaljoe/taffydb/issues/114
        function() { return !this.ignore; });

      if (nonMemberDup.length) {
        ignoreId.push(doc.___id);
        continue;
      }

      let dup = this._builder._find({longname: doc.longname, kind: 'member'});
      if (dup.length > 1) {
        let ids = dup.map(v => v.___id);
        ids.sort((a, b)=> {
          return a < b ? -1 : 1;
        });
        ids.shift();
        ignoreId.push(...ids)
      }
    }

    this._data({___id: ignoreId}).update({ignore: true});

    this._data.__RESOLVED_DUPLICATION__ = true;
  }
}
