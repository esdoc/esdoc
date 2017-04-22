import assert from 'assert';
import {readTags, cli} from '../util.js';

/** @test {ManualDocBuilder} */
describe('test config.manual: null', ()=>{
  cli('./test/fixture/config/esdoc-manual.json');
  const tags = readTags('./test/fixture/dest/esdoc-manual/index.json');

  it('does not have manual.', ()=>{
    const tag = tags.find(tag => tag.kind === 'manualOverview');
    assert.equal(tag, null);
  });
});
