import fs from 'fs';
import path from 'path';
import escape from 'escape-html';
import IceCap from 'ice-cap';
import {shorten} from './util.js';
import DocResolver from './DocResolver.js';

export default class DocBuilder {
  constructor(data, option) {
    this._data = data;
    this._option = option;
    this._config = null;

    if (option.configure) {
      var configPath = option.configure;
      var configJSON = fs.readFileSync(configPath, {encoding: 'utf-8'});
      this._config = JSON.parse(configJSON);
      this._config.cloudy = this._config.cloudy || {};
    }

    new DocResolver(this).resolve();
  }

  /**
   * @abstract
   * @param callback
   */
  exec(callback) {
  }

  _find(...cond) {
    return this._orderedFind(null, ...cond);
  }

  _orderedFind(order, ...cond) {
    let data = this._data(...cond);

    if (!this._option.private) {
      data = data.filter({access: {'!is': 'private'}});
    }

    if (order) {
      return data.order(order + ', name asec').map(v => v);
    } else {
      return data.order('name asec').map(v => v);
    }
  }

  _readTemplate(fileName) {
    var filePath = path.resolve(__dirname, `./template/${fileName}`);
    return fs.readFileSync(filePath, {encoding: 'utf-8'});
  }

  _buildLayoutDoc() {
    var ice = new IceCap(this._readTemplate('layout.html'), {autoClose: false});

    // see StaticFileBuilder#exec
    if (this._config) {
      ice.loop('userScript', this._config.cloudy.scripts, (i, userScript, ice)=>{
        var name = `user/script/${i}-${path.basename(userScript)}`;
        ice.attr('userScript', 'src', name);
      });

      ice.loop('userStyle', this._config.cloudy.styles, (i, userStyle, ice)=>{
        var name = `user/css/${i}-${path.basename(userStyle)}`;
        ice.attr('userStyle', 'href', name);
      });
    }

    ice.text('date', new Date().toString());
    ice.load('nav', this._buildNavDoc());
    return ice;
  }

  _buildNavDoc() {
    var html = this._readTemplate('nav.html');
    var ice = new IceCap(html);

    // classes
    var classDocs = this._find({kind: 'class'});
    ice.drop('classWrap', !classDocs.length);
    ice.loop('classDoc', classDocs, (i, classDoc, ice)=>{
      ice.load('classDoc', this._buildDocLinkHTML(classDoc.longname));
    });

    // interfaces
    var interfaceDocs = this._find({kind: 'interface'});
    ice.drop('interfaceWrap', !interfaceDocs.length);
    ice.loop('interfaceDoc', interfaceDocs, (i, interfaceDoc, ice)=>{
      ice.load('interfaceDoc', this._buildDocLinkHTML(interfaceDoc.longname));
    });

    // namespaces
    var namespaceDocs = this._find({kind: 'namespace'});
    ice.drop('namespaceWrap', !namespaceDocs.length);
    ice.loop('namespaceDoc', namespaceDocs, (i, namespaceDoc, ice)=>{
      ice.load('namespaceDoc', this._buildDocLinkHTML(namespaceDoc.longname));
    });

    // modules
    var moduleDocs = this._find({kind: 'module'});
    ice.drop('moduleWrap', !moduleDocs.length);
    ice.loop('moduleDoc', moduleDocs, (i, moduleDoc, ice)=>{
      ice.load('moduleDoc', this._buildDocLinkHTML(moduleDoc.longname));
    });

    // mixin
    var mixinDocs = this._find({kind: 'mixin'});
    ice.drop('mixinWrap', !mixinDocs.length);
    ice.loop('mixinDoc', mixinDocs, (i, mixinDoc, ice)=>{
      ice.load('mixinDoc', this._buildDocLinkHTML(mixinDoc.longname));
    });

    // files
    var fileDocs = this._find({kind: 'file'});
    ice.drop('fileWrap', !fileDocs.length);
    ice.loop('fileDoc', fileDocs, (i, fileDoc, ice)=>{
      ice.load('fileDoc', this._buildFileDocLinkHTML(fileDoc));
    });

    return ice;
  }

