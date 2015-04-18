import assert from 'power-assert';
import ParamParser from '../../../src/Parser/ParamParser.js';

describe('ParamParser:', ()=>{
  it('parse param value.', ()=>{
    let value = '{number} p1 this is desc';
    let {typeText, paramName, paramDesc} = ParamParser.parseParamValue(value);
    assert.equal(typeText, 'number');
    assert.equal(paramName, 'p1');
    assert.equal(paramDesc, 'this is desc');
  });

  it('parse param value with hyphen prefix.', ()=>{
    let value = '{number} p1 - this is desc';
    let {typeText, paramName, paramDesc} = ParamParser.parseParamValue(value);
    assert.equal(typeText, 'number');
    assert.equal(paramName, 'p1');
    assert.equal(paramDesc, 'this is desc');
  });

  it('parse param value without param name', ()=>{
    let value = '{number} this is desc';
    let {typeText, paramDesc} = ParamParser.parseParamValue(value, true, false, true);
    assert.equal(typeText, 'number');
    assert.equal(paramDesc, 'this is desc');
  });

  it('parse param value without param desc', ()=>{
    let value = '{number} p1';
    let {typeText, paramName} = ParamParser.parseParamValue(value, true, true, false);
    assert.equal(typeText, 'number');
    assert.equal(paramName, 'p1');
  });

  it('parse param value with complex', ()=>{
    let value = '{!(number|string|boolean[])} [p1=10] this is desc';
    let {typeText, paramName, paramDesc} = ParamParser.parseParamValue(value);
    assert.equal(typeText, '!(number|string|boolean[])');
    assert.equal(paramName, '[p1=10]');
    assert.equal(paramDesc, 'this is desc');
  });

  it('parse param.', ()=>{
    let value = '{number} p1 this is desc';
    let {typeText, paramName, paramDesc} = ParamParser.parseParamValue(value);
    let result = ParamParser.parseParam(typeText, paramName, paramDesc);
    assert.deepEqual(result, {
      nullable: null,
      types: ['number'],
      spread: false,
      optional: false,
      name: 'p1',
      description: 'this is desc'
    });
  });

  it('parse param with complex.', ()=>{
    let value = '{?(number|string|boolean[])} [p1] this is desc';
    let {typeText, paramName, paramDesc} = ParamParser.parseParamValue(value);
    let result = ParamParser.parseParam(typeText, paramName, paramDesc);
    assert.deepEqual(result, {
      nullable: true,
      types: ['number', 'string', 'boolean[]'],
      spread: false,
      optional: true,
      name: 'p1',
      description: 'this is desc',
    });
  });

  it('parse param with complex.', ()=>{
    let value = '{!(number|string|boolean[])} [p1=10] this is desc';
    let {typeText, paramName, paramDesc} = ParamParser.parseParamValue(value);
    let result = ParamParser.parseParam(typeText, paramName, paramDesc);
    assert.deepEqual(result, {
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

  it('parse param with complex.', ()=>{
    let value = '{...number} [p1=[10,20,30]] this is desc';
    let {typeText, paramName, paramDesc} = ParamParser.parseParamValue(value);
    let result = ParamParser.parseParam(typeText, paramName, paramDesc);
    assert.deepEqual(result, {
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
