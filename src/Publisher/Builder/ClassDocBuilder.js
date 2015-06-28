import IceCap from 'ice-cap';
import DocBuilder from './DocBuilder.js';

/**
 * Class Output Builder class.
 */
export default class ClassDocBuilder extends DocBuilder {
  /**
   * execute building output.
   * @param {function(html: string, filePath: string)} callback - is called each class.
   */
  exec(callback) {
    let ice = this._buildLayoutDoc();
    ice.autoDrop = false;
    let docs = this._find({kind: ['class']});
    for (let doc of docs) {
      let fileName = this._getOutputFileName(doc);
      let baseUrl = this._getBaseUrl(fileName);
      let title = this._getTitle(doc);
      ice.load('content', this._buildClassDoc(doc), IceCap.MODE_WRITE);
      ice.attr('baseUrl', 'href', baseUrl, IceCap.MODE_WRITE);
      ice.text('title', title, IceCap.MODE_WRITE);
      callback(ice.html, fileName);
    }
  }

  /**
   * build class output.
   * @param {DocObject} doc - class doc object.
   * @returns {IceCap} built output.
   * @private
   */
  _buildClassDoc(doc) {
    let extendsChain = this._buildExtendsChainHTML(doc);
    let directSubclass = this._buildDirectSubclassHTML(doc);
    let indirectSubclass = this._buildIndirectSubclassHTML(doc);

    let ice = new IceCap(this._readTemplate('class.html'));

    // header
    if (doc.export && doc.importPath && doc.importStyle) {
      let link = this._buildFileDocLinkHTML(doc, doc.importPath);
      ice.into('importPath', `import ${doc.importStyle} from '${link}'`, (code, ice)=>{
        ice.load('importPathCode', code);
      });
    }
    ice.text('access', doc.access);
    ice.text('kind', doc.interface ? 'interface' : 'class');
    ice.load('source', this._buildFileDocLinkHTML(doc, 'source'), 'append');
    ice.text('since', doc.since, 'append');
    ice.text('version', doc.version, 'append');
    ice.load('variation', this._buildVariationHTML(doc), 'append');

    // extends chain
    ice.load('extendsChain', extendsChain, 'append');
    ice.load('directSubclass', directSubclass, 'append');
    ice.load('indirectSubclass', indirectSubclass, 'append');
    ice.load('implements', this._buildDocsLinkHTML(doc.implements, null, false, ', '), 'append');
    ice.load('indirectImplements', this._buildDocsLinkHTML(doc._custom_indirect_implements, null, false, ', '), 'append');
    ice.load('directImplemented', this._buildDocsLinkHTML(doc._custom_direct_implemented, null, false, ', '), 'append');
    ice.load('indirectImplemented', this._buildDocsLinkHTML(doc._custom_indirect_implemented, null, false, ', '), 'append');

    // self
    ice.text('name', doc.name);
    ice.drop('instanceExport', !doc.instanceExport);
    ice.load('description', doc.description);
    ice.load('deprecated', this._buildDeprecatedHTML(doc));
    ice.load('experimental', this._buildExperimentalHTML(doc));
    ice.load('see', this._buildDocsLinkHTML(doc.see), 'append');
    ice.load('todo', this._buildDocsLinkHTML(doc.todo), 'append');

    ice.into('exampleDocs', doc.examples, (examples, ice)=>{
      ice.loop('exampleDoc', examples, (i, example, ice)=>{
        ice.text('exampleCode', example);
      });
    });

    ice.into('tests', doc._custom_tests, (tests, ice)=>{
      ice.loop('test', tests, (i, test, ice)=>{
        let testDoc = this._find({longname: test})[0];
        ice.load('test', this._buildFileDocLinkHTML(testDoc, testDoc.testFullDescription));
      });
    });

    // summary
    ice.load('staticMemberSummary', this._buildSummaryHTML(doc, 'member', 'Members', true));
    ice.load('staticMethodSummary', this._buildSummaryHTML(doc, 'method', 'Methods', true));
    ice.load('constructorSummary', this._buildSummaryHTML(doc, 'constructor', 'Constructor', false));
    ice.load('memberSummary', this._buildSummaryHTML(doc, 'member', 'Members', false));
    ice.load('methodSummary', this._buildSummaryHTML(doc, 'method', 'Methods', false));

    ice.load('inheritedSummary', this._buildInheritedSummaryHTML(doc), 'append');

    // detail
    ice.load('staticMemberDetails', this._buildDetailHTML(doc, 'member', 'Members', true));
    ice.load('staticMethodDetails', this._buildDetailHTML(doc, 'method', 'Methods', true));
    ice.load('constructorDetails', this._buildDetailHTML(doc, 'constructor', 'Constructors', false));
    ice.load('memberDetails', this._buildDetailHTML(doc, 'member', 'Members', false));
    ice.load('methodDetails', this._buildDetailHTML(doc, 'method', 'Methods', false));

    return ice;
  }

