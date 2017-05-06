import assert from 'assert';
import ParamParser from '../../src/Parser/ParamParser.js';

/** @test {ParamParser} */
describe('ParamParser:', ()=>{
  /** @test {ParamParser.parseParamValue} */
  it('parse param value.', ()=>{
    const value = '{number} p1 this is desc';
    const {typeText, paramName, paramDesc} = ParamParser.parseParamValue(value);
    assert.equal(typeText, 'number');
    assert.equal(paramName, 'p1');
    assert.equal(paramDesc, 'this is desc');
  });

  /** @test {ParamParser.parseParamValue} */
  it('parse param value with hyphen prefix.', ()=>{
    const value = '{number} p1 - this is desc';
    const {typeText, paramName, paramDesc} = ParamParser.parseParamValue(value);
    assert.equal(typeText, 'number');
    assert.equal(paramName, 'p1');
    assert.equal(paramDesc, 'this is desc');
  });

  /** @test {ParamParser.parseParamValue} */
  it('parse param value without param name', ()=>{
    const value = '{number} this is desc';
    const {typeText, paramDesc} = ParamParser.parseParamValue(value, true, false, true);
    assert.equal(typeText, 'number');
    assert.equal(paramDesc, 'this is desc');
  });

  /** @test {ParamParser.parseParamValue} */
  it('parse param value without param desc', ()=>{
    const value = '{number} p1';
    const {typeText, paramName} = ParamParser.parseParamValue(value, true, true, false);
    assert.equal(typeText, 'number');
    assert.equal(paramName, 'p1');
  });

  /** @test {ParamParser.parseParamValue} */
  it('parse param value with complex', ()=>{
    const value = '{!(number|string|boolean[])} [p1=10] this is desc';
    const {typeText, paramName, paramDesc} = ParamParser.parseParamValue(value);
    assert.equal(typeText, '!(number|string|boolean[])');
    assert.equal(paramName, '[p1=10]');
    assert.equal(paramDesc, 'this is desc');
  });

  /** @test {ParamParser.parseParam} */
  it('parse param.', ()=>{
    const value = '{number} p1 this is desc';
    const {typeText, paramName, paramDesc} = ParamParser.parseParamValue(value);
    const result = ParamParser.parseParam(typeText, paramName, paramDesc);
    assert.deepEqual(result, {
      nullable: null,
      types: ['number'],
      spread: false,
      optional: false,
      name: 'p1',
      description: 'this is desc'
    });
  });

  /** @test {ParamParser.parseParam} */
  it('parse param with complex.', ()=>{
    const value = '{?(number|string|boolean[])} [p1] this is desc';
    const {typeText, paramName, paramDesc} = ParamParser.parseParamValue(value);
    const result = ParamParser.parseParam(typeText, paramName, paramDesc);
    assert.deepEqual(result, {
      nullable: true,
      types: ['number', 'string', 'boolean[]'],
      spread: false,
      optional: true,
      name: 'p1',
      description: 'this is desc',
    });
  });

  /** @test {ParamParser.parseParam} */
  it('parse param with object ({}) as default.', ()=>{
    const value = '{!(number|string|boolean[])} [p1={}] this is desc';
    const {typeText, paramName, paramDesc} = ParamParser.parseParamValue(value);
    const result = ParamParser.parseParam(typeText, paramName, paramDesc);
    assert.deepEqual(result, {
      nullable: false,
      types: ['number', 'string', 'boolean[]'],
      spread: false,
      optional: true,
      name: 'p1',
      description: 'this is desc',
      defaultValue: '{}',
      defaultRaw: {}
    });
  });

  /** @test {ParamParser.parseParam} */
  it('parse param with complex.', ()=>{
    const value = '{...number} [p1=[10,20,30]] this is desc';
    const {typeText, paramName, paramDesc} = ParamParser.parseParamValue(value);
    const result = ParamParser.parseParam(typeText, paramName, paramDesc);
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

  it('parse param even if description has {}.', ()=>{
    const value = '{number} p1 foo {a: number} bar';
    const {typeText, paramName, paramDesc} = ParamParser.parseParamValue(value);
    const result = ParamParser.parseParam(typeText, paramName, paramDesc);
    assert.deepEqual(result, {
      nullable: null,
      types: ['number'],
      spread: false,
      optional: false,
      name: 'p1',
      description: 'foo {a: number} bar'
    });
  });

  /** @test {ParamParser.parseParam} */
  it('throws error when empty type.', ()=>{
    const value = '{} foo bar';
    const {typeText, paramName, paramDesc} = ParamParser.parseParamValue(value);

    try {
      ParamParser.parseParam(typeText, paramName, paramDesc);
    } catch (e) {
      assert.equal(e.message, 'Empty Type found name=foo desc=bar');
      return;
    }
    assert(false);
  });
});
