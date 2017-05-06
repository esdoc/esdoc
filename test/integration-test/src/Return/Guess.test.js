import assert from 'assert';
import {find} from '../../util';

describe('test/Return/Guess:', ()=>{
  it('guess return value that is literal', ()=>{
    const doc = find('longname', 'src/Return/Guess.js~TestReturnGuess#methodLiteral');
    assert.deepEqual(doc.return, {types: ['number']});
  });

  it('guess return value that is array', ()=>{
    const doc = find('longname', 'src/Return/Guess.js~TestReturnGuess#methodArray');
    assert.deepEqual(doc.return, {types: ['number[]']});
  });

  it('guess return value that is object', ()=>{
    const doc = find('longname', 'src/Return/Guess.js~TestReturnGuess#methodObject');
    assert.deepEqual(doc.return, {types: ['{"x1": number, "x2": string}']});
  });

  it('guess return value that is template literal', ()=>{
    const doc = find('longname', 'src/Return/Guess.js~TestReturnGuess#methodTemplateLiteral');
    assert.deepEqual(doc.return, {types: ['string']});
  });
});