  /**
   * build variation of doc.
   * @param {DocObject} doc - target doc object.
   * @returns {string} variation links html.
   * @private
   * @experimental
   */
  _buildVariationHTML(doc) {
    var variationDocs = this._find({memberof: doc.memberof, name: doc.name});
    var html = [];
    for (var variationDoc of variationDocs) {
      if (variationDoc.variation === doc.variation) continue;

      html.push(this._buildDocLinkHTML(variationDoc.longname, `(${variationDoc.variation || 1})`));
    }

    return html.join(', ');
  }

  /**
   * build class ancestor extends chain.
   * @param {DocObject} doc - target class doc.
   * @returns {string} extends chain links html.
   * @private
   */
  _buildExtendsChainHTML(doc) {
    if (!doc._custom_extends_chains) return;

    var links = [];
    for (var longname of doc._custom_extends_chains) {
      links.push(this._buildDocLinkHTML(longname));
    }

    links.push(doc.name);

    return `<div>${links.join(' → ')}</div>`;
  }

  /**
   * build in-direct subclass list.
   * @param {DocObject} doc - target class doc.
   * @returns {string} html of in-direct subclass links.
   * @private
   */
  _buildIndirectSubclassHTML(doc) {
    if (!doc._custom_indirect_subclasses) return '';

    var links = [];
    for (var longname of doc._custom_indirect_subclasses) {
      links.push(this._buildDocLinkHTML(longname));
    }

    return `<div>${links.join(', ')}</div>`;
  }

  /**
   * build direct subclass list.
   * @param {DocObject} doc - target class doc.
   * @returns {string} html of direct subclass links.
   * @private
   */
  _buildDirectSubclassHTML(doc) {
    if (!doc._custom_direct_subclasses) return '';

    var links = [];
    for (var longname of doc._custom_direct_subclasses) {
      links.push(this._buildDocLinkHTML(longname));
    }

    return `<div>${links.join(', ')}</div>`;
  }

  /**
   * build inherited method/member summary.
   * @param {DocObject} doc - target class doc.
   * @returns {string} html of inherited method/member from ancestor classes.
   * @private
   */
  _buildInheritedSummaryHTML(doc) {
    if (['class', 'interface'].indexOf(doc.kind) === -1) return '';

    let longnames = [
      ...doc._custom_extends_chains || []
      //...doc.implements || [],
      //...doc._custom_indirect_implements || [],
    ];

    let html = [];
    for (let longname of longnames) {
      let superDoc = this._find({longname})[0];

      if (!superDoc) continue;

      let targetDocs = this._find({memberof: longname, kind: ['member', 'method', 'get', 'set']});

      targetDocs.sort((a, b)=>{
        if (a.static !== b.static) return -(a.static - b.static);

        let order = {get: 0, set: 0, member: 1, method: 2};
        if (order[a.kind] !== order[b.kind]) {
          return order[a.kind] - order[b.kind];
        }

        order = {public: 0, protected: 1, private: 2};
        if (a.access != b.access) return order[a.access] - order[b.access];

        if (a.name !== b.name) return a.name < b.name ? -1 : 1;

        order = {get: 0, set: 1, member: 2};
        return order[a.kind] - order[b.kind];
      });

      let title = `<span class="toggle closed"></span> From ${superDoc.kind} ${this._buildDocLinkHTML(longname, superDoc.name)}`;
      let result = this._buildSummaryDoc(targetDocs, '----------', false, superDoc.kind);
      if (result) {
        result.load('title', title, IceCap.MODE_WRITE);
        html.push(result.html);
      }
    }

    return html.join('\n');
  }
}
