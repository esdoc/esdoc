import IceCap from 'ice-cap';
import DocBuilder from './DocBuilder.js';

export default class ObjectDocBuilder extends DocBuilder {
  exec(callback) {
    var ice = this._buildLayoutDoc();
    ice.autoDrop = false;
    var docs = this._find({kind: ['class']});
    for (var doc of docs) {
      ice.load('content', this._buildObjectDoc(doc), IceCap.MODE_WRITE);
      //ice.load('fileFooter', this._buildFileFooterHTML(doc), IceCap.MODE_WRITE);
      var fileName = this._getOutputFileName(doc);
      callback(ice.html, fileName);
    }
  }

  _buildObjectDoc(doc) {
    var extendsChain = this._buildExtendsChainHTML(doc);
    var directSubclass = this._buildDirectSubclassHTML(doc);
    var indirectSubclass = this._buildIndirectSubclassHTML(doc);

    var ice = new IceCap(this._readTemplate('object.html'));

    // header
    if (doc.importPath) {
      ice.drop('memberof');
      ice.into('importPath', `import ${doc.importStyle} from '${doc.importPath}'`, (code, ice)=>{
        ice.text('importPathCode', code);
      });
    } else {
      ice.load('memberof', this._buildDocLinkHTML(doc.memberof));
      ice.drop('importPath');
    }
    ice.text('access', doc.access);
    ice.text('kind', doc.kind);
    ice.load('file', this._buildFileDocLinkHTML(doc), 'append');
    ice.text('since', doc.since, 'append');
    ice.text('version', doc.version, 'append');
    ice.load('variation', this._buildVariationHTML(doc), 'append');

    // extends chain
    ice.load('extendsChain', extendsChain, 'append');
    ice.load('directSubclass', directSubclass, 'append');
    ice.load('indirectSubclass', indirectSubclass, 'append');
    ice.load('implements', this._buildDocsLinkHTML(doc.implements, null, false, ', '), 'append');
    ice.load('indirectImplements', this._buildDocsLinkHTML(doc._custom_indirect_implements, null, false, ', '), 'append');
    ice.load('mixes', this._buildDocsLinkHTML(doc.mixes, null, false, ', '), 'append');
    ice.load('indirectMixes', this._buildDocsLinkHTML(doc._custom_indirect_mixes, null, false, ', '), 'append');
    ice.load('directImplemented', this._buildDocsLinkHTML(doc._custom_direct_implemented, null, false, ', '), 'append');
    ice.load('indirectImplemented', this._buildDocsLinkHTML(doc._custom_indirect_implemented, null, false, ', '), 'append');
    ice.load('directMixed', this._buildDocsLinkHTML(doc._custom_direct_mixed, null, false, ', '), 'append');
    ice.load('indirectMixed', this._buildDocsLinkHTML(doc._custom_indirect_mixed, null, false, ', '), 'append');

    // self
    ice.text('name', doc.name);
    ice.load('description', doc.description);
    ice.load('deprecated', this._buildDeprecatedHTML(doc));
    ice.load('experimental', this._buildExperimentalHTML(doc));
    ice.load('require', this._buildDocsLinkHTML(doc.requires), 'append');
    ice.load('author', this._buildAuthorHTML(doc), 'append');
    ice.load('see', this._buildDocsLinkHTML(doc.see), 'append');
    ice.load('todo', this._buildDocsLinkHTML(doc.todo), 'append');

    // file example
    //ice.into('fileexampleDocs', doc.fileexamples, (fileexamples, ice)=>{
    //  ice.loop('fileexampleDoc', fileexamples, (i, filexample, ice)=>{
    //    ice.text('fileexampleCode', filexample);
    //  });
    //});

    // summary
    ice.load('namespaceSummary', this._buildSummaryHTML(doc, 'namespace', 'Namespaces'));
    ice.load('classSummary', this._buildSummaryHTML(doc, 'class', 'Classes'));
    //ice.load('interfaceSummary', this._buildSummaryHTML(doc, 'interface', 'Interfaces'));
    //ice.load('mixinSummary', this._buildSummaryHTML(doc, 'mixin', 'Mixin'));
    // todo: get, set
    ice.load('staticMemberSummary', this._buildSummaryHTML(doc, 'member', 'Members', true));
    ice.load('staticMethodSummary', this._buildSummaryHTML(doc, 'method', 'Methods', true));
    ice.load('constructorSummary', this._buildSummaryHTML(doc, 'constructor', 'Constructor'));
    ice.load('memberSummary', this._buildSummaryHTML(doc, 'member', 'Members', false));
    ice.load('methodSummary', this._buildSummaryHTML(doc, 'method', 'Methods', false));
    ice.load('typedefSummary', this._buildSummaryHTML(doc, 'typedef', 'Typedefs'));
    ice.load('eventSummary', this._buildSummaryHTML(doc, 'event', 'Events'));
    ice.load('constSummary', this._buildSummaryHTML(doc, 'constant', 'Constants'));
    ice.load('enumSummary', this._buildSummaryHTML(doc, 'enum', 'Enums'));
    ice.load('callbackSummary', this._buildSummaryHTML(doc, 'callback', 'callback'));

    ice.load('inheritedSummary', this._buildInheritedSummaryHTML(doc), 'append');

    // detail
    // todo: get, set
    ice.load('staticMemberDetails', this._buildDetailHTML(doc, 'member', 'Members', true));
    ice.load('staticMethodDetails', this._buildDetailHTML(doc, 'method', 'Methods', true));
    ice.load('constructorDetails', this._buildDetailHTML(doc, 'constructor', 'Constructors'));
    ice.load('memberDetails', this._buildDetailHTML(doc, 'member', 'Members', false));
    ice.load('methodDetails', this._buildDetailHTML(doc, 'method', 'Methods', false));
    ice.load('typedefDetails', this._buildDetailHTML(doc, 'typedef', 'Typedefs'));
    ice.load('eventDetails', this._buildDetailHTML(doc, 'event', 'Events'));
    ice.load('constDetails', this._buildDetailHTML(doc, 'constant', 'Constants'));
    ice.load('enumDetails', this._buildDetailHTML(doc, 'enum', 'Enums'));
    ice.load('callbackDetails', this._buildDetailHTML(doc, 'callback', 'Callbacks'));

    // source code
    //ice.into('sourceCodeWrap', doc._custom_source_code, (sourceCode, ice)=>{
    //  ice.text('sourceCode', sourceCode);
    //});

    return ice;
  }

