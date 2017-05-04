import assert from 'assert';
import {find} from '../../util';

describe('test/Param/Complex:', ()=>{
  it('has function param', ()=>{
    const doc = find('longname', 'src/Param/Complex.js~TestParamComplex#methodFunction');
    assert.equal(doc.params.length, 1);
    assert.equal(doc.params[0].types.length, 1);
    assert.equal(doc.params[0].types[0], 'function(x1: number[], x2: Map<string, boolean>): Object');
  });

  it('has generics param', ()=>{
    const doc = find('longname', 'src/Param/Complex.js~TestParamComplex#methodGenerics');
    assert.equal(doc.params.length, 1);
    assert.equal(doc.params[0].types.length, 1);
    assert.equal(doc.params[0].types[0], 'Map<number, string[]>');
  });

  it('has record param', ()=>{
    const doc = find('longname', 'src/Param/Complex.js~TestParamComplex#methodRecord');
    assert.equal(doc.params.length, 1);
    assert.equal(doc.params[0].types.length, 1);
    assert.equal(doc.params[0].types[0], '{x1: number[], x2: Map<string, boolean>, x3: {y1: number, y2: string}}');
  });

  it('has union param', ()=>{
    const doc = find('longname', 'src/Param/Complex.js~TestParamComplex#methodUnion');
    assert.equal(doc.params.length, 2);

    assert.equal(doc.params[0].types.length, 2);
    assert.deepEqual(doc.params[0].types, ['number', 'string']);
    assert.equal(doc.params[0].nullable, true);

    assert.equal(doc.params[1].types.length, 2);
    assert.deepEqual(doc.params[1].types, ['number', 'string']);
    assert.equal(doc.params[1].nullable, false);
  });

  it('has union and generics param', ()=>{
    const doc = find('longname', 'src/Param/Complex.js~TestParamComplex#methodUnionAndGenerics');
    assert.equal(doc.params.length, 1);

    assert.equal(doc.params[0].types.length, 1);
    assert.equal(doc.params[0].types[0], 'Promise<string|number, Error>');
  });

  it('has union and spread param', ()=>{
    const doc = find('longname', 'src/Param/Complex.js~TestParamComplex#methodUnionAndSpread');
    assert.equal(doc.params.length, 1);

    assert.equal(doc.params[0].types.length, 1);
    assert.equal(doc.params[0].types[0], '...(number|string)');
    assert.equal(doc.params[0].spread, true);
  });
});
