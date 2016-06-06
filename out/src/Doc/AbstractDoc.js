'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _ParamParser = require('../Parser/ParamParser.js');

var _ParamParser2 = _interopRequireDefault(_ParamParser);

var _ASTUtil = require('../Util/ASTUtil.js');

var _ASTUtil2 = _interopRequireDefault(_ASTUtil);

var _InvalidCodeLogger = require('../Util/InvalidCodeLogger.js');

var _InvalidCodeLogger2 = _interopRequireDefault(_InvalidCodeLogger);

var _ASTNodeContainer = require('../Util/ASTNodeContainer.js');

var _ASTNodeContainer2 = _interopRequireDefault(_ASTNodeContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Abstract Doc Class.
 * @todo rename this class name.
 */

var AbstractDoc = function () {
  /**
   * create instance.
   * @param {AST} ast - this is AST that contains this doc.
   * @param {ASTNode} node - this is self node.
   * @param {PathResolver} pathResolver - this is file path resolver that contains this doc.
   * @param {Tag[]} commentTags - this is tags that self node has.
   */

  function AbstractDoc(ast, node, pathResolver) {
    var commentTags = arguments.length <= 3 || arguments[3] === undefined ? [] : arguments[3];

    _classCallCheck(this, AbstractDoc);

    this._ast = ast;
    this._node = node;
    this._pathResolver = pathResolver;
    this._commentTags = commentTags;
    this._value = {};

    Object.defineProperty(this._node, 'doc', { value: this });

    this._value.__docId__ = _ASTNodeContainer2.default.addNode(node);

    this._apply();
  }

  /** @type {DocObject[]} */


  _createClass(AbstractDoc, [{
    key: '_apply',


    /**
     * apply doc comment.
     * @private
     */
    value: function _apply() {
      this['@_kind']();
      this['@_static']();
      this['@_variation']();
      this['@_name']();
      this['@_memberof']();
      this['@_longname']();
      this['@access']();
      this['@_export']();
      this['@_importPath']();
      this['@_importStyle']();
      this['@desc']();
      this['@example']();
      this['@see']();
      this['@_lineNumber']();
      this['@deprecated']();
      this['@experimental']();
      this['@since']();
      this['@version']();
      this['@todo']();
      this['@ignore']();
      this['@_pseudoExport']();
      this['@_undocument']();
      this['@_unknown']();

      this['@param']();
      this['@property']();
      this['@return']();
      this['@type']();
      this['@abstract']();
      this['@override']();
      this['@throws']();
      this['@emits']();
      this['@listens']();
      this['@_member']();
      this['@_content']();
      this['@_generator']();
    }

    /** for @_kind, does not need to use this tag */

  }, {
    key: '@_kind',
    value: function _kind() {
      this._value.kind = this._findTagValue(['@_kind']);
    }

    /** for @_static, does not need to use this tag */

  }, {
    key: '@_static',
    value: function _static() {
      var tag = this._find(['@_static']);
      if (tag) {
        if (tag.tagValue === '' || tag.tagValue === 'true') {
          this._value.static = true;
        } else {
          this._value.static = false;
        }
      } else {
        if ('static' in this._node) {
          this._value.static = this._node.static;
        } else {
          this._value.static = true;
        }
      }
    }

    /** for @_variation */

  }, {
    key: '@_variation',
    value: function _variation() {
      this._value.variation = this._findTagValue(['@_variation']);
    }

    /** for @_name, does not need to use this tag */

  }, {
    key: '@_name',
    value: function _name() {
      this._value.name = this._findTagValue(['@_name']);
    }

    /** for @_memberof, does not need to use this tag */

  }, {
    key: '@_memberof',
    value: function _memberof() {
      this._value.memberof = this._findTagValue(['@_memberof']);
    }

    /** for @_longname, does not need to use this tag */

  }, {
    key: '@_longname',
    value: function _longname() {
      var tag = this._find(['@_longname']);
      if (tag) {
        this._value.longname = tag.tagValue;
      } else {
        var memberof = this._value.memberof;
        var name = this._value.name;
        var scope = this._value.static ? '.' : '#';
        if (memberof.includes('~')) {
          this._value.longname = '' + memberof + scope + name;
        } else {
          this._value.longname = memberof + '~' + name;
        }
      }
    }

    /** for @access, @public, @private, @protected */

  }, {
    key: '@access',
    value: function access() {
      var tag = this._find(['@access', '@public', '@private', '@protected']);
      if (tag) {
        var access = void 0;
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

    /** for @public */

  }, {
    key: '@public',
    value: function _public() {}
    // avoid unknown tag.


    /** for @protected */

  }, {
    key: '@protected',
    value: function _protected() {}
    // avoid unknown tag.


    /** for @private */

  }, {
    key: '@private',
    value: function _private() {}
    // avoid unknown tag.


    /** for @_export, does not need to use this tag */

  }, {
    key: '@_export',
    value: function _export() {
      var tag = this._find(['@_export']);
      if (tag) {
        if (tag.tagValue === '' || tag.tagValue === 'true') {
          this._value.export = true;
        } else {
          this._value.export = false;
        }
        return;
      }

      var parent = this._node.parent;
      while (parent) {
        if (parent.type === 'ExportDefaultDeclaration') {
          this._value.export = true;
          return;
        } else if (parent.type === 'ExportNamedDeclaration') {
          this._value.export = true;
          return;
        }

        parent = parent.parent;
      }

      this._value.export = false;
    }

    /** for @_importPath, does not need to use this tag */

  }, {
    key: '@_importPath',
    value: function _importPath() {
      var tag = this._find(['@_importPath']);
      if (tag) {
        this._value.importPath = tag.tagValue;
      } else {
        this._value.importPath = this._pathResolver.importPath;
      }
    }

    /** for @_importStyle, does not need to use this tag */

  }, {
    key: '@_importStyle',
    value: function _importStyle() {
      var tag = this._find(['@_importStyle']);
      if (tag) {
        this._value.importStyle = tag.tagValue;
        return;
      }

      if (this._node.__esdoc__pseudo_export) {
        this._value.importStyle = null;
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

    /** for @desc */

  }, {
    key: '@desc',
    value: function desc() {
      this._value.description = this._findTagValue(['@desc']);
    }

    /** for @example. possible multi tag. */

  }, {
    key: '@example',
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

    /** for @see. possible multi tag. */

  }, {
    key: '@see',
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
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }

    /** for @_lineNumber, does not need to use this tag */

  }, {
    key: "@_lineNumber",
    value: function _lineNumber() {
      var tag = this._find(['@_lineNumber']);
      if (tag) {
        this._value.lineNumber = tag.tagValue;
        return;
      }

      var node = this._node;
      if (node.loc) {
        this._value.lineNumber = node.loc.start.line;
      }
    }

    /** for @deprecated */

  }, {
    key: '@deprecated',
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

    /** for @experimental */

  }, {
    key: '@experimental',
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

    /** for @since */

  }, {
    key: '@since',
    value: function since() {
      var tag = this._find(['@since']);
      if (tag) {
        this._value.since = tag.tagValue;
      }
    }

    /** for @version */

  }, {
    key: '@version',
    value: function version() {
      var tag = this._find(['@version']);
      if (tag) {
        this._value.version = tag.tagValue;
      }
    }

    /** for @todo. possible multi tag. */

  }, {
    key: '@todo',
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
    }

    /** for @ignore. */

  }, {
    key: '@ignore',
    value: function ignore() {
      var tag = this._find(['@ignore']);
      if (tag) {
        this._value.ignore = true;
      }
    }

    /** for @_pseudoExport, does not need to use this tag. */

  }, {
    key: '@_pseudoExport',
    value: function _pseudoExport() {
      var tag = this._find(['@_pseudoExport']);
      if (tag) {
        this._value.pseudoExport = ['', 'true', true].includes(tag.tagValue);
        return;
      }

      if (this._node.__esdoc__pseudo_export) {
        this._value.pseudoExport = true;
      }
    }

    /** for @_undocument, does not need to use this tag */

  }, {
    key: '@_undocument',
    value: function _undocument() {
      var tag = this._find(['@_undocument']);
      if (tag) {
        this._value.undocument = true;
      }
    }

    /** for @_unknown, does not need to use this tag */

  }, {
    key: '@_unknown',
    value: function _unknown() {
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
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    }

    /** for @param. */

  }, {
    key: '@param',
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

          var _ParamParser$parsePar = _ParamParser2.default.parseParamValue(value);

          var typeText = _ParamParser$parsePar.typeText;
          var paramName = _ParamParser$parsePar.paramName;
          var paramDesc = _ParamParser$parsePar.paramDesc;

          if (!typeText || !paramName) {
            _InvalidCodeLogger2.default.show(this._pathResolver.fileFullPath, this._node);
            continue;
          }
          var result = _ParamParser2.default.parseParam(typeText, paramName, paramDesc);
          this._value.params.push(result);
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
    }

    /** for @return, @returns. */

  }, {
    key: '@return',
    value: function _return() {
      var value = this._findTagValue(['@return', '@returns']);
      if (!value) return;

      var _ParamParser$parsePar2 = _ParamParser2.default.parseParamValue(value, true, false, true);

      var typeText = _ParamParser$parsePar2.typeText;
      var paramName = _ParamParser$parsePar2.paramName;
      var paramDesc = _ParamParser$parsePar2.paramDesc;

      var result = _ParamParser2.default.parseParam(typeText, paramName, paramDesc);
      this._value.return = result;
    }

    /** for @property. */

  }, {
    key: '@property',
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

          var _ParamParser$parsePar3 = _ParamParser2.default.parseParamValue(value);

          var typeText = _ParamParser$parsePar3.typeText;
          var paramName = _ParamParser$parsePar3.paramName;
          var paramDesc = _ParamParser$parsePar3.paramDesc;

          var result = _ParamParser2.default.parseParam(typeText, paramName, paramDesc);
          this._value.properties.push(result);
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
    }

    /** for @type. */

  }, {
    key: '@type',
    value: function type() {
      var value = this._findTagValue(['@type']);
      if (!value) return;

      var _ParamParser$parsePar4 = _ParamParser2.default.parseParamValue(value, true, false, false);

      var typeText = _ParamParser$parsePar4.typeText;
      var paramName = _ParamParser$parsePar4.paramName;
      var paramDesc = _ParamParser$parsePar4.paramDesc;

      var result = _ParamParser2.default.parseParam(typeText, paramName, paramDesc);
      this._value.type = result;
    }

    /** for @abstract. */

  }, {
    key: '@abstract',
    value: function abstract() {
      var tag = this._find(['@abstract']);
      if (tag) {
        this._value.abstract = true;
      }
    }

    /** for @voerride. */

  }, {
    key: '@override',
    value: function override() {
      var tag = this._find(['@override']);
      if (tag) {
        this._value.override = true;
      }
    }

    /** for @throws. */

  }, {
    key: '@throws',
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

          var _ParamParser$parsePar5 = _ParamParser2.default.parseParamValue(value, true, false, true);

          var typeText = _ParamParser$parsePar5.typeText;
          var paramName = _ParamParser$parsePar5.paramName;
          var paramDesc = _ParamParser$parsePar5.paramDesc;

          var result = _ParamParser2.default.parseParam(typeText, paramName, paramDesc);
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

    /** for @emits. */

  }, {
    key: '@emits',
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

          var _ParamParser$parsePar6 = _ParamParser2.default.parseParamValue(value, true, false, true);

          var typeText = _ParamParser$parsePar6.typeText;
          var paramName = _ParamParser$parsePar6.paramName;
          var paramDesc = _ParamParser$parsePar6.paramDesc;

          var result = _ParamParser2.default.parseParam(typeText, paramName, paramDesc);
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
          if (!_iteratorNormalCompletion8 && _iterator8.return) {
            _iterator8.return();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }
    }

    /** for @listens. */

  }, {
    key: '@listens',
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

          var _ParamParser$parsePar7 = _ParamParser2.default.parseParamValue(value, true, false, true);

          var typeText = _ParamParser$parsePar7.typeText;
          var paramName = _ParamParser$parsePar7.paramName;
          var paramDesc = _ParamParser$parsePar7.paramDesc;

          var result = _ParamParser2.default.parseParam(typeText, paramName, paramDesc);
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

    /** for @_member. */

  }, {
    key: '@_member',
    value: function _member() {
      var value = this._findTagValue(['@_member']);
      if (!value) return;

      var _ParamParser$parsePar8 = _ParamParser2.default.parseParamValue(value, true, true, false);

      var typeText = _ParamParser$parsePar8.typeText;
      var paramName = _ParamParser$parsePar8.paramName;
      var paramDesc = _ParamParser$parsePar8.paramDesc;

      var result = _ParamParser2.default.parseParam(typeText, paramName, paramDesc);
      this._value.type = result;
    }

    /** for @_content, does not need to use this tag */

  }, {
    key: '@_content',
    value: function _content() {
      var value = this._findTagValue(['@_content']);
      if (value) {
        this._value.content = value;
      }
    }

    /** for @_generator, does not need to use this tag */

  }, {
    key: '@_generator',
    value: function _generator() {
      var tag = this._find(['@_generator']);
      if (tag) {
        this._value.generator = true;
      }
    }

    /**
     * find all tags.
     * @param {string[]} names - tag names.
     * @returns {Tag[]|null} found tags.
     * @private
     */

  }, {
    key: '_findAll',
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
          if (!_iteratorNormalCompletion10 && _iterator10.return) {
            _iterator10.return();
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

    /**
     * find last tag.
     * @param {string[]} names - tag names.
     * @returns {Tag|null} found tag.
     * @private
     */

  }, {
    key: '_find',
    value: function _find(names) {
      var results = this._findAll(names);
      if (results && results.length) {
        return results[results.length - 1];
      } else {
        return null;
      }
    }

    /**
     * find all tag values.
     * @param {string[]} names - tag names.
     * @returns {*[]|null} found values.
     * @private
     */

  }, {
    key: '_findAllTagValues',
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
          if (!_iteratorNormalCompletion11 && _iterator11.return) {
            _iterator11.return();
          }
        } finally {
          if (_didIteratorError11) {
            throw _iteratorError11;
          }
        }
      }

      return results;
    }

    /**
     * find ta value.
     * @param {string[]} names - tag names.
     * @returns {*|null} found value.
     * @private
     */

  }, {
    key: '_findTagValue',
    value: function _findTagValue(names) {
      var tag = this._find(names);
      if (tag) {
        return tag.tagValue;
      } else {
        return null;
      }
    }

    /**
     * resolve long name.
     * if the name relates import path, consider import path.
     * @param {string} name - identifier name.
     * @returns {string} resolved name.
     * @private
     */

  }, {
    key: '_resolveLongname',
    value: function _resolveLongname(name) {
      var importPath = _ASTUtil2.default.findPathInImportDeclaration(this._ast, name);
      if (!importPath) return name;

      if (importPath.charAt(0) === '.' || importPath.charAt(0) === '/') {
        if (!_path2.default.extname(importPath)) importPath += '.js';

        var resolvedPath = this._pathResolver.resolve(importPath);
        var longname = resolvedPath + '~' + name;
        return longname;
      } else {
        var _longname2 = importPath + '~' + name;
        return _longname2;
      }
    }

    /**
     * flatten member expression property name.
     * if node structure is [foo [bar [baz [this] ] ] ], flatten is ``this.baz.bar.foo``
     * @param {ASTNode} node - target member expression node.
     * @returns {string} flatten property.
     * @private
     */

  }, {
    key: '_flattenMemberExpression',
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

    /**
     * find class in same file, import or external.
     * @param {string} className - target class name.
     * @returns {string} found class long name.
     * @private
     */

  }, {
    key: '_findClassLongname',
    value: function _findClassLongname(className) {
      // find in same file.
      var _iteratorNormalCompletion12 = true;
      var _didIteratorError12 = false;
      var _iteratorError12 = undefined;

      try {
        for (var _iterator12 = this._ast.body[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
          var node = _step12.value;

          if (!['ExportDefaultDeclaration', 'ExportNamedDeclaration'].includes(node.type)) continue;
          if (node.declaration && node.declaration.type === 'ClassDeclaration' && node.declaration.id.name === className) {
            return this._pathResolver.filePath + '~' + className;
          }
        }

        // find in import.
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

      var importPath = _ASTUtil2.default.findPathInImportDeclaration(this._ast, className);
      if (importPath) return this._resolveLongname(className);

      // find in external
      return className;
    }
  }, {
    key: 'value',
    get: function get() {
      return JSON.parse(JSON.stringify(this._value));
    }
  }]);

  return AbstractDoc;
}();

exports.default = AbstractDoc;
module.exports = exports['default'];