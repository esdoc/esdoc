import fs from 'fs';
import path from 'path';

export default class DocResolver {
  constructor(builder) {
    this._builder = builder;
    this._data = builder._data;
  }

  resolve() {
    this._resolveGlobalNamespace();
    this._resolveIgnore();
    this._resolveCustomTag();
    this._resolveEventDoc();
    this._resolveRequires();
    this._resolveAccess();
    this._resolveLink();
    this._resolveCallback();
    this._resolveSourceCode();
    this._resolveExtendsChain();
    this._resolveFileAbsPath();
    this._resolveImportPath();
  }

  _resolveIgnore() {
    if (this._data.__RESOLVED_IGNORE__) return;

    var docs = this._builder._find({ignore: true});
    for (var doc of docs) {
      var regex = new RegExp(`^${doc.longname}[.~#]`);
      this._data({longname: {regex: regex}}).remove();
    }
    this._data({ignore: true}).remove();

    this._data.__RESOLVED_IGNORE__ = true;
  }

  _resolveAccess() {
    if (this._data.__RESOLVED_ACCESS__) return;

    this._builder._data({access: {isUndefined: true}}).update({access: 'public'});

    this._data.__RESOLVED_ACCESS__ = true;
  }

  _resolveGlobalNamespace() {
    if (this._data.__RESOLVED_GLOBAL_NAMESPACE__) return;

    if (this._builder._config) {
      if ('global' in this._builder._config.cloudy) {
        if (!this._builder._config.cloudy.global) {
          return;
        }
      }
    }

    var docs = this._builder._find({memberof: {isUndefined: true}});
    if (docs.length) {
      for (var doc of docs) {
        doc.memberof = '@global';
      }

      var globalNamespaceDoc = {
        comment: '',
        longname: '@global',
        name: '@global',
        kind: 'namespace',
        description: 'global object.',
        memberof: '@global'
      };
      this._data.insert(globalNamespaceDoc);
    }

    this._data.__RESOLVED_GLOBAL_NAMESPACE__ = true;
  }

  _resolveCustomTag() {
    if (this._data.__RESOLVED_CUSTOM_TAG__) return;

    var docs = this._builder._find({tags: {isUndefined: false}});
    for (var doc of docs) {
      var tags = doc.tags;
      for (var tag of tags) {
        if (tag.originalTitle === 'fileexample') {
          if (!doc.fileexamples) doc.fileexamples = [];
          doc.fileexamples.push(tag.text);
        } else if (tag.originalTitle === 'experimental') {
          doc.experimental = tag.text;
        }
      }
    }

    this._data.__RESOLVED_CUSTOM_TAG__ = true;
  }

