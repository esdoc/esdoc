import assert from 'assert';
import {find} from '../../../util';

describe('test/Type/Guess/Member:', ()=>{
  it('guess type that is literal', ()=>{
    const doc = find('longname', 'src/Type/Guess/Member.js~TestTypeGuessMember#memberLiteral');
    assert.deepEqual(doc.type, {types: ['number']});
  });

  it('guess type that is array', ()=>{
    const doc = find('longname', 'src/Type/Guess/Member.js~TestTypeGuessMember#memberArray');
    assert.deepEqual(doc.type, {types: ['number[]']});
  });

  it('guess type that is object', ()=>{
    const doc = find('longname', 'src/Type/Guess/Member.js~TestTypeGuessMember#memberObject');
    assert.deepEqual(doc.type, {types: ['{"x1": number, "x2": string}']});
  });

  it('guess type that is template literal', ()=>{
    const doc = find('longname', 'src/Type/Guess/Member.js~TestTypeGuessMember#memberTemplateLiteral');
    assert.deepEqual(doc.type, {types: ['string']});
  });
});
