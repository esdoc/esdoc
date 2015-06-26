'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _colorLogger = require('color-logger');

var _colorLogger2 = _interopRequireDefault(_colorLogger);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _UtilASTUtilJs = require('../Util/ASTUtil.js');

var _UtilASTUtilJs2 = _interopRequireDefault(_UtilASTUtilJs);

var logger = new _colorLogger2['default']('ParamParser');

/**
 * Param Type Parser class.
 */

var ParamParser = (function () {
  function ParamParser() {
    _classCallCheck(this, ParamParser);
  }

  _createClass(ParamParser, null, [{
    key: 'parseParamValue',

    /**
     * parse param value.
     * @param {string} value - param value.
     * @param {boolean} [type=true] if true, contain param type.
     * @param {boolean} [name=true] if true, contain param name.
     * @param {boolean} [desc=true] if true, contain param description.
     * @return {{typeText: string, paramName: string, paramDesc: string}} parsed value.
     *
     * @example
     * let value = '{number} param - this is number param';
     * let {typeText, paramName, paramDesc} = ParamParser.parseParamValue(value);
     *
     * let value = '{number} this is number return value';
     * let {typeText, paramDesc} = ParamParser.parseParamValue(value, true, false, true);
     *
     * let value = '{number}';
     * let {typeText} = ParamParser.parseParamValue(value, true, false, false);
     */
    value: function parseParamValue(value) {
      var type = arguments[1] === undefined ? true : arguments[1];
      var name = arguments[2] === undefined ? true : arguments[2];
      var desc = arguments[3] === undefined ? true : arguments[3];

      value = value.trim();

      var match = undefined;
      var typeText = null;
      var paramName = null;
      var paramDesc = null;

      // e.g {number}
      if (type) {
        match = value.match(/^\{(.*)\}(\s+|$)/);
        if (match) {
          typeText = match[1];
          value = value.replace(/^\{.*\}\s*/, '');
        } else {
          typeText = '*';
        }
      }

      // e.g. [p1=123]
      if (name) {
        match = value.match(/^(\S+)/);
        if (match) {
          paramName = match[1];
          value = value.replace(/^\S+\s*/, '');
        }
      }

      // e.g. this is p1 desc.
      if (desc) {
        match = value.match(/^\-?\s*((:?.|\n)*)$/m);
        if (match) {
          paramDesc = match[1];
        }
      }

      (0, _assert2['default'])(typeText || paramName || paramDesc, 'param is invalid. param = "' + value + '"');

      return { typeText: typeText, paramName: paramName, paramDesc: paramDesc };
    }
  }, {
    key: 'parseParam',

    /**
     * parse param text and build formatted result.
     * @param {string} typeText - param type text.
     * @param {string} [paramName] - param name.
     * @param {string} [paramDesc] - param description.
     * @returns {ParsedParam} formatted result.
     *
     * @example
     * let value = '{number} param - this is number param';
     * let {typeText, paramName, paramDesc} = ParamParser.parseParamValue(value);
     * let result = ParamParser.parseParam(typeText, paramName, paramDesc);
     */
    value: function parseParam() {
      var typeText = arguments[0] === undefined ? null : arguments[0];
      var paramName = arguments[1] === undefined ? null : arguments[1];
      var paramDesc = arguments[2] === undefined ? null : arguments[2];

      var result = {};

      if (typeText) {
        // check nullable
        if (typeText[0] === '?') {
          result.nullable = true;
        } else if (typeText[0] === '!') {
          result.nullable = false;
        } else {
          result.nullable = null;
        }
        typeText = typeText.replace(/^[?!]/, '');

        // check union
        if (typeText[0] === '(') {
          typeText = typeText.replace(/^[(]/, '').replace(/[)]$/, '');
          result.types = typeText.split('|');
        } else {
          result.types = [typeText];
        }

        if (typeText.indexOf('...') === 0) {
          result.spread = true;
        } else {
          result.spread = false;
        }
      }

      if (paramName) {
        // check optional
        if (paramName[0] === '[') {
          result.optional = true;
          paramName = paramName.replace(/^[\[]/, '').replace(/[\]]$/, '');
        } else {
          result.optional = false;
        }

        // check default value
        var pair = paramName.split('=');
        if (pair.length === 2) {
          result.defaultValue = pair[1];
          try {
            var raw = JSON.parse(pair[1]);
            result.defaultRaw = raw;
          } catch (e) {
            result.defaultRaw = pair[1];
          }
        }

        result.name = pair[0];
      }

      result.description = paramDesc;

      return result;
    }
  }, {
    key: 'guessParams',

    /**
     * guess param type by using param default arguments.
     * @param {Object} params - node of callable AST node.
     * @returns {ParsedParam[]} guess param results.
     *
     * @example
     * // with method
     * let results = ParamParser.guessParams(node.value.params);
     *
     * // with function
     * let results = ParamParser.guessParams(node.params);
     */
    value: function guessParams(params) {
      var _params = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = params[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var param = _step.value;

          var result = {};

          switch (param.type) {
            case 'Identifier':
              // e.g. func(a){}
              result.name = param.name;
              result.types = ['*'];
              break;

            case 'AssignmentPattern':
              if (param.left.type === 'Identifier') {
                result.name = param.left.name;
              } else if (param.left.type === 'ObjectPattern') {
                var names = [];
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                  for (var _iterator2 = param.left.properties[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var prop = _step2.value;

                    names.push(prop.key.name);
                  }
                } catch (err) {
                  _didIteratorError2 = true;
                  _iteratorError2 = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                      _iterator2['return']();
                    }
                  } finally {
                    if (_didIteratorError2) {
                      throw _iteratorError2;
                    }
                  }
                }

                result.name = '{' + names.join(',') + '}';
              }

              result.optional = true;

              if (param.right.type === 'Literal') {
                // e.g. func(a = 10){}
                result.types = param.right.value === null ? ['*'] : [typeof param.right.value];
                result.defaultRaw = param.right.value;
                result.defaultValue = '' + result.defaultRaw;
              } else if (param.right.type === 'ArrayExpression') {
                // e.g. func(a = [123]){}
                result.types = param.right.elements.length ? [typeof param.right.elements[0].value + '[]'] : ['*[]'];
                result.defaultRaw = param.right.elements.map(function (elm) {
                  return elm.value;
                });
                result.defaultValue = '' + JSON.stringify(result.defaultRaw);
              } else if (param.right.type === 'ObjectExpression') {
                // e.g. func(a = {key: 123}){}
                var obj = {};
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                  for (var _iterator3 = param.right.properties[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var prop = _step3.value;

                    obj[prop.key.name] = prop.value.value;
                  }
                } catch (err) {
                  _didIteratorError3 = true;
                  _iteratorError3 = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion3 && _iterator3['return']) {
                      _iterator3['return']();
                    }
                  } finally {
                    if (_didIteratorError3) {
                      throw _iteratorError3;
                    }
                  }
                }

                result.types = ['' + JSON.stringify(obj)];
                result.defaultRaw = obj;
                result.defaultValue = '' + JSON.stringify(result.defaultRaw);
              } else if (param.right.type === 'Identifier') {
                // e.g. func(a = value){}
                result.types = ['*'];
                result.defaultRaw = param.right.name;
                result.defaultValue = '' + param.right.name;
              } else {
                // e.g. func(a = new Foo()){}, func(a = foo()){}
                // CallExpression, NewExpression
                result.types = ['*'];
              }
              break;
            case 'RestElement':
              // e.g. func(...a){}
              result.name = '' + param.argument.name;
              result.types = ['...*'];
              result.spread = true;
              break;
            default:
              logger.w('unknown param.type', param);
          }

          _params.push(result);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return _params;
    }
  }, {
    key: 'guessReturnParam',

    /**
     * guess return type by using return node.
     * @param {ASTNode} body - callable body node.
     * @returns {ParsedParam|null}
     */
    value: function guessReturnParam(body) {
      var result = {};

      _UtilASTUtilJs2['default'].traverse(body, function (node, parent) {
        // `return` in Function is not the body's `return`
        if (node.type.includes('Function')) {
          this.skip();
          return;
        }

        if (node.type !== 'ReturnStatement') return;

        if (!node.argument) return;

        switch (node.argument.type) {
          case 'Literal':
            if (node.argument.value === null) {
              result.types = result.types || ['*'];
            } else {
              result.types = [typeof node.argument.value];
            }
            break;
          case 'TemplateLiteral':
            result.types = ['string'];
            break;
          default:
            // todo: more better guess.
            result.types = ['*'];
        }
      });

      if (result.types) {
        return result;
      }

      return null;
    }
  }, {
    key: 'guessType',

    /**
     * guess self type by using assignment node.
     * @param {ASTNode} right - assignment right node.
     * @returns {ParsedParam}
     */
    value: function guessType(right) {
      var value = right && right.type === 'Literal' ? right.value : null;

      if (value === null || value === undefined) {
        return { types: ['*'] };
      } else {
        return { types: [typeof value] };
      }
    }
  }]);

  return ParamParser;
})();

exports['default'] = ParamParser;
module.exports = exports['default'];