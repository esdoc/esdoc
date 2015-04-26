import fs from 'fs';
import {assert} from './util.js';

describe('Coverage:', ()=> {
  it('has coverage.json', ()=>{
    let json = fs.readFileSync('./test/fixture/esdoc/coverage.json', {encoding: 'utf8'}).toString();
    let coverage = JSON.parse(json);
    assert.equal(coverage.coverage, '89.65%');
    assert.equal(coverage.expectCount, 87);
    assert.equal(coverage.actualCount, 78);
  });
});
