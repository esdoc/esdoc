import assert from 'assert';
import {find} from '../../../util';

describe('test/Type/Guess/Variable:', ()=>{
  it('guess type that is literal', ()=>{
    const doc = find('longname', 'src/Type/Guess/Variable.js~testTypeGuessVariableLiteral');
    assert.deepEqual(doc.type, {types: ['number']});
  });

  it('guess type that is array', ()=>{
    const doc = find('longname', 'src/Type/Guess/Variable.js~testTypeGuessVariableArray');
    assert.deepEqual(doc.type, {types: ['number[]']});
  });

  it('guess type that is object', ()=>{
    const doc = find('longname', 'src/Type/Guess/Variable.js~testTypeGuessVariableObject');
    assert.deepEqual(doc.type, {types: ['{"x1": number, "x2": string}']});
  });

  it('guess type that is template literal', ()=>{
    const doc = find('longname', 'src/Type/Guess/Variable.js~testTypeGuessVariableTemplateLiteral');
    assert.deepEqual(doc.type, {types: ['string']});
  });
});
