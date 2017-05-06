import assert from 'assert';
import {find} from '../../util';

describe('test/Param/Attribute', ()=>{
  it('has default value', ()=>{
    const doc = find('longname', 'src/Param/Attribute.js~TestParamAttribute#methodDefault');

    assert.equal(doc.params.length, 3);

    assert.equal(doc.params[0].defaultValue, '123');
    assert.equal(doc.params[0].defaultRaw, 123);

    assert.equal(doc.params[1].defaultValue, '[]');
    assert.notStrictEqual(doc.params[1].defaultRaw, []);

    assert.equal(doc.params[2].defaultValue, ' new Foo()');
    assert.equal(doc.params[2].defaultRaw, ' new Foo()');
  });

  it('is nullable/not-nullable', ()=>{
    const doc = find('longname', 'src/Param/Attribute.js~TestParamAttribute#methodNullable');

    assert.equal(doc.params.length, 2);
    assert.equal(doc.params[0].nullable, true);
    assert.equal(doc.params[1].nullable, false);
  });

  it('is optional', ()=>{
    const doc = find('longname', 'src/Param/Attribute.js~TestParamAttribute#methodOptional');

    assert.equal(doc.params.length, 1);
    assert.equal(doc.params[0].optional, true);
  });
});