  _buildVariationHTML(doc) {
    var variationDocs = this._find({memberof: doc.memberof, name: doc.name});
    var html = [];
    for (var variationDoc of variationDocs) {
      if (variationDoc.variation === doc.variation) continue;

      html.push(this._buildDocLinkHTML(variationDoc.longname, `(${variationDoc.variation || 1})`));
    }

    return html.join(', ');
  }

  _buildExtendsChainHTML(doc) {
    if (!doc._custom_extends_chains) return;

    var links = [];
    for (var longname of doc._custom_extends_chains) {
      links.push(this._buildDocLinkHTML(longname));
    }

    links.push(doc.name);

    return links.join(' → ');
  }

  _buildIndirectSubclassHTML(doc) {
    if (!doc._custom_indirect_subclasses) return;

    var links = [];
    for (var longname of doc._custom_indirect_subclasses) {
      links.push(this._buildDocLinkHTML(longname));
    }
    return links.join(', ');
  }

  _buildDirectSubclassHTML(doc) {
    if (!doc._custom_direct_subclasses) return;

    var links = [];
    for (var longname of doc._custom_direct_subclasses) {
      links.push(this._buildDocLinkHTML(longname));
    }
    return links.join(', ');
  }

  _buildInheritedSummaryHTML(doc) {
    if (['class', 'interface'].indexOf(doc.kind) === -1) return;

    let longnames = [
      ...doc._custom_extends_chains || [],
      ...doc.implements || [],
      ...doc._custom_indirect_implements || [],
      ...doc.mixes || [],
      ...doc._custom_indirect_mixes || []
    ];

    let html = [];
    for (let longname of longnames) {
      let superDoc = this._find({longname})[0];

      if (!superDoc) continue;

      let targetDocs = this._orderedFind('static desc, kind desc, access desc', {
        memberof: longname,
        kind: ['member', 'method', 'get', 'set']
        //inherits: {isUndefined: true},
        //mixed: {isUndefined: true}
      });

      let title = `From ${superDoc.kind} ${this._buildDocLinkHTML(longname, longname)}`;
      let result = this._buildSummaryDoc(targetDocs, '----------', false, superDoc.kind);
      if (result) {
        result.load('title', title, IceCap.MODE_WRITE);
        html.push(result.html);
      }
    }

    return html.join('\n');
  }
}