  _findAccessDocs(doc, kind, scope = null) {
    if (kind === 'constructor' && !doc) {
      throw new Error('doc must be specified if kind === constructor');
    }

    var memberof = doc ? doc.longname : null;
    var cond;
    switch (kind) {
      case 'member':
        cond = {kind: 'member', memberof, isEnum: {isUndefined: true}};
        break;
      case 'enum':
        cond = {kind: 'member', memberof, isEnum: true};
        break;
      case 'callback':
        cond = {kind: 'typedef', memberof, _custom_is_callback: true};
        break;
      case 'typedef':
        cond = {kind: 'typedef', memberof, _custom_is_callback: false};
        break;
      case 'constructor':
        cond = {kind: ['class', 'interface'], longname: memberof};
        break;
      default:
        cond = {kind: kind, memberof};
        break;
    }

    if (!cond.memberof) {
      delete cond.memberof;
    }

    if (scope) {
      cond.scope = scope;
    }

    let excludeInherited = {inherits: {isUndefined: true}, mixed: {isUndefined: true}};

    var publicDocs = this._find(cond, {access: 'public'}, excludeInherited);
    var protectedDocs = this._find(cond, {access: 'protected'}, excludeInherited);
    var privateDocs = this._find(cond, {access: 'private'}, excludeInherited);
    var accessDocs = [['Public', publicDocs], ['Protected', protectedDocs], ['Private', privateDocs]];

    return accessDocs;
  }

  _buildSummaryHTML(doc, kind, title, scope = null) {
    var accessDocs = this._findAccessDocs(doc, kind, scope);
    var innerLink = kind === 'constructor';
    var html = '';
    for (var accessDoc of accessDocs) {
      var docs = accessDoc[1];
      if (!docs.length) continue;

      var prefix = '';
      if (kind === 'constructor') {
        prefix = '';
      } else if (docs[0].scope === 'static') {
        prefix = 'Static ';
      }
      var _title = `${prefix}${accessDoc[0]} ${title}`;

      var result = this._buildSummaryDoc(docs, _title, innerLink, kind);
      if (result) {
        html += result.html;
      }
    }

    return html;
  }

  _buildSummaryDoc(docs, title, innerLink, kind) {
    if (docs.length === 0) return;

    var ice = new IceCap(this._readTemplate('summary.html'));

    ice.text('title', title);
    ice.loop('target', docs, (i, doc, ice)=>{
      ice.load('name', this._buildDocLinkHTML(doc.longname, null, innerLink));
      ice.load('signature', this._buildSignatureHTML(doc));
      ice.load('description', shorten(doc, kind === 'constructor'));
      ice.text('virtual', doc.virtual ? 'virtual' : '');
      ice.text('override', doc.inherits ? 'override' : '');
      ice.text('readonly', doc.readonly ? 'readonly' : '');
      ice.text('access', doc.access);
      ice.text('since', doc.since);
      ice.load('deprecated', this._buildDeprecatedHTML(doc));
      ice.load('experimental', this._buildExperimentalHTML(doc));
      ice.text('version', doc.version);
    });

    return ice;
  }

  _buildDetailHTML(doc, kind, title, scope = null) {
    var accessDocs = this._findAccessDocs(doc, kind, scope);
    var html = '';
    for (var accessDoc of accessDocs) {
      var docs = accessDoc[1];
      if (!docs.length) continue;

      var prefix = '';
      if (kind === 'constructor') {
        prefix = '';
      } else if (docs[0].scope === 'static') {
        prefix = 'Static ';
      }
      var _title = `${prefix}${accessDoc[0]} ${title}`;

      var result = this._buildDetailDocs(docs, _title);
      if (result) html += result.html;
    }

    return html;
  }

  _buildDetailDocs(docs, title) {
    var ice = new IceCap(this._readTemplate('details.html'));

    ice.text('title', title);
    ice.drop('title', !docs.length);

    ice.loop('detail', docs, (i, doc, ice)=>{
      ice.attr('anchor', 'id', `${doc.scope}-${doc.name}`);
      ice.text('name', doc.name);
      ice.load('signature', this._buildSignatureHTML(doc));
      ice.load('description', doc.description);
      ice.text('virtual', doc.virtual ? 'virtual' : '');
      ice.text('override', doc.inherits ? 'override' : '');
      ice.text('access', doc.access);
      ice.text('since', doc.since, 'append');
      ice.load('deprecated', this._buildDeprecatedHTML(doc));
      ice.load('experimental', this._buildExperimentalHTML(doc));
      ice.text('readonly', doc.readonly ? 'readonly' : '');
      ice.load('require', this._buildDocsLinkHTML(doc.requires), 'append');
      ice.load('author', this._buildAuthorHTML(doc), 'append');
      ice.text('version', doc.version, 'append');
      ice.load('defaultvalue', this._buildDocsLinkHTML([doc.defaultvalue]), 'append');
      ice.load('inherit', this._buildDocsLinkHTML([doc.inherits]), 'append');
      ice.load('this', this._buildDocsLinkHTML([doc.this]), 'append');
      ice.load('fire', this._buildDocsLinkHTML(doc.fires), 'append');
      ice.load('listen', this._buildDocsLinkHTML(doc.listens), 'append');
      ice.load('see', this._buildDocsLinkHTML(doc.see), 'append');
      ice.load('todo', this._buildDocsLinkHTML(doc.todo), 'append');

      if (['function', 'class', 'interface'].indexOf(doc.kind) !== -1) {
        ice.load('properties', this._buildProperties(doc.params, 'Params:'));
      } else {
        ice.load('properties', this._buildProperties(doc.properties, 'Properties:'));
      }

      // return
      if (doc.returns) {
        ice.load('returnDescription', doc.returns[0].description);
        var typeNames = [];
        for (var typeName of doc.returns[0].type.names) {
          typeNames.push(this._buildDocLinkHTML(typeName));
        }
        if ('nullable' in doc.returns[0]) {
          var nullable = doc.returns[0].nullable;
          ice.load('returnType', typeNames.join(' | ') + ` (nullable: ${nullable})`);
        } else {
          ice.load('returnType', typeNames.join(' | '));
        }

        ice.load('returnProperties', this._buildProperties(doc.properties, 'Return Properties:'));
      } else {
        ice.drop('returnParams');
      }

      // throws
      if (doc.exceptions) {
        ice.loop('throw', doc.exceptions, (i, exceptionDoc, ice)=>{
          ice.load('throwName', this._buildDocLinkHTML(exceptionDoc.type.names[0]));
          ice.load('throwDesc', exceptionDoc.description);
        });
      } else {
        ice.drop('throwWrap');
      }

      // example
      ice.into('example', doc.examples, (examples, ice)=>{
        ice.loop('exampleDoc', examples, (i, exampleDoc, ice)=>{
          ice.text('exampleCode', exampleDoc);
        });
      });
    });

    return ice;
  }

