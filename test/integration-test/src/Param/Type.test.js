import assert from 'assert';
import {find} from '../../util';

describe('test/Param/Type', ()=>{
  it('has array param', ()=>{
    const doc = find('longname', 'src/Param/Type.js~TestParam#methodArray');
    assert.equal(doc.params.length, 1);
    assert.equal(doc.params[0].types.length, 1);
    assert.equal(doc.params[0].types[0], 'number[]');
  });

  it('has class param', ()=>{
    const doc = find('longname', 'src/Param/Type.js~TestParam#methodClass');
    assert.equal(doc.params.length, 1);
    assert.equal(doc.params[0].types.length, 1);
    assert.equal(doc.params[0].types[0], 'TestParamClassInner');
  });

  it('has external param', ()=>{
    const doc = find('longname', 'src/Param/Type.js~TestParam#methodExternal');
    assert.equal(doc.params.length, 1);
    assert.equal(doc.params[0].types.length, 1);
    assert.equal(doc.params[0].types[0], 'ArrayBuffer');
  });

  it('has function param', ()=>{
    const doc = find('longname', 'src/Param/Type.js~TestParam#methodFunction');
    assert.equal(doc.params.length, 1);
    assert.equal(doc.params[0].types.length, 1);
    assert.equal(doc.params[0].types[0], 'function(x1: number, x2: string): boolean');
  });

  it('has generics param', ()=>{
    const doc = find('longname', 'src/Param/Type.js~TestParam#methodGenerics');
    assert.equal(doc.params.length, 3);

    assert.equal(doc.params[0].types.length, 1);
    assert.equal(doc.params[0].types[0], 'Array<number>');

    assert.equal(doc.params[1].types.length, 1);
    assert.equal(doc.params[1].types[0], 'Map<number, string>');

    assert.equal(doc.params[2].types.length, 1);
    assert.equal(doc.params[2].types[0], 'Promise<number[], Error>');
  });

  it('has literal param', ()=>{
    const doc = find('longname', 'src/Param/Type.js~TestParam#methodLiteral');
    assert.equal(doc.params.length, 1);
    assert.equal(doc.params[0].types.length, 1);
    assert.equal(doc.params[0].types[0], 'number');
  });

  it('has object param', ()=>{
    const doc = find('longname', 'src/Param/Type.js~TestParam#methodObject');
    assert.equal(doc.params.length, 2);

    assert.equal(doc.params[0].types.length, 1);
    assert.equal(doc.params[0].types[0], 'Object');

    assert.equal(doc.params[1].types.length, 1);
    assert.equal(doc.params[1].types[0], 'number');
  });

  it('has record param', ()=>{
    const doc = find('longname', 'src/Param/Type.js~TestParam#methodRecord');
    assert.equal(doc.params.length, 1);
    assert.equal(doc.params[0].types.length, 1);
    assert.equal(doc.params[0].types[0], '{x1: number, x2: string}');
  });

  it('has spread param', ()=>{
    const doc = find('longname', 'src/Param/Type.js~TestParam#methodSpread');
    assert.equal(doc.params.length, 1);
    assert.equal(doc.params[0].types.length, 1);
    assert.equal(doc.params[0].types[0], '...number');
    assert.equal(doc.params[0].spread, true);
  });

  it('has typedef param', ()=>{
    const doc = find('longname', 'src/Param/Type.js~TestParam#methodTypedef');
    assert.equal(doc.params.length, 1);
    assert.equal(doc.params[0].types.length, 1);
    assert.equal(doc.params[0].types[0], 'TestTypeTypedefInner');
  });

  it('has union param', ()=>{
    const doc = find('longname', 'src/Param/Type.js~TestParam#methodUnion');
    assert.equal(doc.params.length, 1);
    assert.equal(doc.params[0].types.length, 2);
    assert.deepEqual(doc.params[0].types, ['number', 'string']);
  });
});
