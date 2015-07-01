'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _ParserParamParserJs = require('../Parser/ParamParser.js');

var _ParserParamParserJs2 = _interopRequireDefault(_ParserParamParserJs);

var _UtilASTUtilJs = require('../Util/ASTUtil.js');

var _UtilASTUtilJs2 = _interopRequireDefault(_UtilASTUtilJs);

/**
 * Abstract Doc Class.
 * @todo rename this class name.
 */

var AbstractDoc = (function () {
  /**
   * create instance.
   * @param {AST} ast - this is AST that contains this doc.
   * @param {ASTNode} node - this is self node.
   * @param {PathResolver} pathResolver - this is file path resolver that contains this doc.
   * @param {Tag[]} commentTags - this is tags that self node has.
   */

  function AbstractDoc(ast, node, pathResolver) {
    var commentTags = arguments[3] === undefined ? [] : arguments[3];

    _classCallCheck(this, AbstractDoc);

    this._ast = ast;
    this._node = node;
    this._pathResolver = pathResolver;
    this._commentTags = commentTags;
    this._value = {};

    this._apply();
  }

  _createClass(AbstractDoc, [{
    key: '_apply',

    /**
     * apply doc comment.
     * @private
     */
    value: function _apply() {
      this['@kind']();
      this['@static']();
      this['@variation']();
      this['@name']();
      this['@memberof']();
      this['@longname']();
      this['@access']();
      this['@export']();
      this['@importPath']();
      this['@importStyle']();
      this['@desc']();
      this['@example']();
      this['@see']();
      this['@lineNumber']();
      this['@deprecated']();
      this['@experimental']();
      this['@since']();
      this['@version']();
      this['@todo']();
      this['@ignore']();
      this['@undocument']();
      this['@unknown']();

      this['@param']();
      this['@property']();
      this['@return']();
      this['@type']();
      this['@abstract']();
      this['@override']();
      this['@throws']();
      this['@emits']();
      this['@listens']();
      this['@member']();
      this['@content']();
      this['@generator']();
    }
  }, {
    key: '@kind',

    /** for @kind, does not need to use this tag */
    value: function kind() {
      this._value.kind = this._findTagValue(['@kind']);
    }
  }, {
    key: '@static',

    /** for @static, does not need to use this tag */
    value: function _static() {
      var tag = this._find(['@static']);
      if (tag) {
        if (tag.tagValue === '' || tag.tagValue === 'true') {
          this._value['static'] = true;
        } else {
          this._value['static'] = false;
        }
      } else {
        if ('static' in this._node) {
          this._value['static'] = this._node['static'];
        } else {
          this._value['static'] = true;
        }
      }
    }
  }, {
    key: '@variation',

    /** for @variation */
    value: function variation() {
      this._value.variation = this._findTagValue(['@variation']);
    }
  }, {
    key: '@name',

    /** for @name, does not need to use this tag */
    value: function name() {
      this._value.name = this._findTagValue(['@name']);
    }
  }, {
    key: '@memberof',

    /** for @memberof, does not need to use this tag */
    value: function memberof() {
      this._value.memberof = this._findTagValue(['@memberof']);
    }
  }, {
    key: '@longname',

    /** for @longname, does not need to use this tag */
    value: function longname() {
      var tag = this._find(['@longname']);
      if (tag) {
        this._value.longname = tag.tagValue;
      } else {
        var memberof = this._value.memberof;
        var _name = this._value.name;
        var scope = this._value['static'] ? '.' : '#';
        if (memberof.includes('~')) {
          this._value.longname = '' + memberof + scope + _name;
        } else {
          this._value.longname = memberof + '~' + _name;
        }
      }
    }
  }, {
    key: '@access',

    /** for @access, @public, @private, @protected */
    value: function access() {
      var tag = this._find(['@access', '@public', '@private', '@protected']);
      if (tag) {
        var access = undefined;
        switch (tag.tagName) {
          case '@access':
            access = tag.tagValue;break;
          case '@public':
            access = 'public';break;
          case '@protected':
            access = 'protected';break;
          case '@private':
            access = 'private';break;
        }

        this._value.access = access;
      } else {
        this._value.access = null;
      }
    }
  }, {
    key: '@public',

    /** for @public */
    value: function _public() {}
  }, {
    key: '@protected',

    /** for @protected */
    value: function _protected() {}
  }, {
    key: '@private',

    /** for @private */
    value: function _private() {}
  }, {
    key: '@export',

    /** for @export, does not need to use this tag */
    value: function _export() {
      var tag = this._find(['@export']);
      if (tag) {
        if (tag.tagValue === '' || tag.tagValue === 'true') {
          this._value['export'] = true;
        } else {
          this._value['export'] = false;
        }
        return;
      }

      var parent = this._node.parent;
      while (parent) {
        if (parent.type === 'ExportDefaultDeclaration') {
          this._value['export'] = true;
          return;
        } else if (parent.type === 'ExportNamedDeclaration') {
          this._value['export'] = true;
          return;
        }

        parent = parent.parent;
      }

      this._value['export'] = false;
    }
  }, {
    key: '@importPath',

    /** for @importPath, does not need to use this tag */
    value: function importPath() {
      var tag = this._find(['@importPath']);
      if (tag) {
        this._value.importPath = tag.tagValue;
      } else {
        this._value.importPath = this._pathResolver.importPath;
      }
    }
  }, {
    key: '@importStyle',

    /** for @importStyle, does not need to use this tag */
    value: function importStyle() {
      var tag = this._find(['@importStyle']);
      if (tag) {
        this._value.importStyle = tag.tagValue;
        return;
      }

      var parent = this._node.parent;
      var name = this._value.name;
      while (parent) {
        if (parent.type === 'ExportDefaultDeclaration') {
          this._value.importStyle = name;
          return;
        } else if (parent.type === 'ExportNamedDeclaration') {
          this._value.importStyle = '{' + name + '}';
          return;
        }
        parent = parent.parent;
      }

      this._value.importStyle = null;
    }
  }, {
    key: '@desc',

    /** for @desc */
    value: function desc() {
      this._value.description = this._findTagValue(['@desc']);
    }
  }, {
    key: '@example',

    /** for @example. possible multi tag. */
    value: function example() {
      var tags = this._findAll(['@example']);
      if (!tags) return;
      if (!tags.length) return;

      this._value.examples = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = tags[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var tag = _step.value;

          this._value.examples.push(tag.tagValue);
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
    }
  }, {
    key: '@see',

    /** for @see. possible multi tag. */
    value: function see() {
      var tags = this._findAll(['@see']);
      if (!tags) return;
      if (!tags.length) return;

      this._value.see = [];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = tags[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var tag = _step2.value;

          this._value.see.push(tag.tagValue);
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
    }
  }, {
    key: '@lineNumber',

    /** for @lineNumber, does not need to use this tag */
    value: function lineNumber() {
      var tag = this._find(['@lineNumber']);
      if (tag) {
        this._value.lineNumber = tag.tagValue;
        return;
      }

      var node = this._node;
      if (node.loc) {
        this._value.lineNumber = node.loc.start.line;
      }
    }
  }, {
    key: '@deprecated',

    /** for @deprecated */
    value: function deprecated() {
      var tag = this._find(['@deprecated']);
      if (tag) {
        if (tag.tagValue) {
          this._value.deprecated = tag.tagValue;
        } else {
          this._value.deprecated = true;
        }
      }
    }
  }, {
    key: '@experimental',

    /** for @experimental */
    value: function experimental() {
      var tag = this._find(['@experimental']);
      if (tag) {
        if (tag.tagValue) {
          this._value.experimental = tag.tagValue;
        } else {
          this._value.experimental = true;
        }
      }
    }
  }, {
    key: '@since',

    /** for @since */
    value: function since() {
      var tag = this._find(['@since']);
      if (tag) {
        this._value.since = tag.tagValue;
      }
    }
  }, {
    key: '@version',

    /** for @version */
    value: function version() {
      var tag = this._find(['@version']);
      if (tag) {
        this._value.version = tag.tagValue;
      }
    }
  }, {
    key: '@todo',

    /** for @todo. possible multi tag. */
    value: function todo() {
      var tags = this._findAll(['@todo']);
      if (tags) {
        this._value.todo = [];
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = tags[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var tag = _step3.value;

            this._value.todo.push(tag.tagValue);
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
      }
    }
  }, {
    key: '@ignore',

    /** for @ignore. */
    value: function ignore() {
      var tag = this._find(['@ignore']);
      if (tag) {
        this._value.ignore = true;
      }
    }
  }, {
    key: '@undocument',

    /** for @undocument, does not need to use this tag */
    value: function undocument() {
      var tag = this._find(['@undocument']);
      if (tag) {
        this._value.undocument = true;
      }
    }
  }, {
    key: '@unknown',

    /** for @unknown, does not need to use this tag */
    value: function unknown() {
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this._commentTags[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var tag = _step4.value;

          if (this[tag.tagName]) continue;

          if (!this._value.unknown) this._value.unknown = [];
          this._value.unknown.push(tag);
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4['return']) {
            _iterator4['return']();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    }
  }, {
    key: '@param',

    /** for @param. */
    value: function param() {
      var values = this._findAllTagValues(['@param']);
      if (!values) return;

      this._value.params = [];
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = values[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var value = _step5.value;

          var _ParamParser$parseParamValue = _ParserParamParserJs2['default'].parseParamValue(value);

          var typeText = _ParamParser$parseParamValue.typeText;
          var paramName = _ParamParser$parseParamValue.paramName;
          var paramDesc = _ParamParser$parseParamValue.paramDesc;

          var result = _ParserParamParserJs2['default'].parseParam(typeText, paramName, paramDesc);
          this._value.params.push(result);
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5['return']) {
            _iterator5['return']();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }
    }
  }, {
    key: '@return',

    /** for @return, @returns. */
    value: function _return() {
      var value = this._findTagValue(['@return', '@returns']);
      if (!value) return;

      var _ParamParser$parseParamValue2 = _ParserParamParserJs2['default'].parseParamValue(value, true, false, true);

      var typeText = _ParamParser$parseParamValue2.typeText;
      var paramName = _ParamParser$parseParamValue2.paramName;
      var paramDesc = _ParamParser$parseParamValue2.paramDesc;

      var result = _ParserParamParserJs2['default'].parseParam(typeText, paramName, paramDesc);
      this._value['return'] = result;
    }
  }, {
    key: '@property',

    /** for @property. */
    value: function property() {
      var values = this._findAllTagValues(['@property']);
      if (!values) return;

      this._value.properties = [];
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = values[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var value = _step6.value;

          var _ParamParser$parseParamValue3 = _ParserParamParserJs2['default'].parseParamValue(value);

          var typeText = _ParamParser$parseParamValue3.typeText;
          var paramName = _ParamParser$parseParamValue3.paramName;
          var paramDesc = _ParamParser$parseParamValue3.paramDesc;

          var result = _ParserParamParserJs2['default'].parseParam(typeText, paramName, paramDesc);
          this._value.properties.push(result);
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6['return']) {
            _iterator6['return']();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }
    }
  }, {
    key: '@type',

    /** for @type. */
    value: function type() {
      var value = this._findTagValue(['@type']);
      if (!value) return;

      var _ParamParser$parseParamValue4 = _ParserParamParserJs2['default'].parseParamValue(value, true, false, false);

      var typeText = _ParamParser$parseParamValue4.typeText;
      var paramName = _ParamParser$parseParamValue4.paramName;
      var paramDesc = _ParamParser$parseParamValue4.paramDesc;

      var result = _ParserParamParserJs2['default'].parseParam(typeText, paramName, paramDesc);
      this._value.type = result;
    }
  }, {
    key: '@abstract',

    /** for @abstract. */
    value: function abstract() {
      var tag = this._find(['@abstract']);
      if (tag) {
        this._value.abstract = true;
      }
    }
  }, {
    key: '@override',

    /** for @voerride. */
    value: function override() {
      var tag = this._find(['@override']);
      if (tag) {
        this._value.override = true;
      }
    }
  }, {
    key: '@throws',

    /** for @throws. */
    value: function throws() {
      var values = this._findAllTagValues(['@throws']);
      if (!values) return;

      this._value.throws = [];
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = values[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var value = _step7.value;

          var _ParamParser$parseParamValue5 = _ParserParamParserJs2['default'].parseParamValue(value, true, false, true);

          var typeText = _ParamParser$parseParamValue5.typeText;
          var paramName = _ParamParser$parseParamValue5.paramName;
          var paramDesc = _ParamParser$parseParamValue5.paramDesc;

          var result = _ParserParamParserJs2['default'].parseParam(typeText, paramName, paramDesc);
          this._value.throws.push({
            types: result.types,
            description: result.description
          });
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7['return']) {
            _iterator7['return']();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }
    }
  }, {
    key: '@emits',

    /** for @emits. */
    value: function emits() {
      var values = this._findAllTagValues(['@emits']);
      if (!values) return;

      this._value.emits = [];
      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = values[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var value = _step8.value;

          var _ParamParser$parseParamValue6 = _ParserParamParserJs2['default'].parseParamValue(value, true, false, true);

          var typeText = _ParamParser$parseParamValue6.typeText;
          var paramName = _ParamParser$parseParamValue6.paramName;
          var paramDesc = _ParamParser$parseParamValue6.paramDesc;

          var result = _ParserParamParserJs2['default'].parseParam(typeText, paramName, paramDesc);
          this._value.emits.push({
            types: result.types,
            description: result.description
          });
        }
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8['return']) {
            _iterator8['return']();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }
    }
  }, {
    key: '@listens',

    /** for @listens. */
    value: function listens() {
      var values = this._findAllTagValues(['@listens']);
      if (!values) return;

      this._value.listens = [];
      var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        for (var _iterator9 = values[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
          var value = _step9.value;

          var _ParamParser$parseParamValue7 = _ParserParamParserJs2['default'].parseParamValue(value, true, false, true);

          var typeText = _ParamParser$parseParamValue7.typeText;
          var paramName = _ParamParser$parseParamValue7.paramName;
          var paramDesc = _ParamParser$parseParamValue7.paramDesc;

          var result = _ParserParamParserJs2['default'].parseParam(typeText, paramName, paramDesc);
          this._value.listens.push({
            types: result.types,
            description: result.description
          });
        }
      } catch (err) {
        _didIteratorError9 = true;
        _iteratorError9 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion9 && _iterator9['return']) {
            _iterator9['return']();
          }
        } finally {
          if (_didIteratorError9) {
            throw _iteratorError9;
          }
        }
      }
    }
  }, {
    key: '@member',

    /** for @member. */
    value: function member() {
      var value = this._findTagValue(['@member']);
      if (!value) return;

      var _ParamParser$parseParamValue8 = _ParserParamParserJs2['default'].parseParamValue(value, true, true, false);

      var typeText = _ParamParser$parseParamValue8.typeText;
      var paramName = _ParamParser$parseParamValue8.paramName;
      var paramDesc = _ParamParser$parseParamValue8.paramDesc;

      var result = _ParserParamParserJs2['default'].parseParam(typeText, paramName, paramDesc);
      this._value.type = result;
    }
  }, {
    key: '@content',

    /** for @content, does not need to use this tag */
    value: function content() {
      var value = this._findTagValue(['@content']);
      if (value) {
        this._value.content = value;
      }
    }
  }, {
    key: '@generator',

    /** for @generator, does not need to use this tag */
    value: function generator() {
      var tag = this._find(['@generator']);
      if (tag) {
        this._value.generator = true;
      }
    }
  }, {
    key: '_findAll',

    /**
     * find all tags.
     * @param {string[]} names - tag names.
     * @returns {Tag[]|null} found tags.
     * @private
     */
    value: function _findAll(names) {
      var results = [];
      var _iteratorNormalCompletion10 = true;
      var _didIteratorError10 = false;
      var _iteratorError10 = undefined;

      try {
        for (var _iterator10 = this._commentTags[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
          var tag = _step10.value;

          if (names.includes(tag.tagName)) results.push(tag);
        }
      } catch (err) {
        _didIteratorError10 = true;
        _iteratorError10 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion10 && _iterator10['return']) {
            _iterator10['return']();
          }
        } finally {
          if (_didIteratorError10) {
            throw _iteratorError10;
          }
        }
      }

      if (results.length) {
        return results;
      } else {
        return null;
      }
    }
  }, {
    key: '_find',

    /**
     * find last tag.
     * @param {string[]} names - tag names.
     * @returns {Tag|null} found tag.
     * @private
     */
    value: function _find(names) {
      var results = this._findAll(names);
      if (results && results.length) {
        return results[results.length - 1];
      } else {
        return null;
      }
    }
  }, {
    key: '_findAllTagValues',

    /**
     * find all tag values.
     * @param {string[]} names - tag names.
     * @returns {*[]|null} found values.
     * @private
     */
    value: function _findAllTagValues(names) {
      var tags = this._findAll(names);
      if (!tags) return null;

      var results = [];
      var _iteratorNormalCompletion11 = true;
      var _didIteratorError11 = false;
      var _iteratorError11 = undefined;

      try {
        for (var _iterator11 = tags[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
          var tag = _step11.value;

          results.push(tag.tagValue);
        }
      } catch (err) {
        _didIteratorError11 = true;
        _iteratorError11 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion11 && _iterator11['return']) {
            _iterator11['return']();
          }
        } finally {
          if (_didIteratorError11) {
            throw _iteratorError11;
          }
        }
      }

      return results;
    }
  }, {
    key: '_findTagValue',

    /**
     * find ta value.
     * @param {string[]} names - tag names.
     * @returns {*|null} found value.
     * @private
     */
    value: function _findTagValue(names) {
      var tag = this._find(names);
      if (tag) {
        return tag.tagValue;
      } else {
        return null;
      }
    }
  }, {
    key: '_resolveLongname',

    /**
     * resolve long name.
     * if the name relates import path, consider import path.
     * @param {string} name - identifier name.
     * @returns {string} resolved name.
     * @private
     */
    value: function _resolveLongname(name) {
      var importPath = _UtilASTUtilJs2['default'].findPathInImportDeclaration(this._ast, name);
      if (!importPath) return name;

      if (importPath.charAt(0) === '.' || importPath.charAt(0) === '/') {
        var resolvedPath = this._pathResolver.resolve(importPath);
        var longname = resolvedPath + '~' + name;
        return longname;
      } else {
        var longname = importPath + '~' + name;
        return longname;
      }
    }
  }, {
    key: '_flattenMemberExpression',

    /**
     * flatten member expression property name.
     * if node structure is [foo [bar [baz [this] ] ] ], flatten is ``this.baz.bar.foo``
     * @param {ASTNode} node - target member expression node.
     * @returns {string} flatten property.
     * @private
     */
    value: function _flattenMemberExpression(node) {
      var results = [];
      var target = node;

      while (target) {
        if (target.type === 'ThisExpression') {
          results.push('this');
          break;
        } else if (target.type === 'Identifier') {
          results.push(target.name);
          break;
        } else {
          results.push(target.property.name);
          target = target.object;
        }
      }

      return results.reverse().join('.');
    }
  }, {
    key: 'value',

    /** @type {DocObject[]} */
    get: function get() {
      return JSON.parse(JSON.stringify(this._value));
    }
  }]);

  return AbstractDoc;
})();

exports['default'] = AbstractDoc;
module.exports = exports['default'];

// avoid unknown tag.

// avoid unknown tag.

// avoid unknown tag.