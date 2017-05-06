import assert from 'assert';
import {find} from '../../util';

describe('test/Generator/Generator:', ()=>{
  it('is generator method', ()=>{
    const doc = find('longname', 'src/Generator/Generator.js~TestGeneratorClass#methodGenerator');
    assert.equal(doc.generator, true);
  });

  it('is generator function', ()=>{
    const doc = find('longname', 'src/Generator/Generator.js~testGeneratorFunction');
    assert.equal(doc.generator, true);
  });
});
