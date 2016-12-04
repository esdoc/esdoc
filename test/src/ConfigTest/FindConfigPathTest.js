import process from 'process';
import {readDoc, assert, cli} from '../util.js';

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
    const doc = readDoc('class/src/Access/Class.js~TestAccessClassPublic.html', './test/fixture/dest/find-.esdoc.json');
    assert.includes(doc, '.self-detail [data-ice="name"]', 'TestAccessClassPublic');
  });

  it('can find .esdoc.js', ()=>{
    const doc = readDoc('class/src/Access/Class.js~TestAccessClassPublic.html', './test/fixture/dest/find-.esdoc.js');
    assert.includes(doc, '.self-detail [data-ice="name"]', 'TestAccessClassPublic');
  });

  it('can find package.js', ()=>{
    const doc = readDoc('class/src/Access/Class.js~TestAccessClassPublic.html', './test/fixture/dest/find-package.json');
    assert.includes(doc, '.self-detail [data-ice="name"]', 'TestAccessClassPublic');
  });
});
