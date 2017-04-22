import assert from 'assert';
import {readTags, cli} from '../util.js';

/** @test {publish} */
describe('test config.test: null', ()=>{
  cli('./test/fixture/config/esdoc-test.json');

  it('does not have test integration', ()=>{
    const tags = readTags('./test/fixture/dest/esdoc-test/index.json');
    const tag = tags.find(tag => tag.name === 'testDescribe');
    assert.equal(tag, null);
  });
});
