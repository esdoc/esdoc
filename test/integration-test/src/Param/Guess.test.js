import assert from 'assert';
import {find} from '../../util';

describe('test/Param/Guess', ()=>{
  it('has literal param', ()=>{
    const doc = find('longname', 'src/Param/Guess.js~TestParamGuess#methodLiteral');
    assert.equal(doc.params.length, 1);
    assert.equal(doc.params[0].types.length, 1);
    assert.equal(doc.params[0].types[0], 'number');
    assert.equal(doc.params[0].defaultRaw, 123);
    assert.equal(doc.params[0].defaultValue, '123');
  });

  it('has identifier param', ()=>{
    const doc = find('longname', 'src/Param/Guess.js~TestParamGuess#methodIdentifier');
    assert.equal(doc.params.length, 1);
    assert.equal(doc.params[0].types.length, 1);
    assert.equal(doc.params[0].types[0], '*');
    assert.equal(doc.params[0].defaultRaw, 'value');
    assert.equal(doc.params[0].defaultValue, 'value');
  });

  it('has new expression param', ()=>{
    const doc = find('longname', 'src/Param/Guess.js~TestParamGuess#methodNewExpression');
    assert.equal(doc.params.length, 1);
    assert.equal(doc.params[0].types.length, 1);
    assert.equal(doc.params[0].types[0], '*');
  });

  it('has array param', ()=>{
    const doc = find('longname', 'src/Param/Guess.js~TestParamGuess#methodArray');
    assert.equal(doc.params.length, 1);
    assert.equal(doc.params[0].types.length, 1);
    assert.equal(doc.params[0].types[0], 'number[]');
    assert.deepEqual(doc.params[0].defaultRaw, [123, 456]);
    assert.equal(doc.params[0].defaultValue, '[123,456]');
  });

  it('has array destructuring param', ()=>{
    const doc = find('longname', 'src/Param/Guess.js~TestParamGuess#methodArrayDestructuring');
    assert.equal(doc.params.length, 1);
    assert.equal(doc.params[0].types.length, 1);
    assert.equal(doc.params[0].types[0], '*[]');
    assert.deepEqual(doc.params[0].defaultRaw, ["null", "null"]);
    assert.equal(doc.params[0].defaultValue, '[null, null]');
  });

  it('has array default and destructuring param', ()=>{
    const doc = find('longname', 'src/Param/Guess.js~TestParamGuess#methodArrayAndDestructuring');
    assert.equal(doc.params.length, 1);
    assert.equal(doc.params[0].types.length, 1);
    assert.equal(doc.params[0].types[0], 'number[]');
    assert.deepEqual(doc.params[0].defaultRaw, [123, 456]);
    assert.equal(doc.params[0].defaultValue, '[123,456]');
  });

  it('guess object param', ()=>{
    const doc = find('longname', 'src/Param/Guess.js~TestParamGuess#methodObject');
    assert.equal(doc.params.length, 1);
    assert.equal(doc.params[0].types.length, 1);
    assert.equal(doc.params[0].types[0], '{"x1": string, "x2": boolean}');
    assert.deepEqual(doc.params[0].defaultRaw, {x1: 'text', x2: true});
    assert.equal(doc.params[0].defaultValue, '{"x1":"text","x2":true}');
  });

  it('guess object destructuring param', ()=>{
    const doc = find('longname', 'src/Param/Guess.js~TestParamGuess#methodObjectDestructuring');
    assert.equal(doc.params.length, 1);
    assert.equal(doc.params[0].types.length, 1);
    assert.equal(doc.params[0].types[0], '{"x1": *, "x2": *}');
    assert.deepEqual(doc.params[0].defaultRaw, {x1: null, x2: null});
    assert.equal(doc.params[0].defaultValue, '{"x1":null,"x2":null}');
  });

  it('guess object default and destructuring param', ()=>{
    const doc = find('longname', 'src/Param/Guess.js~TestParamGuess#methodObjectAndDestructuring');
    assert.equal(doc.params.length, 1);
    assert.equal(doc.params[0].types.length, 1);
    assert.equal(doc.params[0].types[0], '{"x1": number, "x2": string}');
    assert.deepEqual(doc.params[0].defaultRaw, {x1: 123, x2: 'text'});
    assert.equal(doc.params[0].defaultValue, '{"x1":123,"x2":"text"}');
  });

  it('guess spread param', ()=>{
    const doc = find('longname', 'src/Param/Guess.js~TestParamGuess#methodSpread');
    assert.equal(doc.params.length, 1);
    assert.equal(doc.params[0].types.length, 1);
    assert.equal(doc.params[0].types[0], '...*');
    assert.equal(doc.params[0].spread, true);
  });

  it('guess array destructuring and partial default param', ()=>{
    const doc = find('longname', 'src/Param/Guess.js~TestParamGuess#methodArrayDestructuringAndPartialDefault');
    assert.equal(doc.params.length, 1);
    assert.equal(doc.params[0].types.length, 1);
    assert.equal(doc.params[0].types[0], 'number[]');
    assert.deepEqual(doc.params[0].defaultRaw, ['null', '10', '*', '"text"', '*']);
    assert.equal(doc.params[0].defaultValue, '[null, 10, *, "text", *]');
  });
});
