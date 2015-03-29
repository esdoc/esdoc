import fs from 'fs';
import path from 'path';
import escape from 'escape-html';
import IceCap from 'ice-cap';
import {shorten} from './util.js';
import DocResolver from './DocResolver.js';

export default class DocBuilder {
  constructor(data, config) {
    this._data = data;
    this._config = config;
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

    if (!this._config.private) {
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
    ice.loop('userScript', this._config.scripts, (i, userScript, ice)=>{
      var name = `user/script/${i}-${path.basename(userScript)}`;
      ice.attr('userScript', 'src', name);
    });

    ice.loop('userStyle', this._config.styles, (i, userStyle, ice)=>{
      var name = `user/css/${i}-${path.basename(userStyle)}`;
      ice.attr('userStyle', 'href', name);
    });

    ice.load('nav', this._buildNavDoc());
    return ice;
  }

  _buildNavDoc() {
    var html = this._readTemplate('nav.html');
    var ice = new IceCap(html);

    // class
    var classDocs = this._find({kind: 'class', interface: false});
    ice.drop('classWrap', !classDocs.length);
    ice.loop('classDoc', classDocs, (i, classDoc, ice)=>{
      ice.load('classDoc', this._buildDocLinkHTML(classDoc.longname));
    });

    // interface
    var interfaceDocs = this._find({kind: 'class', interface: true});
    ice.drop('interfaceWrap', !interfaceDocs.length);
    ice.loop('interfaceDoc', interfaceDocs, (i, interfaceDoc, ice)=>{
      ice.load('interfaceDoc', this._buildDocLinkHTML(interfaceDoc.longname));
    });

    // function
    var functionDocs = this._find({kind: 'function'});
    ice.drop('functionWrap', !functionDocs.length);
    ice.loop('functionDoc', functionDocs, (i, functionDoc, ice)=>{
      ice.load('functionDoc', this._buildDocLinkHTML(functionDoc.longname));
    });

    // variable
    var variableDocs = this._find({kind: 'variable'});
    ice.drop('variableWrap', !variableDocs.length);
    ice.loop('variableDoc', variableDocs, (i, variableDoc, ice)=>{
      ice.load('variableDoc', this._buildDocLinkHTML(variableDoc.longname));
    });

    // typedef
    var typedefDocs = this._find({kind: 'typedef'});
    ice.drop('typedefWrap', !typedefDocs.length);
    ice.loop('typedefDoc', typedefDocs, (i, typedefDoc, ice)=>{
      ice.load('typedefDoc', this._buildDocLinkHTML(typedefDoc.longname));
    });

    // files
    var fileDocs = this._find({kind: 'file'});
    ice.drop('fileWrap', !fileDocs.length);
    ice.loop('fileDoc', fileDocs, (i, fileDoc, ice)=>{
      ice.load('fileDoc', this._buildFileDocLinkHTML(fileDoc));
    });

    return ice;
  }

  _findAccessDocs(doc, kind, isStatic = true) {
    //if (kind === 'constructor' && !doc) {
    //  throw new Error('doc must be specified if kind === constructor');
    //}

    // todo: refactor
    var memberof = doc ? doc.longname : null;
    var cond;
    switch (kind) {
      case 'class':
        cond = {kind: 'class', memberof, static: isStatic, interface: false};
        break;
      case 'interface':
        cond = {kind: 'class', memberof, static: isStatic, interface: true};
        break;
      case 'member':
        cond = {kind: ['member', 'get', 'set'], memberof, static: isStatic};
        break;
      default:
        cond = {kind: kind, memberof, static: isStatic};
        break;
    }

    if (!cond.memberof) {
      delete cond.memberof;
    }

    var publicDocs = this._find(cond, {access: 'public'});
    var protectedDocs = this._find(cond, {access: 'protected'});
    var privateDocs = this._find(cond, {access: 'private'});
    var accessDocs = [['Public', publicDocs], ['Protected', protectedDocs], ['Private', privateDocs]];

    return accessDocs;
  }

  _buildSummaryHTML(doc, kind, title, isStatic = true) {
    //var accessDocs = this._findAccessDocs(doc, kind, isStatic);
    //var innerLink = kind === 'constructor';
    //var html = '';
    //for (var accessDoc of accessDocs) {
    //  var docs = accessDoc[1];
    //  if (!docs.length) continue;
    //
    //  var prefix = '';
    //  if (kind === 'constructor') {
    //    prefix = '';
    //  } else if (docs[0].static) {
    //    prefix = 'Static ';
    //  }
    //  var _title = `${prefix}${accessDoc[0]} ${title}`;
    //
    //  var result = this._buildSummaryDoc(docs, _title, innerLink, kind);
    //  if (result) {
    //    html += result.html;
    //  }
    //}
    //
    //return html;

    var accessDocs = this._findAccessDocs(doc, kind, isStatic);
    //var innerLink = kind === 'constructor';
    var html = '';
    for (var accessDoc of accessDocs) {
      var docs = accessDoc[1];
      if (!docs.length) continue;

      var prefix = '';
      if (docs[0].static) prefix = 'Static ';
      var _title = `${prefix}${accessDoc[0]} ${title}`;

      //var result = this._buildSummaryDoc(docs, _title, innerLink);
      var result = this._buildSummaryDoc(docs, _title);
      if (result) {
        html += result.html;
      }
    }

    return html;
  }

  _buildSummaryDoc(docs, title, innerLink) {
    if (docs.length === 0) return;

    var ice = new IceCap(this._readTemplate('summary.html'));

    ice.text('title', title);
    ice.loop('target', docs, (i, doc, ice)=>{
      ice.load('name', this._buildDocLinkHTML(doc.longname, null, innerLink));
      ice.load('signature', this._buildSignatureHTML(doc));
      ice.load('description', shorten(doc));
      ice.text('virtual', doc.virtual ? 'virtual' : '');
      ice.text('override', doc.inherits ? 'override' : '');
      ice.text('readonly', doc.readonly ? 'readonly' : '');
      ice.text('access', doc.access);
      if (['get', 'set'].includes(doc.kind)) {
        ice.text('kind', doc.kind);
      } else {
        ice.drop('kind');
      }
      ice.text('since', doc.since);
      ice.load('deprecated', this._buildDeprecatedHTML(doc));
      ice.load('experimental', this._buildExperimentalHTML(doc));
      ice.text('version', doc.version);
    });

    return ice;
  }

  _buildDetailHTML(doc, kind, title, isStatic = true) {
    var accessDocs = this._findAccessDocs(doc, kind, isStatic);
    var html = '';
    for (var accessDoc of accessDocs) {
      var docs = accessDoc[1];
      if (!docs.length) continue;

      //var prefix = '';
      //if (kind === 'constructor') {
      //  prefix = '';
      //} else if (docs[0].static) {
      //  prefix = 'Static ';
      //}
      var prefix = '';
      if (docs[0].static) prefix = 'Static ';
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
      let scope = doc.static ? 'static' : 'instance';
      ice.attr('anchor', 'id', `${scope}-${doc.kind}-${doc.name}`);
      ice.text('name', doc.name);
      ice.load('signature', this._buildSignatureHTML(doc));
      ice.load('description', doc.description);
      ice.text('virtual', doc.virtual ? 'virtual' : '');
      ice.text('override', doc.inherits ? 'override' : '');
      ice.text('access', doc.access);
      if (['get', 'set'].includes(doc.kind)) {
        ice.text('kind', doc.kind);
      } else {
        ice.drop('kind');
      }
      if (doc.export && doc.importPath && doc.importStyle) {
        let link = this._buildFileDocLinkHTML(doc, doc.importPath);
        ice.into('importPath', `import ${doc.importStyle} from '${link}'`, (code, ice)=>{
          ice.load('importPathCode', code);
        });
      } else {
        ice.drop('importPath');
      }
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

      if (['method', 'constructor', 'function'].indexOf(doc.kind) !== -1) {
        ice.load('properties', this._buildProperties(doc.params, 'Params:'));
      } else {
        ice.load('properties', this._buildProperties(doc.properties, 'Properties:'));
      }

      // return
      if (doc.return) {
        ice.load('returnDescription', doc.return.description);
        var typeNames = [];
        for (var typeName of doc.return.types) {
          typeNames.push(this._buildDocLinkHTML(typeName));
        }
        if ('nullable' in doc.return) {
          var nullable = doc.return.nullable;
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

  _getURL(doc) {
    // inner?
    //if (['variable', 'function', 'member', 'typedef', 'method', 'constructor', 'get', 'set'].includes(doc.kind)) {
    //  inner = true;
    //  var parentLongname = doc.memberof;
    //} else {
    //  if (inner) {
    //    if ('class' === doc.kind) {
    //      var parentLongname = doc.longname;
    //    } else {
    //      throw new Error('inner option is only used with class.');
    //    }
    //  }
    //}

    let inner = false;
    if (['variable', 'function', 'member', 'typedef', 'method', 'constructor', 'get', 'set'].includes(doc.kind)) {
      inner = true
    }

    if (inner) {
      //var parentLongname = doc.memberof;
      //var parentDoc = this._find({longname: parentLongname})[0];
      //if (!parentDoc) return;
      //let fileName = this._getOutputFileName(parentDoc);
      let scope = doc.static ? 'static' : 'instance';
      let fileName = this._getOutputFileName(doc);
      return `${encodeURIComponent(fileName)}#${scope}-${doc.kind}-${doc.name}`;
    } else {
      let fileName = this._getOutputFileName(doc);
      return encodeURIComponent(fileName);
    }
  }

  _getOutputFileName(doc) {
    let name;
    switch (doc.kind) {
      case 'variable':
        return '@variable.html';
      case 'function':
        return '@function.html';
      case 'member': // fall
      case 'method': // fall
      case 'constructor': // fall
      case 'set': // fall
      case 'get': // fal
        let parentDoc = this._find({longname: doc.memberof})[0];
        return this._getOutputFileName(parentDoc);
      case 'external':
        return '@external.html';
      case 'typedef':
        return '@typedef.html';
      case 'class':
        name = doc.longname.replace(/\//g, '|');
        return `@class-${name}.html`;
      case 'file':
        name = doc.longname.replace(/\//g, '|');
        return `@file-${name}.html`;
      default:
        throw new Error('DocBuilder: can not resolve file name.');
    }
    //var prefix = doc.kind === 'file' ? '@file-' : '';
    //var name = doc.longname.replace(/\//g, '|');
    //return `${prefix}${name}.html`;
  }

  _buildFileDocLinkHTML(doc, text = null) {
    if (!doc) return;
    //if (!doc.meta) return;

    var fileDoc;
    if (doc.kind === 'file') {
      fileDoc = doc;
    } else {
      var filePath = doc.longname.split('~')[0];
      fileDoc = this._find({kind: 'file', longname: filePath})[0];
    }

    if (!fileDoc) return;

    if (!text) text = fileDoc.name;
    return `<span><a href="${this._getURL(fileDoc)}">${text}</a></span>`;
  }

  _buildDocLinkHTML(longname, text = null, inner = false) {
    if (!longname) return '';

    if (typeof longname !== 'string') throw new Error(JSON.stringify(longname));

    // Array.<Foo>
    // TODO: support nested Array
    let isArray = false;
    let matched = longname.match(/^(.*?)\[\]$/) || longname.match(/^Array\.<(.*?)>$/);
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
        for (var typeName of param.types) {
          types.push(this._buildDocLinkHTML(typeName));
        }

        callSignatures.push(`${paramName}: ${types.join(' | ')}`);
      }
    }

    // return signature
    var returnSignatures = [];
    if (doc.return) {
      for (var typeName of doc.return.types) {
        returnSignatures.push(this._buildDocLinkHTML(typeName));
      }
    }

    // type signature
    var typeSignatures = [];
    if (doc.type) {
      for (var typeName of doc.type.types) {
        typeSignatures.push(this._buildDocLinkHTML(typeName));
      }
    }

    // callback is not need type. because type is always function.
    if (doc.kind === 'function') {
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
      for (var typeName of prop.types) {
        typeNames.push(this._buildDocLinkHTML(typeName));
      }
      ice.load('type', typeNames.join(' | '));

      // appendix
      var appendix = [];
      if (prop.optional) {
        appendix.push('<li>optional</li>');
      }
      if ('defaultValue' in prop) {
        appendix.push(`<li>default: ${prop.defaultValue}</li>`);
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
      var deprecated = [`this ${doc.kind} was deprecated.`];
      if (typeof doc.deprecated === 'string') deprecated.push(doc.deprecated);
      return deprecated.join(' ');
    } else {
      return '';
    }
  }

  _buildExperimentalHTML(doc) {
    if (doc.experimental) {
      var experimental = [`this ${doc.kind} is experimental.`];
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

  //_buildFileFooterHTML(doc) {
  //  if (!doc) return '';
  //
  //  var ice = new IceCap(this._readTemplate('file-footer.html'));
  //
  //  var flag = false;
  //
  //  if (doc.copyright) {
  //    flag = true;
  //    ice.text('copyright', doc.copyright);
  //  }
  //
  //  if (doc.license) {
  //    flag = true;
  //    ice.text('license', doc.license);
  //  }
  //
  //  return flag ? ice.html : '';
  //}
}