  _resolveLink() {
    if(this._data.__RESOLVED_LINK__) return;

    var link = (str)=>{
      if (!str) return str;

      return str.replace(/\{@link ([\w\#_\-.:\~\/]+)}/g, (str, longname)=>{
        return this._builder._buildDocLinkHTML(longname);
      });
    };

    this._data().each((v)=>{
      v.description = link(v.description);

      if (v.classdesc) {
        v.classdesc = link(v.classdesc);
      }

      if (v.params) {
        for (var param of v.params) {
          param.description = link(param.description);
        }
      }

      if (v.returns) {
        for (var returnParam of v.returns) {
          returnParam.description = link(returnParam.description);
        }
      }

      if (v.exceptions) {
        for (var e of v.exceptions) {
          e.description = link(e.description);
        }
      }

      if (v.see) {
        for (var i = 0; i < v.see.length; i++) {
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

  _resolveCallback() {
    if (this._data.__RESOLVED_CALLBACK__) return;

    var typedefDocs = this._builder._find({kind: 'typedef'});
    for (var typedefDoc of typedefDocs) {
      if (typedefDoc.comment.search(/\* +@callback +[\w_$]+/) !== -1) {
        typedefDoc._custom_is_callback = true;
      } else {
        typedefDoc._custom_is_callback = false;
      }
    }

    this._data.__RESOLVED_CALLBACK__ = true;
  }

  _resolveSourceCode() {
    if (this._data.__RESOLVED_SOURCE_CODE__) return;

    var docs = this._builder._find({kind: 'file'});
    for (var doc of docs) {
      var filePath = path.resolve(doc.meta.path, doc.meta.filename);
      var sourceCode = fs.readFileSync(filePath, {encode: 'utf-8'});
      doc._custom_source_code = sourceCode;
    }

    this._data.__RESOLVED_SOURCE_CODE__ = true;
  }

  _resolveExtendsChain() {
    if (this._data.__RESOLVED_EXTENDS_CHAIN__) return;

    var extendsChain = (doc) => {
      if (!doc.augments) return;

      var selfDoc = doc;

      // traverse super class.
      var chains = [];
      while (1) {
        if (!doc.augments) break;

        var superClassDoc = this._builder._find({longname: doc.augments[0]})[0];
        if (superClassDoc) {
          chains.push(superClassDoc.longname);
          doc = superClassDoc;
        } else {
          chains.push(doc.augments[0]);
          break;
        }
      }

      if (chains.length) {
        // direct subclass
        var superClassDoc = this._builder._find({longname: chains[0]})[0];
        if (superClassDoc) {
          if (!superClassDoc._custom_direct_subclasses) superClassDoc._custom_direct_subclasses = [];
          superClassDoc._custom_direct_subclasses.push(selfDoc.longname);
        }

        // indirect subclass
        for (var superClassLongname of chains.slice(1)) {
          var superClassDoc = this._builder._find({longname: superClassLongname})[0];
          if (superClassDoc) {
            if (!superClassDoc._custom_indirect_subclasses) superClassDoc._custom_indirect_subclasses = [];
            superClassDoc._custom_indirect_subclasses.push(selfDoc.longname);
          }
        }

        // indirect implements and mixes
        for (var superClassLongname of chains) {
          var superClassDoc = this._builder._find({longname: superClassLongname})[0];
          if (!superClassDoc) continue;

          // indirect implements
          if (superClassDoc.implements) {
            if (!selfDoc._custom_indirect_implements) selfDoc._custom_indirect_implements = [];
            selfDoc._custom_indirect_implements.push(...superClassDoc.implements);
          }

          // indirect mixes
          if (superClassDoc.mixes) {
            if (!selfDoc._custom_indirect_mixes) selfDoc._custom_indirect_mixes = [];
            selfDoc._custom_indirect_mixes.push(...superClassDoc.mixes);
          }
        }

        // extends chains
        selfDoc._custom_extends_chains = chains.reverse();
      }
    };

    var implemented = (doc) =>{
      var selfDoc = doc;

      // direct implemented (like direct subclass)
      for (var superClassLongname of selfDoc.implements || []) {
        var superClassDoc = this._builder._find({longname: superClassLongname})[0];
        if (!superClassDoc) continue;
        if(!superClassDoc._custom_direct_implemented) superClassDoc._custom_direct_implemented = [];
        superClassDoc._custom_direct_implemented.push(selfDoc.longname);
      }

      // indirect implemented (like indirect subclass)
      for (var superClassLongname of selfDoc._custom_indirect_implements || []) {
        var superClassDoc = this._builder._find({longname: superClassLongname})[0];
        if (!superClassDoc) continue;
        if(!superClassDoc._custom_indirect_implemented) superClassDoc._custom_indirect_implemented = [];
        superClassDoc._custom_indirect_implemented.push(selfDoc.longname);
      }
    };

    var mixed = (doc) =>{
      var selfDoc = doc;

      // direct mixed (like direct subclass)
      for (var superClassLongname of selfDoc.mixes || []) {
        var superClassDoc = this._builder._find({longname: superClassLongname})[0];
        if (!superClassDoc) continue;
        if(!superClassDoc._custom_direct_mixed) superClassDoc._custom_direct_mixed = [];
        superClassDoc._custom_direct_mixed.push(selfDoc.longname);
      }

      // indirect mixed (like indirect subclass)
      for (var superClassLongname of selfDoc._custom_indirect_mixes || []) {
        var superClassDoc = this._builder._find({longname: superClassLongname})[0];
        if (!superClassDoc) continue;
        if(!superClassDoc._custom_indirect_mixed) superClassDoc._custom_indirect_mixed = [];
        superClassDoc._custom_indirect_mixed.push(selfDoc.longname);
      }
    };

    var docs = this._builder._find({kind: ['class', 'interface', 'mixin']});
    for (var doc of docs) {
      extendsChain(doc);
      implemented(doc);
      mixed(doc);
    }

    this._data.__RESOLVED_EXTENDS_CHAIN__ = true;
  }

  _resolveEventDoc() {
    if (this._builder._data.__RESOLVED_EVENT_DOC__) return;

    // JSDoc 3.3.0-beta1 (Wed, 21 Jan 2015 17:41:43 GMT)
    // jsdoc has bug for `event`. for example, write jsdoc under comment.
    //
    // /**
    //  * @module module1
    //  */
    // /**
    //  * @event Event1
    //  */
    //
    // correctly is {longname: 'module:module1~event:Event1}
    // but {longname: 'event:Event1'}
    // so, I patch to avoid this bug.

    var docs = this._builder._find({kind: 'event'});
    for (var doc of docs) {
      var longname = doc.longname;
      var memberof = doc.memberof;

      if (longname.indexOf(memberof) === 0) continue;

      var parentDoc = this._builder._find({longname: memberof})[0];
      switch (parentDoc.kind) {
        case 'module':
          if (doc.scope === 'inner') {
            doc.longname = `${memberof}~${longname}`;
          } else {
            doc.longname = `${memberof}.${longname}`;
          }
          break;
        default:
          doc.longname = `${memberof}.${longname}`;
          break;
      }
    }

    this._builder._data.__RESOLVED_EVENT_DOC__ = true;
  }

  _resolveRequires() {
    if (this._builder._data.__RESOLVED_REQUIRES__) return;

    // JSDoc 3.3.0-beta1 (Wed, 21 Jan 2015 17:41:43 GMT)
    // jsdoc has bug for `@requires`. for example, write jsdoc under comment.
    //
    // /**
    //  * @module module1
    //  * @requires external:XMLHttpRequest
    //  */
    //
    // correctly is {requires: ['external:XMLHttpRequest']}
    // but {requires: ['module:external:XMLHttpRequest']}
    // so, I patch to avoid this bug.

    var docs = this._builder._find({requires: {isUndefined: false}});
    for (var doc of docs) {
      var requires = [];
      for (var require of doc.requires) {
        if (require.indexOf('module:external:') === 0) {
          require = require.replace('module:', '');
        }
        requires.push(require);
      }
      doc.requires = requires;
    }

    this._builder._data.__RESOLVED_REQUIRES__ = true;
  }

  _resolveFileAbsPath() {
    if (this._builder._data.__RESOLVED_FILE_LONGNAME__) return;

    this._builder._data({kind: 'file'}).update(function(){
      this._custom_file_abs_path = this.meta.path + path.sep + this.meta.filename;
      return this;
    });

    this._builder._data.__RESOLVED_FILE_LONGNAME__ = true;
  }

  _resolveImportPath() {
    if (this._builder._data.__RESOLVED_IMPORT_PATH__) return;

    let prefix = null;
    if (!this._builder._config) return;
    if ('importPath' in this._builder._config.cloudy) {
      prefix = this._builder._config.cloudy.importPath;
    } else {
      return;
    }

    let inDirPath = this._builder._option._[0];
    inDirPath = path.resolve(inDirPath);

    this._builder._data({kind: ['class', 'interface', 'mixin']}).update(function(){
      if (this.meta) {
        let filePath = this.meta.path + path.sep + this.meta.filename;
        let relativeFilePath = path.relative(inDirPath, filePath);
        let importPath = path.normalize(prefix + path.sep + relativeFilePath);
        this._custom_import_path = importPath;
        return this;
      }
    });

    this._builder._data.__RESOLVED_IMPORT_PATH__ = true;
  }
}
