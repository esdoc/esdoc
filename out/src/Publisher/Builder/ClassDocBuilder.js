'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _iceCap = require('ice-cap');

var _iceCap2 = _interopRequireDefault(_iceCap);

var _DocBuilder2 = require('./DocBuilder.js');

var _DocBuilder3 = _interopRequireDefault(_DocBuilder2);

var _util = require('./util.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class Output Builder class.
 */

var ClassDocBuilder = function (_DocBuilder) {
  _inherits(ClassDocBuilder, _DocBuilder);

  function ClassDocBuilder() {
    _classCallCheck(this, ClassDocBuilder);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ClassDocBuilder).apply(this, arguments));
  }

  _createClass(ClassDocBuilder, [{
    key: 'exec',

    /**
     * execute building output.
     * @param {function(html: string, filePath: string)} callback - is called each class.
     */
    value: function exec(callback) {
      var ice = this._buildLayoutDoc();
      ice.autoDrop = false;
      var docs = this._find({ kind: ['class'] });
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = docs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var doc = _step.value;

          var fileName = this._getOutputFileName(doc);
          var baseUrl = this._getBaseUrl(fileName);
          var title = this._getTitle(doc);
          ice.load('content', this._buildClassDoc(doc), _iceCap2.default.MODE_WRITE);
          ice.attr('baseUrl', 'href', baseUrl, _iceCap2.default.MODE_WRITE);
          ice.text('title', title, _iceCap2.default.MODE_WRITE);
          callback(ice.html, fileName);
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

    /**
     * build class output.
     * @param {DocObject} doc - class doc object.
     * @returns {IceCap} built output.
     * @private
     */

  }, {
    key: '_buildClassDoc',
    value: function _buildClassDoc(doc) {
      var _this2 = this;

      var expressionExtends = this._buildExpressionExtendsHTML(doc);
      var mixinClasses = this._buildMixinClassesHTML(doc);
      var extendsChain = this._buildExtendsChainHTML(doc);
      var directSubclass = this._buildDirectSubclassHTML(doc);
      var indirectSubclass = this._buildIndirectSubclassHTML(doc);
      var instanceDocs = this._find({ kind: 'variable' }).filter(function (v) {
        return v.type && v.type.types.includes(doc.longname);
      });

      var ice = new _iceCap2.default(this._readTemplate('class.html'));

      // header
      if (doc.export && doc.importPath && doc.importStyle) {
        var link = this._buildFileDocLinkHTML(doc, doc.importPath);
        ice.into('importPath', 'import ' + doc.importStyle + ' from \'' + link + '\'', function (code, ice) {
          ice.load('importPathCode', code);
        });
      }
      ice.text('access', doc.access);
      ice.text('kind', doc.interface ? 'interface' : 'class');
      ice.load('source', this._buildFileDocLinkHTML(doc, 'source'), 'append');
      ice.text('since', doc.since, 'append');
      ice.text('version', doc.version, 'append');
      ice.load('variation', this._buildVariationHTML(doc), 'append');

      ice.into('expressionExtends', expressionExtends, function (expressionExtends, ice) {
        return ice.load('expressionExtendsCode', expressionExtends);
      });
      ice.load('mixinExtends', mixinClasses, 'append');
      ice.load('extendsChain', extendsChain, 'append');
      ice.load('directSubclass', directSubclass, 'append');
      ice.load('indirectSubclass', indirectSubclass, 'append');
      ice.load('implements', this._buildDocsLinkHTML(doc.implements, null, false, ', '), 'append');
      ice.load('indirectImplements', this._buildDocsLinkHTML(doc._custom_indirect_implements, null, false, ', '), 'append');
      ice.load('directImplemented', this._buildDocsLinkHTML(doc._custom_direct_implemented, null, false, ', '), 'append');
      ice.load('indirectImplemented', this._buildDocsLinkHTML(doc._custom_indirect_implemented, null, false, ', '), 'append');

      // self
      ice.text('name', doc.name);
      ice.load('description', doc.description);
      ice.load('deprecated', this._buildDeprecatedHTML(doc));
      ice.load('experimental', this._buildExperimentalHTML(doc));
      ice.load('see', this._buildDocsLinkHTML(doc.see), 'append');
      ice.load('todo', this._buildDocsLinkHTML(doc.todo), 'append');

      ice.into('instanceDocs', instanceDocs, function (instanceDocs, ice) {
        ice.loop('instanceDoc', instanceDocs, function (i, instanceDoc, ice) {
          ice.load('instanceDoc', _this2._buildDocLinkHTML(instanceDoc.longname));
        });
      });

      ice.into('exampleDocs', doc.examples, function (examples, ice) {
        ice.loop('exampleDoc', examples, function (i, example, ice) {
          var parsed = (0, _util.parseExample)(example);
          ice.text('exampleCode', parsed.body);
          ice.text('exampleCaption', parsed.caption);
        });
      });

      ice.into('tests', doc._custom_tests, function (tests, ice) {
        ice.loop('test', tests, function (i, test, ice) {
          var testDoc = _this2._find({ longname: test })[0];
          ice.load('test', _this2._buildFileDocLinkHTML(testDoc, testDoc.testFullDescription));
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

  }, {
    key: '_buildVariationHTML',
    value: function _buildVariationHTML(doc) {
      var variationDocs = this._find({ memberof: doc.memberof, name: doc.name });
      var html = [];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = variationDocs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var variationDoc = _step2.value;

          if (variationDoc.variation === doc.variation) continue;

          html.push(this._buildDocLinkHTML(variationDoc.longname, '(' + (variationDoc.variation || 1) + ')'));
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

      return html.join(', ');
    }

    /**
     * build mixin extends html.
     * @param {DocObject} doc - target class doc.
     * @return {string} mixin extends html.
     */

  }, {
    key: '_buildMixinClassesHTML',
    value: function _buildMixinClassesHTML(doc) {
      if (!doc.extends) return '';
      if (doc.extends.length <= 1) return '';

      var links = [];
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = doc.extends[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var longname = _step3.value;

          links.push(this._buildDocLinkHTML(longname));
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

      return '<div>' + links.join(', ') + '</div>';
    }

    /**
     * build expression extends html.
     * @param {DocObject} doc - target class doc.
     * @return {string} expression extends html.
     */

  }, {
    key: '_buildExpressionExtendsHTML',
    value: function _buildExpressionExtendsHTML(doc) {
      var _this3 = this;

      if (!doc.expressionExtends) return '';

      var html = doc.expressionExtends.replace(/[A-Z_$][a-zA-Z0-9_$]*/g, function (v) {
        return _this3._buildDocLinkHTML(v);
      });

      return 'class ' + doc.name + ' extends ' + html;
    }

    /**
     * build class ancestor extends chain.
     * @param {DocObject} doc - target class doc.
     * @returns {string} extends chain links html.
     * @private
     */

  }, {
    key: '_buildExtendsChainHTML',
    value: function _buildExtendsChainHTML(doc) {
      if (!doc._custom_extends_chains) return '';
      if (doc.extends.length > 1) return '';

      var links = [];
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = doc._custom_extends_chains[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var longname = _step4.value;

          links.push(this._buildDocLinkHTML(longname));
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

      links.push(doc.name);

      return '<div>' + links.join(' → ') + '</div>';
    }

    /**
     * build in-direct subclass list.
     * @param {DocObject} doc - target class doc.
     * @returns {string} html of in-direct subclass links.
     * @private
     */

  }, {
    key: '_buildIndirectSubclassHTML',
    value: function _buildIndirectSubclassHTML(doc) {
      if (!doc._custom_indirect_subclasses) return '';

      var links = [];
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = doc._custom_indirect_subclasses[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var longname = _step5.value;

          links.push(this._buildDocLinkHTML(longname));
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

      return '<div>' + links.join(', ') + '</div>';
    }

    /**
     * build direct subclass list.
     * @param {DocObject} doc - target class doc.
     * @returns {string} html of direct subclass links.
     * @private
     */

  }, {
    key: '_buildDirectSubclassHTML',
    value: function _buildDirectSubclassHTML(doc) {
      if (!doc._custom_direct_subclasses) return '';

      var links = [];
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = doc._custom_direct_subclasses[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var longname = _step6.value;

          links.push(this._buildDocLinkHTML(longname));
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

      return '<div>' + links.join(', ') + '</div>';
    }

    /**
     * build inherited method/member summary.
     * @param {DocObject} doc - target class doc.
     * @returns {string} html of inherited method/member from ancestor classes.
     * @private
     */

  }, {
    key: '_buildInheritedSummaryHTML',
    value: function _buildInheritedSummaryHTML(doc) {
      if (['class', 'interface'].indexOf(doc.kind) === -1) return '';

      var longnames = [].concat(_toConsumableArray(doc._custom_extends_chains || []));

      //...doc.implements || [],
      //...doc._custom_indirect_implements || [],
      var html = [];
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = longnames[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var longname = _step7.value;

          var superDoc = this._find({ longname: longname })[0];

          if (!superDoc) continue;

          var targetDocs = this._find({ memberof: longname, kind: ['member', 'method', 'get', 'set'] });

          targetDocs.sort(function (a, b) {
            if (a.static !== b.static) return -(a.static - b.static);

            var order = { get: 0, set: 0, member: 1, method: 2 };
            if (order[a.kind] !== order[b.kind]) {
              return order[a.kind] - order[b.kind];
            }

            order = { public: 0, protected: 1, private: 2 };
            if (a.access != b.access) return order[a.access] - order[b.access];

            if (a.name !== b.name) return a.name < b.name ? -1 : 1;

            order = { get: 0, set: 1, member: 2 };
            return order[a.kind] - order[b.kind];
          });

          var title = '<span class="toggle closed"></span> From ' + superDoc.kind + ' ' + this._buildDocLinkHTML(longname, superDoc.name);
          var result = this._buildSummaryDoc(targetDocs, '----------', false, superDoc.kind);
          if (result) {
            result.load('title', title, _iceCap2.default.MODE_WRITE);
            html.push(result.html);
          }
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

      return html.join('\n');
    }
  }]);

  return ClassDocBuilder;
}(_DocBuilder3.default);

exports.default = ClassDocBuilder;
module.exports = exports['default'];