  _getURL(doc, inner = false) {
    // inner?
    if (['function', 'member', 'typedef', 'constant', 'event'].indexOf(doc.kind) !== -1) {
      inner = true;
      var parentLongname = doc.memberof;
    } else {
      if (inner) {
        if (['class', 'interface'].indexOf(doc.kind) !== -1) {
          var parentLongname = doc.longname;
        } else {
          throw new Error('inner option is only used ith class or interface.');
        }
      }
    }

    if (inner) {
      var parentDoc = this._find({longname: parentLongname})[0];
      if (!parentDoc) return;
      var fileName = this._getOutputFileName(parentDoc);
      return `${encodeURIComponent(fileName)}#${doc.scope}-${doc.name}`;
    } else {
      var fileName = this._getOutputFileName(doc);
      return encodeURIComponent(fileName);
    }
  }

  _getOutputFileName(doc) {
    var prefix = doc.kind === 'file' ? '@file-' : '';
    var name = doc.longname.replace(/\//g, '|');
    return `${prefix}${name}.html`;
  }

  _buildFileDocLinkHTML(doc) {
    if (!doc) return;
    if (!doc.meta) return;

    var fileDoc;
    if (doc.kind === 'file') {
      fileDoc = doc;
    } else {
      var absPath = doc.meta.path + '/' + doc.meta.filename;
      fileDoc = this._find({kind: 'file', _custom_file_abs_path: absPath})[0];
    }

    if (!fileDoc) return;

    return `<span><a href="${this._getURL(fileDoc)}">${fileDoc.name}</a></span>`;
  }

  _buildDocLinkHTML(longname, text = null, inner = false) {
    if (!longname) return '';

    if (typeof longname !== 'string') throw new Error(JSON.stringify(longname));

    // Array.<Foo>
    // TODO: support nested Array
    let matched = longname.match(/^Array\.<(.*?)>$/);
    let isArray = false;
    if (matched) {
      longname = matched[1];
      isArray = true;
    }

    var doc = this._find({longname})[0];

    if (!doc) {
      // if longname is HTML tag, not escape.
      var arraySuffix = isArray ? '[]' : '';
      if (longname.indexOf('<') === 0) {
        return `<span>${longname}${arraySuffix}</span>`;
      } else {
        return `<span>${escape(text || longname)}${arraySuffix}</span>`;
      }
    }

    if (doc.kind === 'external') {
      var text = doc.longname.replace(/^external:\s*/, '');
      var aTag = doc.see[0].replace(/>.*?</, `>${text}<`);
      return `<span>${aTag}</span>`;
    } else {
      text = escape(text || doc.name);
      var url = this._getURL(doc, inner);
      var arraySuffix = isArray ? '[]' : '';
      if (url) {
        return `<span><a href="${url}">${text}</a>${arraySuffix}</span>`;
      } else {
        return `<span>${text}${arraySuffix}</span>`;
      }
    }
  }

  _buildDocsLinkHTML(longnames, text = null, inner = false, separator = '\n') {
    if (!longnames) return;
    if (!longnames.length) return;

    var links = [];
    for (var longname of longnames) {
      if (!longname) continue;
      var link = this._buildDocLinkHTML(longname, text, inner);
      links.push(`<li>${link}</li>`);
    }

    if (!links.length) return;

    return `<ul>${links.join(separator)}</ul>`;
  }

  _buildSignatureHTML(doc) {
    // call signature
    var callSignatures = [];
    if (doc.params) {
      for (var param of doc.params) {
        var paramName = param.name;
        if (paramName.indexOf('.') !== -1) continue;

        var types = [];
        for (var typeName of param.type.names) {
          types.push(this._buildDocLinkHTML(typeName));
        }

        callSignatures.push(`${paramName}: ${types.join(' | ')}`);
      }
    }

    // return signature
    var returnSignatures = [];
    if (doc.returns) {
      for (var typeName of doc.returns[0].type.names) {
        returnSignatures.push(this._buildDocLinkHTML(typeName));
      }
    }

    // type signature
    var typeSignatures = [];
    if (doc.type) {
      for (var typeName of doc.type.names) {
        typeSignatures.push(this._buildDocLinkHTML(typeName));
      }
    }

    // callback is not need type. because type is always function.
    if (doc._custom_is_callback) {
      typeSignatures = [];
    }

    var html = '';
    if (callSignatures.length) html = `(${callSignatures.join(', ')})`;
    if (returnSignatures.length) html = `${html}: ${returnSignatures.join(' | ')}`;
    if (typeSignatures.length) html = `${html}: ${typeSignatures.join(' | ')}`;

    return html;
  }

  _buildProperties(properties = [], title = 'Properties:') {
    var ice = new IceCap(this._readTemplate('properties.html'));

    ice.text('title', title);

    ice.loop('property', properties, (i, prop, ice)=>{
      ice.autoDrop = false;
      ice.attr('property', 'data-depth', prop.name.split('.').length - 1);
      ice.text('name', prop.name);
      ice.attr('name', 'data-depth', prop.name.split('.').length - 1);
      ice.load('description', prop.description);

      var typeNames = [];
      for (var typeName of prop.type.names) {
        typeNames.push(this._buildDocLinkHTML(typeName));
      }
      ice.load('type', typeNames.join(' | '));

      // appendix
      var appendix = [];
      if (prop.optional) {
        appendix.push('<li>optional</li>');
      }
      if ('defaultvalue' in prop) {
        appendix.push(`<li>default: ${prop.defaultvalue}</li>`);
      }
      if ('nullable' in prop) {
        appendix.push(`<li>nullable: ${prop.nullable}</li>`);
      }
      if (appendix.length) {
        ice.load('appendix', `<ul>${appendix.join('\n')}</ul>`);
      } else {
        ice.text('appendix', '');
      }
    });

    if (!properties || properties.length === 0) {
      ice.drop('properties');
    }

    return ice;
  }

  _buildDeprecatedHTML(doc) {
    if (doc.deprecated) {
      var kind = doc.kind;

      if (kind === 'function') kind = 'method';
      else if(kind === 'typedef' && doc._custom_is_callback) kind = 'callback';

      var deprecated = [`this ${kind} was deprecated.`];
      if (typeof doc.deprecated === 'string') deprecated.push(doc.deprecated);
      return deprecated.join(' ');
    } else {
      return '';
    }
  }

  _buildExperimentalHTML(doc) {
    if (doc.experimental) {
      var kind = doc.kind;

      if (kind === 'function') kind = 'method';
      else if(kind === 'typedef' && doc._custom_is_callback) kind = 'callback';

      var experimental = [`this ${kind} is experimental.`];
      if (typeof doc.experimental === 'string') experimental.push(doc.experimental);
      return experimental.join(' ');
    } else {
      return '';
    }
  }

  _buildAuthorHTML(doc, separator = '\n') {
    if (!doc.author) return '';

    var html = [];
    for (var author of doc.author) {
      var matched = author.match(/(.*?) *<(.*?)>/);
      if (matched) {
        var name = matched[1];
        var link = matched[2];
        if (link.indexOf('http') === 0) {
          html.push(`<li><a href="${link}">${name}</a></li>`)
        } else {
          html.push(`<li><a href="mailto:${link}">${name}</a></li>`)
        }
      } else {
        html.push(`<li>${author}</li>`)
      }
    }

    return `<ul>${html.join(separator)}</ul>`;
  }

  _buildFileFooterHTML(doc) {
    if (!doc) return '';

    var ice = new IceCap(this._readTemplate('file-footer.html'));

    var flag = false;

    if (doc.copyright) {
      flag = true;
      ice.text('copyright', doc.copyright);
    }

    if (doc.license) {
      flag = true;
      ice.text('license', doc.license);
    }

    return flag ? ice.html : '';
  }
}
