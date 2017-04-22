import process from 'process';
import assert from 'assert';
import {cli, readTags} from '../util.js';

describe('test finding config path:', ()=>{
  const cwd = process.cwd();

  process.chdir('./test/fixture/config/find-.esdoc.json/');
  cli();
  process.chdir(cwd);

  process.chdir('./test/fixture/config/find-.esdoc.js/');
  cli();
  process.chdir(cwd);

  process.chdir('./test/fixture/config/find-package.json/');
  cli();
  process.chdir(cwd);

  it('can find .esdoc.json', ()=>{
    const tags = readTags('./test/fixture/dest/find-.esdoc.json/index.json');
    const tag = tags.find(tag => tag.name === 'TestAccessClassPublic');
    assert(tag);
  });

  it('can find .esdoc.js', ()=>{
    const tags = readTags('./test/fixture/dest/find-.esdoc.js/index.json');
    const tag = tags.find(tag => tag.name === 'TestAccessClassPublic');
    assert(tag);
  });

  it('can find package.js', ()=>{
    const tags = readTags('./test/fixture/dest/find-package.json/index.json');
    const tag = tags.find(tag => tag.name === 'TestAccessClassPublic');
    assert(tag);
  });
});
