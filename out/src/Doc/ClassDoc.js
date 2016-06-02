'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _AbstractDoc2 = require('./AbstractDoc.js');

var _AbstractDoc3 = _interopRequireDefault(_AbstractDoc2);

var _ParamParser = require('../Parser/ParamParser.js');

var _ParamParser2 = _interopRequireDefault(_ParamParser);

var _NamingUtil = require('../Util/NamingUtil.js');

var _NamingUtil2 = _interopRequireDefault(_NamingUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Doc Class from Class Declaration AST node.
 */

var ClassDoc = function (_AbstractDoc) {
  _inherits(ClassDoc, _AbstractDoc);

  function ClassDoc() {
    _classCallCheck(this, ClassDoc);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ClassDoc).apply(this, arguments));
  }

  _createClass(ClassDoc, [{
    key: '_apply',

    /**
     * apply own tag.
     * @private
     */
    value: function _apply() {
      _get(Object.getPrototypeOf(ClassDoc.prototype), '_apply', this).call(this);

      this['@interface']();
      this['@extends']();
      this['@implements']();
    }

    /** specify ``class`` to kind. */

  }, {
    key: '@_kind',
    value: function _kind() {
      _get(Object.getPrototypeOf(ClassDoc.prototype), '@_kind', this).call(this);
      if (this._value.kind) return;
      this._value.kind = 'class';
    }

    /** take out self name from self node */

  }, {
    key: '@_name',
    value: function _name() {
      _get(Object.getPrototypeOf(ClassDoc.prototype), '@_name', this).call(this);
      if (this._value.name) return;

      if (this._node.id) {
        this._value.name = this._node.id.name;
      } else {
        this._value.name = _NamingUtil2.default.filePathToName(this._pathResolver.filePath);
      }
    }

    /** take out self memberof from file path. */

  }, {
    key: '@_memberof',
    value: function _memberof() {
      _get(Object.getPrototypeOf(ClassDoc.prototype), '@_memberof', this).call(this);
      if (this._value.memberof) return;
      this._value.memberof = this._pathResolver.filePath;
    }

    /** for @interface */

  }, {
    key: '@interface',
    value: function _interface() {
      var tag = this._find(['@interface']);
      if (tag) {
        this._value.interface = ['', 'true', true].includes(tag.tagValue);
      } else {
        this._value.interface = false;
      }
    }

    /** for @extends, does not need to use this tag. */

  }, {
    key: '@extends',
    value: function _extends() {
      var values = this._findAllTagValues(['@extends', '@extend']);
      if (values) {
        this._value.extends = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var value = _step.value;

            var _ParamParser$parsePar = _ParamParser2.default.parseParamValue(value, true, false, false);

            var typeText = _ParamParser$parsePar.typeText;

            this._value.extends.push(typeText);
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

        return;
      }

      if (this._node.superClass) {
        var node = this._node;
        var longnames = [];
        var targets = [];

        if (node.superClass.type === 'CallExpression') {
          targets.push.apply(targets, [node.superClass.callee].concat(_toConsumableArray(node.superClass.arguments)));
        } else {
          targets.push(node.superClass);
        }

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = targets[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var target = _step2.value;

            switch (target.type) {
              case 'Identifier':
                longnames.push(this._resolveLongname(target.name));
                break;
              case 'MemberExpression':
                var fullIdentifier = this._flattenMemberExpression(target);
                var rootIdentifier = fullIdentifier.split('.')[0];
                var rootLongname = this._resolveLongname(rootIdentifier);
                var filePath = rootLongname.replace(/~.*/, '');
                longnames.push(filePath + '~' + fullIdentifier);
                break;
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

        if (node.superClass.type === 'CallExpression') {
          // expression extends may have non-class, so filter only class by name rule.
          longnames = longnames.filter(function (v) {
            return v.match(/^[A-Z]|^[$_][A-Z]/);
          });

          var filePath = this._pathResolver.fileFullPath;
          var line = node.superClass.loc.start.line;
          var start = node.superClass.loc.start.column;
          var end = node.superClass.loc.end.column;
          this._value.expressionExtends = this._readSelection(filePath, line, start, end);
        }

        if (longnames.length) this._value.extends = longnames;
      }
    }

    /** for @implements */

  }, {
    key: '@implements',
    value: function _implements() {
      var values = this._findAllTagValues(['@implements', '@implement']);
      if (!values) return;

      this._value.implements = [];
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = values[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var value = _step3.value;

          var _ParamParser$parsePar2 = _ParamParser2.default.parseParamValue(value, true, false, false);

          var typeText = _ParamParser$parsePar2.typeText;

          this._value.implements.push(typeText);
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
    }

    /**
     * read selection text in file.
     * @param {string} filePath - target file full path.
     * @param {number} line - line number (one origin).
     * @param {number} startColumn - start column number (one origin).
     * @param {number} endColumn - end column number (one origin).
     * @returns {string} selection text
     * @private
     */

  }, {
    key: '_readSelection',
    value: function _readSelection(filePath, line, startColumn, endColumn) {
      var code = _fsExtra2.default.readFileSync(filePath).toString();
      var lines = code.split('\n');
      var selectionLine = lines[line - 1];
      var tmp = [];
      for (var i = startColumn; i < endColumn; i++) {
        tmp.push(selectionLine.charAt(i));
      }
      return tmp.join('');
    }
  }]);

  return ClassDoc;
}(_AbstractDoc3.default);

exports.default = ClassDoc;