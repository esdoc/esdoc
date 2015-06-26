'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _utilJs = require('./util.js');

/**
 * Resolve various properties in doc object.
 */

var DocResolver = (function () {
  /**
   * create instance.
   * @param {DocBuilder} builder - target doc builder.
   */

  function DocResolver(builder) {
    _classCallCheck(this, DocResolver);

    this._builder = builder;
    this._data = builder._data;
  }

  _createClass(DocResolver, [{
    key: 'resolve',

    /**
     * resolve various properties.
     */
    value: function resolve() {
      this._resolveAccess();
      this._resolveUnexportIdentifier();
      this._resolveUndocumentIdentifier();
      this._resolveDuplication();
      this._resolveIgnore();
      this._resolveMarkdown();
      this._resolveLink();
      this._resolveExtendsChain();
      this._resolveTestRelation();
    }
  }, {
    key: '_resolveIgnore',

    /**
     * resolve ignore property.
     * remove docs that has ignore property.
     * @private
     */
    value: function _resolveIgnore() {
      if (this._data.__RESOLVED_IGNORE__) return;

      var docs = this._builder._find({ ignore: true });
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = docs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var doc = _step.value;

          var regex = new RegExp('^' + doc.longname + '[.~#]');
          this._data({ longname: { regex: regex } }).remove();
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

      this._data({ ignore: true }).remove();

      this._data.__RESOLVED_IGNORE__ = true;
    }
  }, {
    key: '_resolveAccess',

    /**
     * resolve access property.
     * if doc does not have access property, the doc is public.
     * but name is started with '-', the doc is private.
     * @private
     */
    value: function _resolveAccess() {
      if (this._data.__RESOLVED_ACCESS__) return;

      var config = this._builder._config;
      var access = config.access || ['public', 'protected', 'private'];
      var autoPrivate = config.autoPrivate;

      this._data().update(function () {
        if (!this.access) {
          if (autoPrivate && this.name.charAt(0) === '_') {
            /** @ignore */
            this.access = 'private';
          } else {
            this.access = 'public';
          }
        }

        if (!access.includes(this.access)) /** @ignore */this.ignore = true;

        return this;
      });

      this._data.__RESOLVED_ACCESS__ = true;
    }
  }, {
    key: '_resolveUnexportIdentifier',

    /**
     * resolve unexport identifier doc.
     * doc is added ignore property that is not exported.
     * @private
     */
    value: function _resolveUnexportIdentifier() {
      if (this._data.__RESOLVED_UNEXPORT_IDENTIFIER__) return;

      var config = this._builder._config;
      if (!config.unexportIdentifier) {
        this._data({ 'export': false }).update({ ignore: true });
      }

      this._data.__RESOLVED_UNEXPORT_IDENTIFIER__ = true;
    }
  }, {
    key: '_resolveUndocumentIdentifier',

    /**
     * resolve undocument identifier doc.
     * doc is added ignore property that does not have document tag.
     * @private
     */
    value: function _resolveUndocumentIdentifier() {
      if (this._data.__RESOLVED_UNDOCUMENT_IDENTIFIER__) return;

      if (!this._builder._config.undocumentIdentifier) {
        this._builder._data({ undocument: true }).update({ ignore: true });
      }

      this._data.__RESOLVED_UNDOCUMENT_IDENTIFIER__ = true;
    }
  }, {
    key: '_resolveMarkdown',

    /**
     * resolve description as markdown.
     * @private
     */
    value: function _resolveMarkdown() {
      if (this._data.__RESOLVED_MARKDOWN__) return;

      function convert(obj) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = Object.keys(obj)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var key = _step2.value;

            var value = obj[key];
            if (key === 'description' && typeof value === 'string') {
              obj[key + 'Raw'] = obj[key];
              obj[key] = (0, _utilJs.markdown)(value, false);
            } else if (typeof value === 'object' && value) {
              convert(value);
            }
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

      var docs = this._builder._find();
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = docs[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var doc = _step3.value;

          convert(doc);
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

      this._data.__RESOLVED_MARKDOWN__ = true;
    }
  }, {
    key: '_resolveLink',

    /**
     * resolve @link as html link.
     * @private
     * @todo resolve all ``description`` property.
     */
    value: function _resolveLink() {
      var _this = this;

      if (this._data.__RESOLVED_LINK__) return;

      var link = function link(str) {
        if (!str) return str;

        return str.replace(/\{@link ([\w\#_\-.:\~\/]+)}/g, function (str, longname) {
          return _this._builder._buildDocLinkHTML(longname, longname);
        });
      };

      this._data().each(function (v) {
        v.description = link(v.description);

        if (v.params) {
          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = v.params[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var param = _step4.value;

              param.description = link(param.description);
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

        if (v['return']) {
          v['return'].description = link(v['return'].description);
        }

        if (v.throws) {
          var _iteratorNormalCompletion5 = true;
          var _didIteratorError5 = false;
          var _iteratorError5 = undefined;

          try {
            for (var _iterator5 = v.throws[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
              var _throw = _step5.value;

              _throw.description = link(_throw.description);
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

        if (v.see) {
          for (var i = 0; i < v.see.length; i++) {
            if (v.see[i].indexOf('{@link') === 0) {
              v.see[i] = link(v.see[i]);
            } else if (v.see[i].indexOf('<a href') === 0) {} else {
              v.see[i] = '<a href="' + v.see[i] + '">' + v.see[i] + '</a>';
            }
          }
        }
      });

      this._data.__RESOLVED_LINK__ = true;
    }
  }, {
    key: '_resolveExtendsChain',

    /**
     * resolve class extends chain.
     * add following special property.
     * - ``_custom_extends_chain``: ancestor class chain.
     * - ``_custom_direct_subclasses``: class list that direct extends target doc.
     * - ``_custom_indirect_subclasses``: class list that indirect extends target doc.
     * - ``_custom_indirect_implements``: class list that target doc indirect implements.
     * - ``_custom_direct_implemented``: class list that direct implements target doc.
     * - ``_custom_indirect_implemented``: class list that indirect implements target doc.
     *
     * @private
     */
    value: function _resolveExtendsChain() {
      var _this2 = this;

      if (this._data.__RESOLVED_EXTENDS_CHAIN__) return;

      var extendsChain = function extendsChain(doc) {
        if (!doc['extends']) return;

        var selfDoc = doc;

        // traverse super class.
        var chains = [];
        while (1) {
          if (!doc['extends']) break;

          var superClassDoc = _this2._builder._findByName(doc['extends'][0])[0];
          if (superClassDoc) {
            chains.push(superClassDoc.longname);
            doc = superClassDoc;
          } else {
            chains.push(doc['extends'][0]);
            break;
          }
        }

        if (chains.length) {
          // direct subclass
          var superClassDoc = _this2._builder._findByName(chains[0])[0];
          if (superClassDoc) {
            if (!superClassDoc._custom_direct_subclasses) superClassDoc._custom_direct_subclasses = [];
            superClassDoc._custom_direct_subclasses.push(selfDoc.longname);
          }

          // indirect subclass
          var _iteratorNormalCompletion6 = true;
          var _didIteratorError6 = false;
          var _iteratorError6 = undefined;

          try {
            for (var _iterator6 = chains.slice(1)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
              var superClassLongname = _step6.value;

              superClassDoc = _this2._builder._findByName(superClassLongname)[0];
              if (superClassDoc) {
                if (!superClassDoc._custom_indirect_subclasses) superClassDoc._custom_indirect_subclasses = [];
                superClassDoc._custom_indirect_subclasses.push(selfDoc.longname);
              }
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

          // indirect implements and mixes
          var _iteratorNormalCompletion7 = true;
          var _didIteratorError7 = false;
          var _iteratorError7 = undefined;

          try {
            for (var _iterator7 = chains[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
              var superClassLongname = _step7.value;

              superClassDoc = _this2._builder._findByName(superClassLongname)[0];
              if (!superClassDoc) continue;

              // indirect implements
              if (superClassDoc['implements']) {
                var _selfDoc$_custom_indirect_implements;

                if (!selfDoc._custom_indirect_implements) selfDoc._custom_indirect_implements = [];
                (_selfDoc$_custom_indirect_implements = selfDoc._custom_indirect_implements).push.apply(_selfDoc$_custom_indirect_implements, _toConsumableArray(superClassDoc['implements']));
              }

              // indirect mixes
              //if (superClassDoc.mixes) {
              //  if (!selfDoc._custom_indirect_mixes) selfDoc._custom_indirect_mixes = [];
              //  selfDoc._custom_indirect_mixes.push(...superClassDoc.mixes);
              //}
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

          // extends chains
          selfDoc._custom_extends_chains = chains.reverse();
        }
      };

      var implemented = function implemented(doc) {
        var selfDoc = doc;

        // direct implemented (like direct subclass)
        var _iteratorNormalCompletion8 = true;
        var _didIteratorError8 = false;
        var _iteratorError8 = undefined;

        try {
          for (var _iterator8 = (selfDoc['implements'] || [])[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
            var superClassLongname = _step8.value;

            var superClassDoc = _this2._builder._findByName(superClassLongname)[0];
            if (!superClassDoc) continue;
            if (!superClassDoc._custom_direct_implemented) superClassDoc._custom_direct_implemented = [];
            superClassDoc._custom_direct_implemented.push(selfDoc.longname);
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

        // indirect implemented (like indirect subclass)
        var _iteratorNormalCompletion9 = true;
        var _didIteratorError9 = false;
        var _iteratorError9 = undefined;

        try {
          for (var _iterator9 = (selfDoc._custom_indirect_implements || [])[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
            var superClassLongname = _step9.value;

            var superClassDoc = _this2._builder._findByName(superClassLongname)[0];
            if (!superClassDoc) continue;
            if (!superClassDoc._custom_indirect_implemented) superClassDoc._custom_indirect_implemented = [];
            superClassDoc._custom_indirect_implemented.push(selfDoc.longname);
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
      };

      //var mixed = (doc) =>{
      //  var selfDoc = doc;
      //
      //  // direct mixed (like direct subclass)
      //  for (var superClassLongname of selfDoc.mixes || []) {
      //    var superClassDoc = this._builder._find({longname: superClassLongname})[0];
      //    if (!superClassDoc) continue;
      //    if(!superClassDoc._custom_direct_mixed) superClassDoc._custom_direct_mixed = [];
      //    superClassDoc._custom_direct_mixed.push(selfDoc.longname);
      //  }
      //
      //  // indirect mixed (like indirect subclass)
      //  for (var superClassLongname of selfDoc._custom_indirect_mixes || []) {
      //    var superClassDoc = this._builder._find({longname: superClassLongname})[0];
      //    if (!superClassDoc) continue;
      //    if(!superClassDoc._custom_indirect_mixed) superClassDoc._custom_indirect_mixed = [];
      //    superClassDoc._custom_indirect_mixed.push(selfDoc.longname);
      //  }
      //};

      var docs = this._builder._find({ kind: 'class' });
      var _iteratorNormalCompletion10 = true;
      var _didIteratorError10 = false;
      var _iteratorError10 = undefined;

      try {
        for (var _iterator10 = docs[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
          var doc = _step10.value;

          extendsChain(doc);
          implemented(doc);
          //mixed(doc);
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

      this._data.__RESOLVED_EXTENDS_CHAIN__ = true;
    }
  }, {
    key: '_resolveTestRelation',

    /**
     * resolve test and identifier relation. add special property.
     * - ``_custom_tests``: longnames of test doc.
     * - ``_custom_test_targets``: longnames of identifier.
     *
     * @private
     */
    value: function _resolveTestRelation() {
      if (this._data.__RESOLVED_TEST_RELATION__) return;

      var testDocs = this._builder._find({ kind: ['testDescribe', 'testIt'] });
      var _iteratorNormalCompletion11 = true;
      var _didIteratorError11 = false;
      var _iteratorError11 = undefined;

      try {
        for (var _iterator11 = testDocs[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
          var testDoc = _step11.value;

          var testTargets = testDoc.testTargets;
          if (!testTargets) continue;

          var _iteratorNormalCompletion13 = true;
          var _didIteratorError13 = false;
          var _iteratorError13 = undefined;

          try {
            for (var _iterator13 = testTargets[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
              var testTarget = _step13.value;

              var doc = this._builder._findByName(testTarget)[0];
              if (doc) {
                if (!doc._custom_tests) doc._custom_tests = [];
                doc._custom_tests.push(testDoc.longname);

                if (!testDoc._custom_test_targets) testDoc._custom_test_targets = [];
                testDoc._custom_test_targets.push([doc.longname, testTarget]);
              } else {
                if (!testDoc._custom_test_targets) testDoc._custom_test_targets = [];
                testDoc._custom_test_targets.push([testTarget, testTarget]);
              }
            }
          } catch (err) {
            _didIteratorError13 = true;
            _iteratorError13 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion13 && _iterator13['return']) {
                _iterator13['return']();
              }
            } finally {
              if (_didIteratorError13) {
                throw _iteratorError13;
              }
            }
          }
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

      // test full description
      var _iteratorNormalCompletion12 = true;
      var _didIteratorError12 = false;
      var _iteratorError12 = undefined;

      try {
        for (var _iterator12 = testDocs[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
          var testDoc = _step12.value;

          var desc = [];
          var parents = (testDoc.memberof.split('~')[1] || '').split('.');
          var _iteratorNormalCompletion14 = true;
          var _didIteratorError14 = false;
          var _iteratorError14 = undefined;

          try {
            for (var _iterator14 = parents[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
              var _parent = _step14.value;

              var doc = this._builder._find({ kind: ['testDescribe', 'testIt'], name: _parent })[0];
              if (!doc) continue;
              desc.push(doc.descriptionRaw);
            }
          } catch (err) {
            _didIteratorError14 = true;
            _iteratorError14 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion14 && _iterator14['return']) {
                _iterator14['return']();
              }
            } finally {
              if (_didIteratorError14) {
                throw _iteratorError14;
              }
            }
          }

          desc.push(testDoc.descriptionRaw);
          testDoc.testFullDescription = desc.join(' ');
        }
      } catch (err) {
        _didIteratorError12 = true;
        _iteratorError12 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion12 && _iterator12['return']) {
            _iterator12['return']();
          }
        } finally {
          if (_didIteratorError12) {
            throw _iteratorError12;
          }
        }
      }

      this._data.__RESOLVED_TEST_RELATION__ = true;
    }
  }, {
    key: '_resolveDuplication',

    /**
     * resolve duplication identifier.
     * member doc is possible duplication.
     * other doc is not duplication.
     * @private
     */
    value: function _resolveDuplication() {
      if (this._data.__RESOLVED_DUPLICATION__) return;

      var docs = this._builder._find({ kind: 'member' });
      var ignoreId = [];
      var _iteratorNormalCompletion15 = true;
      var _didIteratorError15 = false;
      var _iteratorError15 = undefined;

      try {
        for (var _iterator15 = docs[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
          var doc = _step15.value;

          var dup = this._builder._find({ longname: doc.longname });
          if (dup.length > 1) {
            var ids = dup.map(function (v) {
              return v.___id;
            });
            ids.sort(function (a, b) {
              return a < b ? -1 : 1;
            });
            ids.shift();
            ignoreId.push.apply(ignoreId, _toConsumableArray(ids));
          }
        }
      } catch (err) {
        _didIteratorError15 = true;
        _iteratorError15 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion15 && _iterator15['return']) {
            _iterator15['return']();
          }
        } finally {
          if (_didIteratorError15) {
            throw _iteratorError15;
          }
        }
      }

      this._data({ ___id: ignoreId }).update(function () {
        this.ignore = true;
        return this;
      });

      this._data.__RESOLVED_DUPLICATION__ = true;
    }
  }]);

  return DocResolver;
})();

exports['default'] = DocResolver;
module.exports = exports['default'];

// ignore