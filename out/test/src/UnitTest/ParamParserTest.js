'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _srcParserParamParserJs = require('../../../src/Parser/ParamParser.js');

var _srcParserParamParserJs2 = _interopRequireDefault(_srcParserParamParserJs);

/** @test {ParamParser} */
describe('ParamParser:', function () {

  /** @test {ParamParser.parseParamValue} */
  it('parse param value.', function () {
    var value = '{number} p1 this is desc';

    var _ParamParser$parseParamValue = _srcParserParamParserJs2['default'].parseParamValue(value);

    var typeText = _ParamParser$parseParamValue.typeText;
    var paramName = _ParamParser$parseParamValue.paramName;
    var paramDesc = _ParamParser$parseParamValue.paramDesc;

    _assert2['default'].equal(typeText, 'number');
    _assert2['default'].equal(paramName, 'p1');
    _assert2['default'].equal(paramDesc, 'this is desc');
  });

  /** @test {ParamParser.parseParamValue} */
  it('parse param value with hyphen prefix.', function () {
    var value = '{number} p1 - this is desc';

    var _ParamParser$parseParamValue2 = _srcParserParamParserJs2['default'].parseParamValue(value);

    var typeText = _ParamParser$parseParamValue2.typeText;
    var paramName = _ParamParser$parseParamValue2.paramName;
    var paramDesc = _ParamParser$parseParamValue2.paramDesc;

    _assert2['default'].equal(typeText, 'number');
    _assert2['default'].equal(paramName, 'p1');
    _assert2['default'].equal(paramDesc, 'this is desc');
  });

  /** @test {ParamParser.parseParamValue} */
  it('parse param value without param name', function () {
    var value = '{number} this is desc';

    var _ParamParser$parseParamValue3 = _srcParserParamParserJs2['default'].parseParamValue(value, true, false, true);

    var typeText = _ParamParser$parseParamValue3.typeText;
    var paramDesc = _ParamParser$parseParamValue3.paramDesc;

    _assert2['default'].equal(typeText, 'number');
    _assert2['default'].equal(paramDesc, 'this is desc');
  });

  /** @test {ParamParser.parseParamValue} */
  it('parse param value without param desc', function () {
    var value = '{number} p1';

    var _ParamParser$parseParamValue4 = _srcParserParamParserJs2['default'].parseParamValue(value, true, true, false);

    var typeText = _ParamParser$parseParamValue4.typeText;
    var paramName = _ParamParser$parseParamValue4.paramName;

    _assert2['default'].equal(typeText, 'number');
    _assert2['default'].equal(paramName, 'p1');
  });

  /** @test {ParamParser.parseParamValue} */
  it('parse param value with complex', function () {
    var value = '{!(number|string|boolean[])} [p1=10] this is desc';

    var _ParamParser$parseParamValue5 = _srcParserParamParserJs2['default'].parseParamValue(value);

    var typeText = _ParamParser$parseParamValue5.typeText;
    var paramName = _ParamParser$parseParamValue5.paramName;
    var paramDesc = _ParamParser$parseParamValue5.paramDesc;

    _assert2['default'].equal(typeText, '!(number|string|boolean[])');
    _assert2['default'].equal(paramName, '[p1=10]');
    _assert2['default'].equal(paramDesc, 'this is desc');
  });

  /** @test {ParamParser.parseParam} */
  it('parse param.', function () {
    var value = '{number} p1 this is desc';

    var _ParamParser$parseParamValue6 = _srcParserParamParserJs2['default'].parseParamValue(value);

    var typeText = _ParamParser$parseParamValue6.typeText;
    var paramName = _ParamParser$parseParamValue6.paramName;
    var paramDesc = _ParamParser$parseParamValue6.paramDesc;

    var result = _srcParserParamParserJs2['default'].parseParam(typeText, paramName, paramDesc);
    _assert2['default'].deepEqual(result, {
      nullable: null,
      types: ['number'],
      spread: false,
      optional: false,
      name: 'p1',
      description: 'this is desc'
    });
  });

  /** @test {ParamParser.parseParam} */
  it('parse param with complex.', function () {
    var value = '{?(number|string|boolean[])} [p1] this is desc';

    var _ParamParser$parseParamValue7 = _srcParserParamParserJs2['default'].parseParamValue(value);

    var typeText = _ParamParser$parseParamValue7.typeText;
    var paramName = _ParamParser$parseParamValue7.paramName;
    var paramDesc = _ParamParser$parseParamValue7.paramDesc;

    var result = _srcParserParamParserJs2['default'].parseParam(typeText, paramName, paramDesc);
    _assert2['default'].deepEqual(result, {
      nullable: true,
      types: ['number', 'string', 'boolean[]'],
      spread: false,
      optional: true,
      name: 'p1',
      description: 'this is desc'
    });
  });

  /** @test {ParamParser.parseParam} */
  it('parse param with complex.', function () {
    var value = '{!(number|string|boolean[])} [p1=10] this is desc';

    var _ParamParser$parseParamValue8 = _srcParserParamParserJs2['default'].parseParamValue(value);

    var typeText = _ParamParser$parseParamValue8.typeText;
    var paramName = _ParamParser$parseParamValue8.paramName;
    var paramDesc = _ParamParser$parseParamValue8.paramDesc;

    var result = _srcParserParamParserJs2['default'].parseParam(typeText, paramName, paramDesc);
    _assert2['default'].deepEqual(result, {
      nullable: false,
      types: ['number', 'string', 'boolean[]'],
      spread: false,
      optional: true,
      name: 'p1',
      description: 'this is desc',
      defaultValue: '10',
      defaultRaw: 10
    });
  });

  /** @test {ParamParser.parseParam} */
  it('parse param with complex.', function () {
    var value = '{...number} [p1=[10,20,30]] this is desc';

    var _ParamParser$parseParamValue9 = _srcParserParamParserJs2['default'].parseParamValue(value);

    var typeText = _ParamParser$parseParamValue9.typeText;
    var paramName = _ParamParser$parseParamValue9.paramName;
    var paramDesc = _ParamParser$parseParamValue9.paramDesc;

    var result = _srcParserParamParserJs2['default'].parseParam(typeText, paramName, paramDesc);
    _assert2['default'].deepEqual(result, {
      nullable: null,
      types: ['...number'],
      spread: true,
      optional: true,
      name: 'p1',
      description: 'this is desc',
      defaultValue: '[10,20,30]',
      defaultRaw: [10, 20, 30]
    });
  });
});