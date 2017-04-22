import assert from 'assert';
import {cli, readTags} from '../util.js';

/** @test {ESDoc.generate} */
describe('test config.excludes: ["Class\\.js"]', ()=>{
  cli('./test/fixture/config/esdoc-excludes.json');
  const tags = readTags('./test/fixture/dest/esdoc-excludes/index.json');

  it('does not have excluded identifier', ()=>{
    const tag = tags.find(tag => tag.name === 'TestDescClass');
    assert.equal(tag, null);
  });
});
