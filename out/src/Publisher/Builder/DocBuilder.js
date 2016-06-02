'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _escapeHtml = require('escape-html');

var _escapeHtml2 = _interopRequireDefault(_escapeHtml);

var _iceCap = require('ice-cap');

var _iceCap2 = _interopRequireDefault(_iceCap);

var _util = require('./util.js');

var _DocResolver = require('./DocResolver.js');

var _DocResolver2 = _interopRequireDefault(_DocResolver);

var _NPMUtil = require('../../Util/NPMUtil.js');

var _NPMUtil2 = _interopRequireDefault(_NPMUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Builder base class.
 */

var DocBuilder = function () {
  /**
   * create instance.
   * @param {Taffy} data - doc object database.
   * @param {ESDocConfig} config - esdoc config is used build output.
   */

  function DocBuilder(data, config) {
    _classCallCheck(this, DocBuilder);

    this._data = data;
    this._config = config;
    new _DocResolver2.default(this).resolve();
  }

  /**
   * execute building output.
   * @abstract
   * @param {function} callback - is called with some data.
   */


  _createClass(DocBuilder, [{
    key: 'exec',
    value: function exec(callback) {}

    /**
     * find doc object.
     * @param {...Object} cond - find condition.
     * @returns {DocObject[]} found doc objects.
     * @private
     */

  }, {
    key: '_find',
    value: function _find() {
      for (var _len = arguments.length, cond = Array(_len), _key = 0; _key < _len; _key++) {
        cond[_key] = arguments[_key];
      }

      return this._orderedFind.apply(this, [null].concat(cond));
    }

    /**
     * find all identifiers with kind grouping.
     * @returns {{class: DocObject[], interface: DocObject[], function: DocObject[], variable: DocObject[], typedef: DocObject[], external: DocObject[]}} found doc objects.
     * @private
     */

  }, {
    key: '_findAllIdentifiersKindGrouping',
    value: function _findAllIdentifiersKindGrouping() {
      var result = {
        class: this._find([{ kind: 'class', interface: false }]),
        interface: this._find([{ kind: 'class', interface: true }]),
        function: this._find([{ kind: 'function' }]),
        variable: this._find([{ kind: 'variable' }]),
        typedef: this._find([{ kind: 'typedef' }]),
        external: this._find([{ kind: 'external' }]).filter(function (v) {
          return !v.builtinExternal;
        })
      };
      return result;
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

  }, {
    key: '_findByName',
    value: function _findByName(name) {
      var kind = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      var docs = void 0;

      if (kind) {
        docs = this._orderedFind(null, { longname: name, kind: kind });
      } else {
        docs = this._orderedFind(null, { longname: name });
      }
      if (docs.length) return docs;

      if (kind) {
        docs = this._orderedFind(null, { name: name, kind: kind });
      } else {
        docs = this._orderedFind(null, { name: name });
      }
      if (docs.length) return docs;

      var regexp = new RegExp('[~]' + name.replace('*', '\\*') + '$'); // if name is `*`, need to escape.
      if (kind) {
        docs = this._orderedFind(null, { longname: { regex: regexp }, kind: kind });
      } else {
        docs = this._orderedFind(null, { longname: { regex: regexp } });
      }
      if (docs.length) return docs;

      // inherited method?
      var matched = name.match(/(.*)[.#](.*)$/); // instance method(Foo#bar) or static method(Foo.baz)
      if (matched) {
        var parent = matched[1];
        var childName = matched[2];
        var parentDoc = this._findByName(parent, 'class')[0];
        if (parentDoc && parentDoc._custom_extends_chains) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = parentDoc._custom_extends_chains[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var superLongname = _step.value;

              var _docs = this._find({ memberof: superLongname, name: childName });
              if (_docs.length) return _docs;
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
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

  }, {
    key: '_orderedFind',
    value: function _orderedFind(order) {
      for (var _len2 = arguments.length, cond = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        cond[_key2 - 1] = arguments[_key2];
      }

      var data = this._data.apply(this, cond);

      if (order) {
        return data.order(order + ', name asec').map(function (v) {
          return v;
        });
      } else {
        return data.order('name asec').map(function (v) {
          return v;
        });
      }
    }

    /**
     * read html template.
     * @param {string} fileName - template file name.
     * @return {string} html of template.
     * @private
     */

  }, {
    key: '_readTemplate',
    value: function _readTemplate(fileName) {
      var filePath = _path2.default.resolve(__dirname, './template/' + fileName);
      return _fs2.default.readFileSync(filePath, { encoding: 'utf-8' });
    }

    /**
     * get target's essential info.
     * @returns {{title: string, version: string, url: string}}
     * @private
     */

  }, {
    key: '_getInfo',
    value: function _getInfo() {
      var config = this._config;
      var packageObj = {};
      if (config.package) {
        var packagePath = config.package;
        try {
          var json = _fs2.default.readFileSync(packagePath, { encoding: 'utf-8' });
          packageObj = JSON.parse(json);
        } catch (e) {
          // ignore
        }
      }

      // repository url
      var url = null;
      if (packageObj.repository) {
        if (packageObj.repository.url) {
          url = packageObj.repository.url;
        } else {
          url = packageObj.repository;
        }

        if (typeof url === 'string') {
          if (url.indexOf('git@github.com:') === 0) {
            // url: git@github.com:foo/bar.git
            var matched = url.match(/^git@github\.com:(.*)\.git$/);
            if (matched && matched[1]) {
              url = 'https://github.com/' + matched[1];
            }
          } else if (url.match(/^[\w\d\-_]+\/[\w\d\-_]+$/)) {
            // url: foo/bar
            url = 'https://github.com/' + url;
          } else if (url.match(/^git\+https:\/\/github.com\/.*\.git$/)) {
            // git+https://github.com/foo/bar.git
            var _matched = url.match(/^git\+(https:\/\/github.com\/.*)\.git$/);
            url = _matched[1];
          } else if (url.match(/(https?:\/\/.*$)/)) {
            // other url
            var _matched2 = url.match(/(https?:\/\/.*$)/);
            url = _matched2[1];
          } else {
            url = '';
          }
        } else {
          url = null;
        }
      }

      var indexInfo = {
        title: config.title || packageObj.name,
        version: config.version || packageObj.version,
        url: url
      };

      return indexInfo;
    }

    /**
     * build common layout output.
     * @return {IceCap} layout output.
     * @private
     */

  }, {
    key: '_buildLayoutDoc',
    value: function _buildLayoutDoc() {
      var info = this._getInfo();

      var ice = new _iceCap2.default(this._readTemplate('layout.html'), { autoClose: false });

      var packageObj = _NPMUtil2.default.findPackage();
      if (packageObj) {
        ice.text('esdocVersion', '(' + packageObj.version + ')');
      } else {
        ice.drop('esdocVersion');
      }

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
      ice.loop('userScript', this._config.scripts || [], function (i, userScript, ice) {
        var name = 'user/script/' + i + '-' + _path2.default.basename(userScript);
        ice.attr('userScript', 'src', name);
      });

      ice.loop('userStyle', this._config.styles || [], function (i, userStyle, ice) {
        var name = 'user/css/' + i + '-' + _path2.default.basename(userStyle);
        ice.attr('userStyle', 'href', name);
      });

      ice.drop('manualHeaderLink', !this._config.manual);

      ice.load('nav', this._buildNavDoc());
      return ice;
    }

    /**
     * build common navigation output.
     * @return {IceCap} navigation output.
     * @private
     */

  }, {
    key: '_buildNavDoc',
    value: function _buildNavDoc() {
      var _this = this;

      var html = this._readTemplate('nav.html');
      var ice = new _iceCap2.default(html);

      var kinds = ['class', 'function', 'variable', 'typedef', 'external'];
      var allDocs = this._find({ kind: kinds }).filter(function (v) {
        return !v.builtinExternal;
      });
      var kindOrder = { class: 0, interface: 1, function: 2, variable: 3, typedef: 4, external: 5 };
      allDocs.sort(function (a, b) {
        var filePathA = a.longname.split('~')[0].replace('src/', '');
        var filePathB = b.longname.split('~')[0].replace('src/', '');
        var dirPathA = _path2.default.dirname(filePathA);
        var dirPathB = _path2.default.dirname(filePathB);
        var kindA = a.interface ? 'interface' : a.kind;
        var kindB = b.interface ? 'interface' : b.kind;
        if (dirPathA === dirPathB) {
          if (kindA === kindB) {
            return a.longname > b.longname ? 1 : -1;
          } else {
            return kindOrder[kindA] > kindOrder[kindB] ? 1 : -1;
          }
        } else {
          return dirPathA > dirPathB ? 1 : -1;
        }
      });
      var lastDirPath = '.';
      ice.loop('doc', allDocs, function (i, doc, ice) {
        var filePath = doc.longname.split('~')[0].replace(/^.*?[/]/, '');
        var dirPath = _path2.default.dirname(filePath);
        var kind = doc.interface ? 'interface' : doc.kind;
        var kindText = kind.charAt(0).toUpperCase();
        var kindClass = 'kind-' + kind;
        ice.load('name', _this._buildDocLinkHTML(doc.longname));
        ice.load('kind', kindText);
        ice.attr('kind', 'class', kindClass);
        ice.text('dirPath', dirPath);
        ice.drop('dirPath', lastDirPath === dirPath);
        lastDirPath = dirPath;
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

  }, {
    key: '_findAccessDocs',
    value: function _findAccessDocs(doc, kind) {
      var isStatic = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

      var cond = { kind: kind, static: isStatic };

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

      var publicDocs = this._find(cond, { access: 'public' }).filter(function (v) {
        return !v.builtinExternal;
      });
      var protectedDocs = this._find(cond, { access: 'protected' }).filter(function (v) {
        return !v.builtinExternal;
      });
      var privateDocs = this._find(cond, { access: 'private' }).filter(function (v) {
        return !v.builtinExternal;
      });
      var accessDocs = [['Public', publicDocs], ['Protected', protectedDocs], ['Private', privateDocs]];

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

  }, {
    key: '_buildSummaryHTML',
    value: function _buildSummaryHTML(doc, kind, title) {
      var isStatic = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];

      var accessDocs = this._findAccessDocs(doc, kind, isStatic);
      var html = '';
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = accessDocs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var accessDoc = _step2.value;

          var docs = accessDoc[1];
          if (!docs.length) continue;

          var prefix = '';
          if (docs[0].static) prefix = 'Static ';
          var _title = '' + prefix + accessDoc[0] + ' ' + title;

          var result = this._buildSummaryDoc(docs, _title);
          if (result) {
            html += result.html;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
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

  }, {
    key: '_buildSummaryDoc',
    value: function _buildSummaryDoc(docs, title, innerLink) {
      var _this2 = this;

      if (docs.length === 0) return;

      var ice = new _iceCap2.default(this._readTemplate('summary.html'));

      ice.text('title', title);
      ice.loop('target', docs, function (i, doc, ice) {
        ice.text('generator', doc.generator ? '*' : '');
        ice.load('name', _this2._buildDocLinkHTML(doc.longname, null, innerLink, doc.kind));
        ice.load('signature', _this2._buildSignatureHTML(doc));
        ice.load('description', (0, _util.shorten)(doc, true));
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
        ice.load('deprecated', _this2._buildDeprecatedHTML(doc));
        ice.load('experimental', _this2._buildExperimentalHTML(doc));
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

  }, {
    key: '_buildDetailHTML',
    value: function _buildDetailHTML(doc, kind, title) {
      var isStatic = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];

      var accessDocs = this._findAccessDocs(doc, kind, isStatic);
      var html = '';
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = accessDocs[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var accessDoc = _step3.value;

          var docs = accessDoc[1];
          if (!docs.length) continue;

          var prefix = '';
          if (docs[0].static) prefix = 'Static ';
          var _title = '' + prefix + accessDoc[0] + ' ' + title;

          var result = this._buildDetailDocs(docs, _title);
          if (result) html += result.html;
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
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

  }, {
    key: '_buildDetailDocs',
    value: function _buildDetailDocs(docs, title) {
      var _this3 = this;

      var ice = new _iceCap2.default(this._readTemplate('details.html'));

      ice.text('title', title);
      ice.drop('title', !docs.length);

      ice.loop('detail', docs, function (i, doc, ice) {
        var scope = doc.static ? 'static' : 'instance';
        ice.attr('anchor', 'id', scope + '-' + doc.kind + '-' + doc.name);
        ice.text('generator', doc.generator ? '*' : '');
        ice.text('name', doc.name);
        ice.load('signature', _this3._buildSignatureHTML(doc));
        ice.load('description', doc.description);
        ice.text('abstract', doc.abstract ? 'abstract' : '');
        ice.text('access', doc.access);
        if (['get', 'set'].includes(doc.kind)) {
          ice.text('kind', doc.kind);
        } else {
          ice.drop('kind');
        }
        if (doc.export && doc.importPath && doc.importStyle) {
          var link = _this3._buildFileDocLinkHTML(doc, doc.importPath);
          ice.into('importPath', 'import ' + doc.importStyle + ' from \'' + link + '\'', function (code, ice) {
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

        ice.load('source', _this3._buildFileDocLinkHTML(doc, 'source'));
        ice.text('since', doc.since, 'append');
        ice.load('deprecated', _this3._buildDeprecatedHTML(doc));
        ice.load('experimental', _this3._buildExperimentalHTML(doc));
        ice.text('version', doc.version, 'append');
        ice.load('see', _this3._buildDocsLinkHTML(doc.see), 'append');
        ice.load('todo', _this3._buildDocsLinkHTML(doc.todo), 'append');
        ice.load('override', _this3._buildOverrideMethod(doc));

        var isFunction = false;
        if (['method', 'constructor', 'function'].indexOf(doc.kind) !== -1) isFunction = true;
        if (doc.kind === 'typedef' && doc.params && doc.type.types[0] === 'function') isFunction = true;

        if (isFunction) {
          ice.load('properties', _this3._buildProperties(doc.params, 'Params:'));
        } else {
          ice.load('properties', _this3._buildProperties(doc.properties, 'Properties:'));
        }

        // return
        if (doc.return) {
          ice.load('returnDescription', doc.return.description);
          var typeNames = [];
          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = doc.return.types[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var typeName = _step4.value;

              typeNames.push(_this3._buildTypeDocLinkHTML(typeName));
            }
          } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
              }
            } finally {
              if (_didIteratorError4) {
                throw _iteratorError4;
              }
            }
          }

          if (typeof doc.return.nullable === 'boolean') {
            var nullable = doc.return.nullable;
            ice.load('returnType', typeNames.join(' | ') + (' (nullable: ' + nullable + ')'));
          } else {
            ice.load('returnType', typeNames.join(' | '));
          }

          ice.load('returnProperties', _this3._buildProperties(doc.properties, 'Return Properties:'));
        } else {
          ice.drop('returnParams');
        }

        // throws
        if (doc.throws) {
          ice.loop('throw', doc.throws, function (i, exceptionDoc, ice) {
            ice.load('throwName', _this3._buildDocLinkHTML(exceptionDoc.types[0]));
            ice.load('throwDesc', exceptionDoc.description);
          });
        } else {
          ice.drop('throwWrap');
        }

        // fires
        if (doc.emits) {
          ice.loop('emit', doc.emits, function (i, emitDoc, ice) {
            ice.load('emitName', _this3._buildDocLinkHTML(emitDoc.types[0]));
            ice.load('emitDesc', emitDoc.description);
          });
        } else {
          ice.drop('emitWrap');
        }

        // listens
        if (doc.listens) {
          ice.loop('listen', doc.listens, function (i, listenDoc, ice) {
            ice.load('listenName', _this3._buildDocLinkHTML(listenDoc.types[0]));
            ice.load('listenDesc', listenDoc.description);
          });
        } else {
          ice.drop('listenWrap');
        }

        // example
        ice.into('example', doc.examples, function (examples, ice) {
          ice.loop('exampleDoc', examples, function (i, exampleDoc, ice) {
            var parsed = (0, _util.parseExample)(exampleDoc);
            ice.text('exampleCode', parsed.body);
            ice.text('exampleCaption', parsed.caption);
          });
        });

        // tests
        ice.into('tests', doc._custom_tests, function (tests, ice) {
          ice.loop('test', tests, function (i, test, ice) {
            var testDoc = _this3._find({ longname: test })[0];
            ice.load('test', _this3._buildFileDocLinkHTML(testDoc, testDoc.testFullDescription));
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

  }, {
    key: '_getTitle',
    value: function _getTitle() {
      var doc = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

      var name = doc.name || doc.toString();

      if (!name) {
        if (this._config.title) {
          return this._config.title + ' API Document';
        } else {
          return 'API Document';
        }
      }

      if (this._config.title) {
        return name + ' | ' + this._config.title + ' API Document';
      } else {
        return name + ' | API Document';
      }
    }

    /**
     * get base url html page. it is used html base tag.
     * @param {string} fileName - output file path.
     * @returns {string} base url.
     * @private
     */

  }, {
    key: '_getBaseUrl',
    value: function _getBaseUrl(fileName) {
      var baseUrl = '../'.repeat(fileName.split('/').length - 1);
      return baseUrl;
    }

    /**
     * gat url of output html page.
     * @param {DocObject} doc - target doc object.
     * @returns {string} url of output html. it is relative path from output root dir.
     * @private
     */

  }, {
    key: '_getURL',
    value: function _getURL(doc) {
      var inner = false;
      if (['variable', 'function', 'member', 'typedef', 'method', 'constructor', 'get', 'set'].includes(doc.kind)) {
        inner = true;
      }

      if (inner) {
        var scope = doc.static ? 'static' : 'instance';
        var fileName = this._getOutputFileName(doc);
        return fileName + '#' + scope + '-' + doc.kind + '-' + doc.name;
      } else {
        var _fileName = this._getOutputFileName(doc);
        return _fileName;
      }
    }

    /**
     * get file name of output html page.
     * @param {DocObject} doc - target doc object.
     * @returns {string} file name.
     * @private
     */

  }, {
    key: '_getOutputFileName',
    value: function _getOutputFileName(doc) {
      switch (doc.kind) {
        case 'variable':
          return 'variable/index.html';
        case 'function':
          return 'function/index.html';
        case 'member': // fall
        case 'method': // fall
        case 'constructor': // fall
        case 'set': // fall
        case 'get':
          // fal
          var parentDoc = this._find({ longname: doc.memberof })[0];
          return this._getOutputFileName(parentDoc);
        case 'external':
          return 'external/index.html';
        case 'typedef':
          return 'typedef/index.html';
        case 'class':
          return 'class/' + doc.longname + '.html';
        case 'file':
          return 'file/' + doc.longname + '.html';
        case 'testFile':
          return 'test-file/' + doc.longname + '.html';
        case 'testDescribe':
          return 'test.html';
        case 'testIt':
          return 'test.html';
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

  }, {
    key: '_buildFileDocLinkHTML',
    value: function _buildFileDocLinkHTML(doc) {
      var text = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      if (!doc) return '';

      var fileDoc = void 0;
      if (doc.kind === 'file' || doc.kind === 'testFile') {
        fileDoc = doc;
      } else {
        var filePath = doc.longname.split('~')[0];
        fileDoc = this._find({ kind: ['file', 'testFile'], longname: filePath })[0];
      }

      if (!fileDoc) return '';

      if (!text) text = fileDoc.name;

      if (doc.kind === 'file' || doc.kind === 'testFile') {
        return '<span><a href="' + this._getURL(fileDoc) + '">' + text + '</a></span>';
      } else {
        return '<span><a href="' + this._getURL(fileDoc) + '#lineNumber' + doc.lineNumber + '">' + text + '</a></span>';
      }
    }

    /**
     * build html link of type.
     * @param {string} typeName - type name(e.g. ``number[]``, ``Map<number, string>``)
     * @returns {string} html of link.
     * @private
     * @todo re-implement with parser combinator.
     */

  }, {
    key: '_buildTypeDocLinkHTML',
    value: function _buildTypeDocLinkHTML(typeName) {
      var _this4 = this;

      // e.g. number[]
      var matched = typeName.match(/^(.*?)\[\]$/);
      if (matched) {
        typeName = matched[1];
        return '<span>' + this._buildDocLinkHTML(typeName, typeName) + '<span>[]</span></span>';
      }

      // e.g. function(a: number, b: string): boolean
      matched = typeName.match(/function *\((.*?)\)(.*)/);
      if (matched) {
        var functionLink = this._buildDocLinkHTML('function');
        if (!matched[1] && !matched[2]) return '<span>' + functionLink + '<span>()</span></span>';

        var innerTypes = [];
        if (matched[1]) {
          // bad hack: Map.<string, boolean> => Map.<string\Z boolean>
          // bad hack: {a: string, b: boolean} => {a\Y string\Z b\Y boolean}
          var inner = matched[1].replace(/<.*?>/g, function (a) {
            return a.replace(/,/g, '\\Z');
          }).replace(/{.*?}/g, function (a) {
            return a.replace(/,/g, '\\Z').replace(/:/g, '\\Y');
          });
          innerTypes = inner.split(',').map(function (v) {
            var tmp = v.split(':').map(function (v) {
              return v.trim();
            });
            var paramName = tmp[0];
            var typeName = tmp[1].replace(/\\Z/g, ',').replace(/\\Y/g, ':');
            return paramName + ': ' + _this4._buildTypeDocLinkHTML(typeName);
          });
        }

        var returnType = '';
        if (matched[2]) {
          var type = matched[2].split(':')[1];
          if (type) returnType = ': ' + this._buildTypeDocLinkHTML(type.trim());
        }

        return '<span>' + functionLink + '<span>(' + innerTypes.join(', ') + ')</span>' + returnType + '</span>';
      }

      // e.g. {a: number, b: string}
      matched = typeName.match(/^\{(.*?)\}$/);
      if (matched) {
        if (!matched[1]) return '{}';

        // bad hack: Map.<string, boolean> => Map.<string\Z boolean>
        // bad hack: {a: string, b: boolean} => {a\Y string\Z b\Y boolean}
        var _inner = matched[1].replace(/<.*?>/g, function (a) {
          return a.replace(/,/g, '\\Z');
        }).replace(/{.*?}/g, function (a) {
          return a.replace(/,/g, '\\Z').replace(/:/g, '\\Y');
        });
        var _innerTypes = _inner.split(',').map(function (v) {
          var tmp = v.split(':').map(function (v) {
            return v.trim();
          });
          var paramName = tmp[0];
          var typeName = tmp[1].replace(/\\Z/g, ',').replace(/\\Y/g, ':');
          if (typeName.includes('|')) {
            typeName = typeName.replace(/^\(/, '').replace(/\)$/, '');
            var typeNames = typeName.split('|').map(function (v) {
              return v.trim();
            });
            var html = [];
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
              for (var _iterator5 = typeNames[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                var unionType = _step5.value;

                html.push(_this4._buildTypeDocLinkHTML(unionType));
              }
            } catch (err) {
              _didIteratorError5 = true;
              _iteratorError5 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                  _iterator5.return();
                }
              } finally {
                if (_didIteratorError5) {
                  throw _iteratorError5;
                }
              }
            }

            return paramName + ': ' + html.join('|');
          } else {
            return paramName + ': ' + _this4._buildTypeDocLinkHTML(typeName);
          }
        });

        return '{' + _innerTypes.join(', ') + '}';
      }

      // e.g. Map<number, string>
      matched = typeName.match(/^(.*?)\.?<(.*?)>$/);
      if (matched) {
        var mainType = matched[1];
        // bad hack: Map.<string, boolean> => Map.<string\Z boolean>
        // bad hack: {a: string, b: boolean} => {a\Y string\Z b\Y boolean}
        var _inner2 = matched[2].replace(/<.*?>/g, function (a) {
          return a.replace(/,/g, '\\Z');
        }).replace(/{.*?}/g, function (a) {
          return a.replace(/,/g, '\\Z').replace(/:/g, '\\Y');
        });
        var _innerTypes2 = _inner2.split(',').map(function (v) {
          v = v.trim().replace(/\\Z/g, ',').replace(/\\Y/g, ':');
          return _this4._buildTypeDocLinkHTML(v);
        });

        var html = this._buildDocLinkHTML(mainType, mainType) + '<' + _innerTypes2.join(', ') + '>';
        return html;
      }

      if (typeName.indexOf('...') === 0) {
        typeName = typeName.replace('...', '');
        return '...' + this._buildDocLinkHTML(typeName);
      } else if (typeName.indexOf('?') === 0) {
        typeName = typeName.replace('?', '');
        return '?' + this._buildDocLinkHTML(typeName);
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

  }, {
    key: '_buildDocLinkHTML',
    value: function _buildDocLinkHTML(longname) {
      var text = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
      var inner = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
      var kind = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

      if (!longname) return '';

      if (typeof longname !== 'string') throw new Error(JSON.stringify(longname));

      var doc = this._findByName(longname, kind)[0];

      if (!doc) {
        // if longname is HTML tag, not escape.
        if (longname.indexOf('<') === 0) {
          return '<span>' + longname + '</span>';
        } else {
          return '<span>' + (0, _escapeHtml2.default)(text || longname) + '</span>';
        }
      }

      if (doc.kind === 'external') {
        text = doc.name;
        return '<span><a href="' + doc.externalLink + '">' + text + '</a></span>';
      } else {
        text = (0, _escapeHtml2.default)(text || doc.name);
        var url = this._getURL(doc, inner);
        if (url) {
          return '<span><a href="' + url + '">' + text + '</a></span>';
        } else {
          return '<span>' + text + '</span>';
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

  }, {
    key: '_buildDocsLinkHTML',
    value: function _buildDocsLinkHTML(longnames) {
      var text = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
      var inner = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
      var separator = arguments.length <= 3 || arguments[3] === undefined ? '\n' : arguments[3];

      if (!longnames) return '';
      if (!longnames.length) return '';

      var links = [];
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = longnames[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var longname = _step6.value;

          if (!longname) continue;
          var link = this._buildDocLinkHTML(longname, text, inner);
          links.push('<li>' + link + '</li>');
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }

      if (!links.length) return '';

      return '<ul>' + links.join(separator) + '</ul>';
    }

    /**
     * build identifier signature html.
     * @param {DocObject} doc - target doc object.
     * @returns {string} signature html.
     * @private
     */

  }, {
    key: '_buildSignatureHTML',
    value: function _buildSignatureHTML(doc) {
      // call signature
      var callSignatures = [];
      if (doc.params) {
        var _iteratorNormalCompletion7 = true;
        var _didIteratorError7 = false;
        var _iteratorError7 = undefined;

        try {
          for (var _iterator7 = doc.params[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
            var param = _step7.value;

            var paramName = param.name;
            if (paramName.indexOf('.') !== -1) continue;

            var types = [];
            var _iteratorNormalCompletion8 = true;
            var _didIteratorError8 = false;
            var _iteratorError8 = undefined;

            try {
              for (var _iterator8 = param.types[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                var typeName = _step8.value;

                types.push(this._buildTypeDocLinkHTML(typeName));
              }
            } catch (err) {
              _didIteratorError8 = true;
              _iteratorError8 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion8 && _iterator8.return) {
                  _iterator8.return();
                }
              } finally {
                if (_didIteratorError8) {
                  throw _iteratorError8;
                }
              }
            }

            callSignatures.push(paramName + ': ' + types.join(' | '));
          }
        } catch (err) {
          _didIteratorError7 = true;
          _iteratorError7 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion7 && _iterator7.return) {
              _iterator7.return();
            }
          } finally {
            if (_didIteratorError7) {
              throw _iteratorError7;
            }
          }
        }
      }

      // return signature
      var returnSignatures = [];
      if (doc.return) {
        var _iteratorNormalCompletion9 = true;
        var _didIteratorError9 = false;
        var _iteratorError9 = undefined;

        try {
          for (var _iterator9 = doc.return.types[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
            var _typeName = _step9.value;

            returnSignatures.push(this._buildTypeDocLinkHTML(_typeName));
          }
        } catch (err) {
          _didIteratorError9 = true;
          _iteratorError9 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion9 && _iterator9.return) {
              _iterator9.return();
            }
          } finally {
            if (_didIteratorError9) {
              throw _iteratorError9;
            }
          }
        }
      }

      // type signature
      var typeSignatures = [];
      if (doc.type) {
        var _iteratorNormalCompletion10 = true;
        var _didIteratorError10 = false;
        var _iteratorError10 = undefined;

        try {
          for (var _iterator10 = doc.type.types[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
            var _typeName2 = _step10.value;

            typeSignatures.push(this._buildTypeDocLinkHTML(_typeName2));
          }
        } catch (err) {
          _didIteratorError10 = true;
          _iteratorError10 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion10 && _iterator10.return) {
              _iterator10.return();
            }
          } finally {
            if (_didIteratorError10) {
              throw _iteratorError10;
            }
          }
        }
      }

      // callback is not need type. because type is always function.
      if (doc.kind === 'function') {
        typeSignatures = [];
      }

      var html = '';
      if (callSignatures.length) {
        html = '(' + callSignatures.join(', ') + ')';
      } else if (['function', 'method'].includes(doc.kind)) {
        html = '()';
      }
      if (returnSignatures.length) html = html + ': ' + returnSignatures.join(' | ');
      if (typeSignatures.length) html = html + ': ' + typeSignatures.join(' | ');

      return html;
    }

    /**
     * build properties output.
     * @param {ParsedParam[]} [properties=[]] - properties in doc object.
     * @param {string} title - output title.
     * @return {IceCap} built properties output.
     * @private
     */

  }, {
    key: '_buildProperties',
    value: function _buildProperties() {
      var _this5 = this;

      var properties = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
      var title = arguments.length <= 1 || arguments[1] === undefined ? 'Properties:' : arguments[1];

      var ice = new _iceCap2.default(this._readTemplate('properties.html'));

      ice.text('title', title);

      ice.loop('property', properties, function (i, prop, ice) {
        ice.autoDrop = false;
        ice.attr('property', 'data-depth', prop.name.split('.').length - 1);
        ice.text('name', prop.name);
        ice.attr('name', 'data-depth', prop.name.split('.').length - 1);
        ice.load('description', prop.description);

        var typeNames = [];
        var _iteratorNormalCompletion11 = true;
        var _didIteratorError11 = false;
        var _iteratorError11 = undefined;

        try {
          for (var _iterator11 = prop.types[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
            var typeName = _step11.value;

            typeNames.push(_this5._buildTypeDocLinkHTML(typeName));
          }
        } catch (err) {
          _didIteratorError11 = true;
          _iteratorError11 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion11 && _iterator11.return) {
              _iterator11.return();
            }
          } finally {
            if (_didIteratorError11) {
              throw _iteratorError11;
            }
          }
        }

        ice.load('type', typeNames.join(' | '));

        // appendix
        var appendix = [];
        if (prop.optional) {
          appendix.push('<li>optional</li>');
        }
        if ('defaultValue' in prop) {
          appendix.push('<li>default: ' + prop.defaultValue + '</li>');
        }
        if (typeof prop.nullable === 'boolean') {
          appendix.push('<li>nullable: ' + prop.nullable + '</li>');
        }
        if (appendix.length) {
          ice.load('appendix', '<ul>' + appendix.join('\n') + '</ul>');
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

  }, {
    key: '_buildDeprecatedHTML',
    value: function _buildDeprecatedHTML(doc) {
      if (doc.deprecated) {
        var deprecated = ['this ' + doc.kind + ' was deprecated.'];
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

  }, {
    key: '_buildExperimentalHTML',
    value: function _buildExperimentalHTML(doc) {
      if (doc.experimental) {
        var experimental = ['this ' + doc.kind + ' is experimental.'];
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

  }, {
    key: '_buildOverrideMethod',
    value: function _buildOverrideMethod(doc) {
      var parentDoc = this._findByName(doc.memberof)[0];
      if (!parentDoc) return '';
      if (!parentDoc._custom_extends_chains) return;

      var chains = [].concat(_toConsumableArray(parentDoc._custom_extends_chains)).reverse();
      var _iteratorNormalCompletion12 = true;
      var _didIteratorError12 = false;
      var _iteratorError12 = undefined;

      try {
        for (var _iterator12 = chains[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
          var longname = _step12.value;

          var superClassDoc = this._findByName(longname)[0];
          if (!superClassDoc) continue;

          var superMethodDoc = this._find({ name: doc.name, memberof: superClassDoc.longname })[0];
          if (!superMethodDoc) continue;

          return this._buildDocLinkHTML(superMethodDoc.longname, superClassDoc.name + '#' + superMethodDoc.name, true);
        }
      } catch (err) {
        _didIteratorError12 = true;
        _iteratorError12 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion12 && _iterator12.return) {
            _iterator12.return();
          }
        } finally {
          if (_didIteratorError12) {
            throw _iteratorError12;
          }
        }
      }
    }

    /**
     * build coverage html.
     * @param {CoverageObject} coverageObj - target coverage object.
     * @returns {string} html of coverage badge.
     * @private
     * @deprecated
     */

  }, {
    key: '_buildCoverageHTML',
    value: function _buildCoverageHTML(coverageObj) {
      var coverage = Math.floor(100 * coverageObj.actualCount / coverageObj.expectCount);
      var colorClass = void 0;
      if (coverage < 50) {
        colorClass = 'esdoc-coverage-low';
      } else if (coverage < 90) {
        colorClass = 'esdoc-coverage-middle';
      } else {
        colorClass = 'esdoc-coverage-high';
      }

      var html = '<a href="https://esdoc.org" class="esdoc-coverage-wrap">\n    <span class="esdoc-coverage-label">document</span><span class="esdoc-coverage-ratio ' + colorClass + '">' + coverage + '%</span>\n    </a>';

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

  }]);

  return DocBuilder;
}();

exports.default = DocBuilder;