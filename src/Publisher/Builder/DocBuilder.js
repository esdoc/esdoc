import fs from 'fs';
import path from 'path';
import escape from 'escape-html';
import IceCap from 'ice-cap';
import {shorten, parseExample} from './util.js';
import DocResolver from './DocResolver.js';

/**
 * Builder base class.
 */
export default class DocBuilder {
  /**
   * create instance.
   * @param {Taffy} data - doc object database.
   * @param {ESDocConfig} config - esdoc config is used build output.
   */
  constructor(data, config) {
    this._data = data;
    this._config = config;
    new DocResolver(this).resolve();
  }

  /**
   * execute building output.
   * @abstract
   * @param {function} callback - is called with some data.
   */
  exec(callback) {
  }

  /**
   * find doc object.
   * @param {...Object} cond - find condition.
   * @returns {DocObject[]} found doc objects.
   * @private
   */
  _find(...cond) {
    return this._orderedFind(null, ...cond);
  }

  /**
   * fuzzy find doc object by name.
   * - equal with longname
   * - equal with name
   * - include in longname
   * - include in ancestor
   *
   * @param {string} name - target identifier name.
   * @param {string} [kind] - target kind.
   * @returns {DocObject[]} found doc objects.
   * @private
   */
  _findByName(name, kind = null) {
    let docs;

    if (kind) {
      docs = this._orderedFind(null, {longname: name, kind: kind});
    } else {
      docs = this._orderedFind(null, {longname: name});
    }
    if (docs.length) return docs;

    if (kind) {
      docs = this._orderedFind(null, {name: name, kind: kind});
    } else {
      docs = this._orderedFind(null, {name: name});
    }
    if (docs.length) return docs;

    let regexp = new RegExp(`[~]\\${name}$`); // if name is `*`, need to escape.
    if (kind) {
      docs = this._orderedFind(null, {longname: {regex: regexp}, kind: kind});
    } else {
      docs = this._orderedFind(null, {longname: {regex: regexp}});
    }
    if (docs.length) return docs;

    // inherited method?
    let matched = name.match(/(.*)[.#](.*)$/); // instance method(Foo#bar) or static method(Foo.baz)
    if (matched) {
      let parent = matched[1];
      let childName = matched[2];
      let parentDoc = this._findByName(parent, 'class')[0];
      if (parentDoc && parentDoc._custom_extends_chains) {
        for (let superLongname of parentDoc._custom_extends_chains) {
          let docs = this._find({memberof: superLongname, name: childName});
          if (docs.length) return docs;
        }
      }
    }

    return [];
  }

  /**
   * find doc objects that is ordered.
   * @param {string} order - doc objects order(``column asec`` or ``column desc``).
   * @param {...Object} cond - condition objects
   * @returns {DocObject[]} found doc objects.
   * @private
   */
  _orderedFind(order, ...cond) {
    let data = this._data(...cond);

    if (order) {
      return data.order(order + ', name asec').map(v => v);
    } else {
      return data.order('name asec').map(v => v);
    }
  }

  /**
   * read html template.
   * @param {string} fileName - template file name.
   * @return {string} html of template.
   * @private
   */
  _readTemplate(fileName) {
    let filePath = path.resolve(__dirname, `./template/${fileName}`);
    return fs.readFileSync(filePath, {encoding: 'utf-8'});
  }

  /**
   * get target's essential info.
   * @returns {{title: string, version: string, url: string}}
   * @private
   */
  _getInfo() {
    let config = this._config;
    let packageObj = {};
    if (config.package) {
      let packagePath = config.package;
      let json = fs.readFileSync(packagePath, {encoding: 'utf-8'});
      packageObj = JSON.parse(json);
    }

    let indexInfo = {
      title: config.title || packageObj.name,
      //desc: config.description || packageObj.description,
      version: config.version || packageObj.version,
      //url: config.url || packageObj.repository ? packageObj.repository.url : ''
      url: packageObj.repository ? packageObj.repository.url : ''
    };

    if (indexInfo.url.indexOf('git@github.com:') === 0) {
      let matched = indexInfo.url.match(/^git@github\.com:(.*)\.git$/);
      if (matched && matched[1]) {
        indexInfo.url = `https://github.com/${matched[1]}`;
      }
    }

    return indexInfo;
  }

  /**
   * build common layout output.
   * @return {IceCap} layout output.
   * @private
   */
  _buildLayoutDoc() {
    let info = this._getInfo();

    let ice = new IceCap(this._readTemplate('layout.html'), {autoClose: false});

    ice.text('esdocVersion', `(${this._config._esdocVersion})`);

    if (info.url) {
      ice.attr('repoURL', 'href', info.url);
      if (info.url.match(new RegExp('^https?://github.com/'))) {
        ice.attr('repoURL', 'class', 'repo-url-github');
      }
    } else {
      ice.drop('repoURL');
    }

    ice.drop('testLink', !this._config.test);

    // see StaticFileBuilder#exec
    ice.loop('userScript', this._config.scripts || [], (i, userScript, ice)=>{
      let name = `user/script/${i}-${path.basename(userScript)}`;
      ice.attr('userScript', 'src', name);
    });

    ice.loop('userStyle', this._config.styles || [], (i, userStyle, ice)=>{
      let name = `user/css/${i}-${path.basename(userStyle)}`;
      ice.attr('userStyle', 'href', name);
    });

    ice.load('nav', this._buildNavDoc());
    return ice;
  }

  /**
   * build common navigation output.
   * @return {IceCap} navigation output.
   * @private
   */
  _buildNavDoc() {
    let html = this._readTemplate('nav.html');
    let ice = new IceCap(html);

    // class
    let classDocs = this._find({kind: 'class', interface: false});
    ice.drop('classWrap', !classDocs.length);
    ice.loop('classDoc', classDocs, (i, classDoc, ice)=>{
      ice.load('classDoc', this._buildDocLinkHTML(classDoc.longname));
    });

    // interface
    let interfaceDocs = this._find({kind: 'class', interface: true});
    ice.drop('interfaceWrap', !interfaceDocs.length);
    ice.loop('interfaceDoc', interfaceDocs, (i, interfaceDoc, ice)=>{
      ice.load('interfaceDoc', this._buildDocLinkHTML(interfaceDoc.longname));
    });

    // function
    let functionDocs = this._find({kind: 'function'});
    ice.drop('functionWrap', !functionDocs.length);
    ice.loop('functionDoc', functionDocs, (i, functionDoc, ice)=>{
      ice.load('functionDoc', this._buildDocLinkHTML(functionDoc.longname));
    });

    // variable
    let variableDocs = this._find({kind: 'variable'});
    ice.drop('variableWrap', !variableDocs.length);
    ice.loop('variableDoc', variableDocs, (i, variableDoc, ice)=>{
      ice.load('variableDoc', this._buildDocLinkHTML(variableDoc.longname));
    });

    // typedef
    let typedefDocs = this._find({kind: 'typedef'});
    ice.drop('typedefWrap', !typedefDocs.length);
    ice.loop('typedefDoc', typedefDocs, (i, typedefDoc, ice)=>{
      ice.load('typedefDoc', this._buildDocLinkHTML(typedefDoc.longname));
    });

    // external
    let externalDocs = this._find({kind: 'external'}).filter(v => !v.builtinExternal);
    ice.drop('externalWrap', !externalDocs.length);
    ice.loop('externalDoc', externalDocs, (i, externalDoc, ice)=>{
      ice.load('externalDoc', this._buildDocLinkHTML(externalDoc.longname));
    });

    return ice;
  }

  /**
   * find doc object for each access.
   * @param {DocObject} doc - parent doc object.
   * @param {string} kind - kind property condition.
   * @param {boolean} isStatic - static property condition
   * @returns {Array[]} found doc objects.
   * @property {Array[]} 0 - ['Public', DocObject[]]
   * @property {Array[]} 1 - ['Protected', DocObject[]]
   * @property {Array[]} 2 - ['Private', DocObject[]]
   * @private
   */
  _findAccessDocs(doc, kind, isStatic = true) {
    let cond = {kind, static: isStatic};

    if (doc) cond.memberof = doc.longname;

    switch (kind) {
      case 'class':
        cond.interface = false;
        break;
      case 'interface':
        cond.kind = 'class';
        cond.interface = true;
        break;
      case 'member':
        cond.kind = ['member', 'get', 'set'];
        break;
    }

    let publicDocs = this._find(cond, {access: 'public'});
    let protectedDocs = this._find(cond, {access: 'protected'});
    let privateDocs = this._find(cond, {access: 'private'});
    let accessDocs = [['Public', publicDocs], ['Protected', protectedDocs], ['Private', privateDocs]];

    return accessDocs;
  }

  /**
   * build summary output html by parent doc.
   * @param {DocObject} doc - parent doc object.
   * @param {string} kind - target kind property.
   * @param {string} title - summary title.
   * @param {boolean} [isStatic=true] - target static property.
   * @returns {string} html of summary.
   * @private
   */
  _buildSummaryHTML(doc, kind, title, isStatic = true) {
    let accessDocs = this._findAccessDocs(doc, kind, isStatic);
    let html = '';
    for (let accessDoc of accessDocs) {
      let docs = accessDoc[1];
      if (!docs.length) continue;

      let prefix = '';
      if (docs[0].static) prefix = 'Static ';
      let _title = `${prefix}${accessDoc[0]} ${title}`;

      let result = this._buildSummaryDoc(docs, _title);
      if (result) {
        html += result.html;
      }
    }

    return html;
  }

  /**
   * build summary output html by docs.
   * @param {DocObject[]} docs - target docs.
   * @param {string} title - summary title.
   * @param {boolean} innerLink - if true, link in summary is inner link.
   * @return {IceCap} summary output.
   * @private
   */
  _buildSummaryDoc(docs, title, innerLink) {
    if (docs.length === 0) return;

    let ice = new IceCap(this._readTemplate('summary.html'));

    ice.text('title', title);
    ice.loop('target', docs, (i, doc, ice)=>{
      ice.text('generator', doc.generator ? '*' : '');
      ice.load('name', this._buildDocLinkHTML(doc.longname, null, innerLink, doc.kind));
      ice.load('signature', this._buildSignatureHTML(doc));
      ice.load('description', shorten(doc));
      ice.text('abstract', doc.abstract ? 'abstract' : '');
      ice.text('access', doc.access);
      if (['get', 'set'].includes(doc.kind)) {
        ice.text('kind', doc.kind);
      } else {
        ice.drop('kind');
      }

      if (['member', 'method', 'get', 'set'].includes(doc.kind)) {
        ice.text('static', doc.static ? 'static' : '');
      } else {
        ice.drop('static');
      }

      ice.text('since', doc.since);
      ice.load('deprecated', this._buildDeprecatedHTML(doc));
      ice.load('experimental', this._buildExperimentalHTML(doc));
      ice.text('version', doc.version);
    });

    return ice;
  }

  /**
   * build detail output html by parent doc.
   * @param {DocObject} doc - parent doc object.
   * @param {string} kind - target kind property.
   * @param {string} title - detail title.
   * @param {boolean} [isStatic=true] - target static property.
   * @returns {string} html of detail.
   * @private
   */
  _buildDetailHTML(doc, kind, title, isStatic = true) {
    let accessDocs = this._findAccessDocs(doc, kind, isStatic);
    let html = '';
    for (let accessDoc of accessDocs) {
      let docs = accessDoc[1];
      if (!docs.length) continue;

      let prefix = '';
      if (docs[0].static) prefix = 'Static ';
      let _title = `${prefix}${accessDoc[0]} ${title}`;

      let result = this._buildDetailDocs(docs, _title);
      if (result) html += result.html;
    }

    return html;
  }

  /**
   * build detail output html by docs.
   * @param {DocObject[]} docs - target docs.
   * @param {string} title - detail title.
   * @return {IceCap} detail output.
   * @private
   */
  _buildDetailDocs(docs, title) {
    let ice = new IceCap(this._readTemplate('details.html'));

    ice.text('title', title);
    ice.drop('title', !docs.length);

    ice.loop('detail', docs, (i, doc, ice)=>{
      let scope = doc.static ? 'static' : 'instance';
      ice.attr('anchor', 'id', `${scope}-${doc.kind}-${doc.name}`);
      ice.text('generator', doc.generator ? '*' : '');
      ice.text('name', doc.name);
      ice.load('signature', this._buildSignatureHTML(doc));
      ice.load('description', doc.description);
      ice.text('abstract', doc.abstract ? 'abstract' : '');
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

      if (['member', 'method', 'get', 'set'].includes(doc.kind)) {
        ice.text('static', doc.static ? 'static' : '');
      } else {
        ice.drop('static');
      }

      ice.load('source', this._buildFileDocLinkHTML(doc, 'source'));
      ice.text('since', doc.since, 'append');
      ice.load('deprecated', this._buildDeprecatedHTML(doc));
      ice.load('experimental', this._buildExperimentalHTML(doc));
      ice.text('version', doc.version, 'append');
      ice.load('see', this._buildDocsLinkHTML(doc.see), 'append');
      ice.load('todo', this._buildDocsLinkHTML(doc.todo), 'append');
      ice.load('override', this._buildOverrideMethod(doc));

      if (['method', 'constructor', 'function'].indexOf(doc.kind) !== -1) {
        ice.load('properties', this._buildProperties(doc.params, 'Params:'));
      } else {
        ice.load('properties', this._buildProperties(doc.properties, 'Properties:'));
      }

      // return
      if (doc.return) {
        ice.load('returnDescription', doc.return.description);
        let typeNames = [];
        for (let typeName of doc.return.types) {
          typeNames.push(this._buildTypeDocLinkHTML(typeName));
        }
        if (typeof doc.return.nullable === 'boolean') {
          let nullable = doc.return.nullable;
          ice.load('returnType', typeNames.join(' | ') + ` (nullable: ${nullable})`);
        } else {
          ice.load('returnType', typeNames.join(' | '));
        }

        ice.load('returnProperties', this._buildProperties(doc.properties, 'Return Properties:'));
      } else {
        ice.drop('returnParams');
      }

      // throws
      if (doc.throws) {
        ice.loop('throw', doc.throws, (i, exceptionDoc, ice)=>{
          ice.load('throwName', this._buildDocLinkHTML(exceptionDoc.types[0]));
          ice.load('throwDesc', exceptionDoc.description);
        });
      } else {
        ice.drop('throwWrap');
      }

      // fires
      if (doc.emits) {
        ice.loop('emit', doc.emits, (i, emitDoc, ice)=>{
          ice.load('emitName', this._buildDocLinkHTML(emitDoc.types[0]));
          ice.load('emitDesc', emitDoc.description);
        });
      } else {
        ice.drop('emitWrap');
      }

      // listens
      if (doc.listens) {
        ice.loop('listen', doc.listens, (i, listenDoc, ice)=>{
          ice.load('listenName', this._buildDocLinkHTML(listenDoc.types[0]));
          ice.load('listenDesc', listenDoc.description);
        });
      } else {
        ice.drop('listenWrap');
      }

      // example
      ice.into('example', doc.examples, (examples, ice)=>{
        ice.loop('exampleDoc', examples, (i, exampleDoc, ice)=>{
          let parsed = parseExample(exampleDoc);
          ice.text('exampleCode', parsed.body);
          ice.text('exampleCaption', parsed.caption);
        });
      });

      // tests
      ice.into('tests', doc._custom_tests, (tests, ice)=>{
        ice.loop('test', tests, (i, test, ice)=>{
          let testDoc = this._find({longname: test})[0];
          ice.load('test', this._buildFileDocLinkHTML(testDoc, testDoc.testFullDescription));
        });
      });
    });

    return ice;
  }

  /**
   * get output html page title. use ``title`` in {@link ESDocConfig}.
   * @param {DocObject} doc - target doc object.
   * @returns {string} page title.
   * @private
   */
  _getTitle(doc = '') {
    let name = doc.name || doc.toString();

    if (!name) {
      if (this._config.title) {
        return `${this._config.title} API Document`;
      } else {
        return 'API Document';
      }
    }

    if (this._config.title) {
      return `${name} | ${this._config.title} API Document`;
    } else {
      return `${name} | API Document`;
    }
  }

  /**
   * get base url html page. it is used html base tag.
   * @param {string} fileName - output file path.
   * @returns {string} base url.
   * @private
   */
  _getBaseUrl(fileName) {
    let baseUrl = '../'.repeat(fileName.split('/').length - 1);
    return baseUrl;
  }

  /**
   * gat url of output html page.
   * @param {DocObject} doc - target doc object.
   * @returns {string} url of output html. it is relative path from output root dir.
   * @private
   */
  _getURL(doc) {
    let inner = false;
    if (['variable', 'function', 'member', 'typedef', 'method', 'constructor', 'get', 'set'].includes(doc.kind)) {
      inner = true
    }

    if (inner) {
      let scope = doc.static ? 'static' : 'instance';
      let fileName = this._getOutputFileName(doc);
      return `${fileName}#${scope}-${doc.kind}-${doc.name}`;
    } else {
      let fileName = this._getOutputFileName(doc);
      return fileName;
    }
  }

  /**
   * get file name of output html page.
   * @param {DocObject} doc - target doc object.
   * @returns {string} file name.
   * @private
   */
  _getOutputFileName(doc) {
    switch (doc.kind) {
      case 'variable':
        return 'variable/index.html';
      case 'function':
        return 'function/index.html';
      case 'member': // fall
      case 'method': // fall
      case 'constructor': // fall
      case 'set': // fall
      case 'get': // fal
        let parentDoc = this._find({longname: doc.memberof})[0];
        return this._getOutputFileName(parentDoc);
      case 'external':
        return 'external/index.html';
      case 'typedef':
        return 'typedef/index.html';
      case 'class':
        return `class/${doc.longname}.html`;
      case 'file':
        return `file/${doc.longname}.html`;
      case 'testFile':
        return `test-file/${doc.longname}.html`;
      case 'testDescribe':
        return `test.html`;
      case 'testIt':
        return `test.html`;
      default:
        throw new Error('DocBuilder: can not resolve file name.');
    }
  }

  /**
   * build html link to file page.
   * @param {DocObject} doc - target doc object.
   * @param {string} text - link text.
   * @returns {string} html of link.
   * @private
   */
  _buildFileDocLinkHTML(doc, text = null) {
    if (!doc) return '';

    let fileDoc;
    if (doc.kind === 'file' || doc.kind === 'testFile') {
      fileDoc = doc;
    } else {
      let filePath = doc.longname.split('~')[0];
      fileDoc = this._find({kind: ['file', 'testFile'], longname: filePath})[0];
    }

    if (!fileDoc) return '';

    if (!text) text = fileDoc.name;

    if (doc.kind === 'file' || doc.kind === 'testFile') {
      return `<span><a href="${this._getURL(fileDoc)}">${text}</a></span>`;
    } else {
      return `<span><a href="${this._getURL(fileDoc)}#lineNumber${doc.lineNumber}">${text}</a></span>`;
    }
  }

  /**
   * build html link of type.
   * @param {string} typeName - type name(e.g. ``number[]``, ``Map<number, string}``)
   * @returns {string} html of link.
   * @private
   * @todo re-implement with parser combinator.
   */
  _buildTypeDocLinkHTML(typeName) {
    // e.g. number[]
    let matched = typeName.match(/^(.*?)\[\]$/);
    if (matched) {
      typeName = matched[1];
      return `<span>${this._buildDocLinkHTML(typeName, typeName)}<span>[]</span></span>`;
    }

    // e.g. function(a: number, b: string): boolean
    matched = typeName.match(/function\((.*?)\)(.*)/);
    if (matched) {
      let functionLink = this._buildDocLinkHTML('function');
      if (!matched[1] && !matched[2]) return `<span>${functionLink}<span>()</span></span>`;

      let innerTypes = [];
      if (matched[1]) {
        // bad hack: Map.<string, boolean> => Map.<string\Z boolean>
        // bad hack: {a: string, b: boolean} => {a\Y string\Z b\Y boolean}
        let inner = matched[1]
          .replace(/<.*?>/g, (a)=> a.replace(/,/g, '\\Z'))
          .replace(/{.*?}/g, (a)=> a.replace(/,/g, '\\Z').replace(/:/g, '\\Y'));
        innerTypes = inner.split(',').map((v)=>{
          let tmp = v.split(':').map((v)=> v.trim());
          let paramName = tmp[0];
          let typeName = tmp[1].replace(/\\Z/g, ',').replace(/\\Y/g, ':');
          return `${paramName}: ${this._buildTypeDocLinkHTML(typeName)}`;
        });
      }

      let returnType = '';
      if (matched[2]) {
        let type = matched[2].split(':')[1];
        if (type) returnType = ': ' + this._buildTypeDocLinkHTML(type.trim());
      }

      return `<span>${functionLink}<span>(${innerTypes.join(', ')})</span>${returnType}</span>`;
    }

    // e.g. {a: number, b: string}
    matched = typeName.match(/^\{(.*?)\}$/);
    if (matched) {
      if (!matched[1]) return '{}';

      // bad hack: Map.<string, boolean> => Map.<string\Z boolean>
      // bad hack: {a: string, b: boolean} => {a\Y string\Z b\Y boolean}
      let inner = matched[1]
        .replace(/<.*?>/g, (a)=> a.replace(/,/g, '\\Z'))
        .replace(/{.*?}/g, (a)=> a.replace(/,/g, '\\Z').replace(/:/g, '\\Y'));
      let innerTypes = inner.split(',').map((v)=>{
        let tmp = v.split(':').map((v)=> v.trim());
        let paramName = tmp[0];
        let typeName = tmp[1].replace(/\\Z/g, ',').replace(/\\Y/g, ':');
        return `${paramName}: ${this._buildTypeDocLinkHTML(typeName)}`;
      });

      return `{${innerTypes.join(', ')}}`;
    }

    // e.g. Map<number, string>
    matched = typeName.match(/^(.*?)\.?<(.*?)>$/);
    if (matched) {
      let mainType = matched[1];
      // bad hack: Map.<string, boolean> => Map.<string\Z boolean>
      // bad hack: {a: string, b: boolean} => {a\Y string\Z b\Y boolean}
      let inner = matched[2]
        .replace(/<.*?>/g, (a)=> a.replace(/,/g, '\\Z'))
        .replace(/{.*?}/g, (a)=> a.replace(/,/g, '\\Z').replace(/:/g, '\\Y'));
      let innerTypes = inner.split(',').map((v) => {
        v = v.trim().replace(/\\Z/g, ',').replace(/\\Y/g, ':');
        return this._buildTypeDocLinkHTML(v);
      });

      let html = `${this._buildDocLinkHTML(mainType, mainType)}<${innerTypes.join(', ')}>`;
      return html;
    }

    if (typeName.indexOf('...') === 0) {
      typeName = typeName.replace('...', '');
      return '...' + this._buildDocLinkHTML(typeName);
    } else {
      return this._buildDocLinkHTML(typeName);
    }
  }

  /**
   * build html link to identifier.
   * @param {string} longname - link to this.
   * @param {string} [text] - link text. default is name property of doc object.
   * @param {boolean} [inner=false] - if true, use inner link.
   * @param {string} [kind] - specify target kind property.
   * @returns {string} html of link.
   * @private
   */
  _buildDocLinkHTML(longname, text = null, inner = false, kind = null) {
    if (!longname) return '';

    if (typeof longname !== 'string') throw new Error(JSON.stringify(longname));

    let doc = this._findByName(longname, kind)[0];

    if (!doc) {
      // if longname is HTML tag, not escape.
      if (longname.indexOf('<') === 0) {
        return `<span>${longname}</span>`;
      } else {
        return `<span>${escape(text || longname)}</span>`;
      }
    }

    if (doc.kind === 'external') {
      text = doc.name;
      return `<span><a href="${doc.externalLink}">${text}</a></span>`;
    } else {
      text = escape(text || doc.name);
      let url = this._getURL(doc, inner);
      if (url) {
        return `<span><a href="${url}">${text}</a></span>`;
      } else {
        return `<span>${text}</span>`;
      }
    }
  }

  /**
   * build html links to identifiers
   * @param {string[]} longnames - link to these.
   * @param {string} [text] - link text. default is name property of doc object.
   * @param {boolean} [inner=false] - if true, use inner link.
   * @param {string} [separator='\n'] - used link separator.
   * @returns {string} html links.
   * @private
   */
  _buildDocsLinkHTML(longnames, text = null, inner = false, separator = '\n') {
    if (!longnames) return '';
    if (!longnames.length) return '';

    let links = [];
    for (var longname of longnames) {
      if (!longname) continue;
      let link = this._buildDocLinkHTML(longname, text, inner);
      links.push(`<li>${link}</li>`);
    }

    if (!links.length) return '';

    return `<ul>${links.join(separator)}</ul>`;
  }

  /**
   * build identifier signature html.
   * @param {DocObject} doc - target doc object.
   * @returns {string} signature html.
   * @private
   */
  _buildSignatureHTML(doc) {
    // call signature
    let callSignatures = [];
    if (doc.params) {
      for (let param of doc.params) {
        let paramName = param.name;
        if (paramName.indexOf('.') !== -1) continue;

        let types = [];
        for (let typeName of param.types) {
          types.push(this._buildTypeDocLinkHTML(typeName));
        }

        callSignatures.push(`${paramName}: ${types.join(' | ')}`);
      }
    }

    // return signature
    let returnSignatures = [];
    if (doc.return) {
      for (let typeName of doc.return.types) {
        returnSignatures.push(this._buildTypeDocLinkHTML(typeName));
      }
    }

    // type signature
    let typeSignatures = [];
    if (doc.type) {
      for (let typeName of doc.type.types) {
        typeSignatures.push(this._buildTypeDocLinkHTML(typeName));
      }
    }

    // callback is not need type. because type is always function.
    if (doc.kind === 'function') {
      typeSignatures = [];
    }

    let html = '';
    if (callSignatures.length) {
      html = `(${callSignatures.join(', ')})`;
    } else if (['function', 'method'].includes(doc.kind)) {
      html = '()';
    }
    if (returnSignatures.length) html = `${html}: ${returnSignatures.join(' | ')}`;
    if (typeSignatures.length) html = `${html}: ${typeSignatures.join(' | ')}`;

    return html;
  }

  /**
   * build properties output.
   * @param {ParsedParam[]} [properties=[]] - properties in doc object.
   * @param {string} title - output title.
   * @return {IceCap} built properties output.
   * @private
   */
  _buildProperties(properties = [], title = 'Properties:') {
    let ice = new IceCap(this._readTemplate('properties.html'));

    ice.text('title', title);

    ice.loop('property', properties, (i, prop, ice)=>{
      ice.autoDrop = false;
      ice.attr('property', 'data-depth', prop.name.split('.').length - 1);
      ice.text('name', prop.name);
      ice.attr('name', 'data-depth', prop.name.split('.').length - 1);
      ice.load('description', prop.description);

      let typeNames = [];
      for (var typeName of prop.types) {
        typeNames.push(this._buildTypeDocLinkHTML(typeName));
      }
      ice.load('type', typeNames.join(' | '));

      // appendix
      let appendix = [];
      if (prop.optional) {
        appendix.push('<li>optional</li>');
      }
      if ('defaultValue' in prop) {
        appendix.push(`<li>default: ${prop.defaultValue}</li>`);
      }
      if (typeof prop.nullable === 'boolean') {
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

  /**
   * build deprecated html.
   * @param {DocObject} doc - target doc object.
   * @returns {string} if doc is not deprecated, returns empty.
   * @private
   */
  _buildDeprecatedHTML(doc) {
    if (doc.deprecated) {
      let deprecated = [`this ${doc.kind} was deprecated.`];
      if (typeof doc.deprecated === 'string') deprecated.push(doc.deprecated);
      return deprecated.join(' ');
    } else {
      return '';
    }
  }

  /**
   * build experimental html.
   * @param {DocObject} doc - target doc object.
   * @returns {string} if doc is not experimental, returns empty.
   * @private
   */
  _buildExperimentalHTML(doc) {
    if (doc.experimental) {
      let experimental = [`this ${doc.kind} is experimental.`];
      if (typeof doc.experimental === 'string') experimental.push(doc.experimental);
      return experimental.join(' ');
    } else {
      return '';
    }
  }

  /**
   * build method of ancestor class link html.
   * @param {DocObject} doc - target doc object.
   * @returns {string} html link. if doc does not override ancestor method, returns empty.
   * @private
   */
  _buildOverrideMethod(doc) {
    let parentDoc = this._findByName(doc.memberof)[0];
    if (!parentDoc) return '';
    if (!parentDoc._custom_extends_chains) return;

    let chains = [...parentDoc._custom_extends_chains].reverse();
    for (let longname of chains) {
      let superClassDoc = this._findByName(longname)[0];
      if (!superClassDoc) continue;

      let superMethodDoc = this._find({name: doc.name, memberof: superClassDoc.longname})[0];
      if (!superMethodDoc) continue;

      return this._buildDocLinkHTML(superMethodDoc.longname, `${superClassDoc.name}#${superMethodDoc.name}`, true);
    }
  }

  /**
   * build coverage html.
   * @param {CoverageObject} coverageObj - target coverage object.
   * @returns {string} html of coverage badge.
   * @private
   */
  _buildCoverageHTML(coverageObj) {
    let coverage = Math.floor(100 * coverageObj.actualCount / coverageObj.expectCount);
    let colorClass;
    if (coverage < 50) {
      colorClass = 'esdoc-coverage-low';
    } else if (coverage < 90) {
      colorClass = 'esdoc-coverage-middle';
    } else {
      colorClass = 'esdoc-coverage-high';
    }

    let html = `<a href="https://esdoc.org" class="esdoc-coverage-wrap">
    <span class="esdoc-coverage-label">document</span><span class="esdoc-coverage-ratio ${colorClass}">${coverage}%</span>
    </a>`;

    return html;
  }

  //_buildAuthorHTML(doc, separator = '\n') {
  //  if (!doc.author) return '';
  //
  //  var html = [];
  //  for (var author of doc.author) {
  //    var matched = author.match(/(.*?) *<(.*?)>/);
  //    if (matched) {
  //      var name = matched[1];
  //      var link = matched[2];
  //      if (link.indexOf('http') === 0) {
  //        html.push(`<li><a href="${link}">${name}</a></li>`)
  //      } else {
  //        html.push(`<li><a href="mailto:${link}">${name}</a></li>`)
  //      }
  //    } else {
  //      html.push(`<li>${author}</li>`)
  //    }
  //  }
  //
  //  return `<ul>${html.join(separator)}</ul>`;
  //}
}
