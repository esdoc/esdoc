import fs from 'fs';
import path from 'path';
import assert from 'assert';
import {cli, readTags} from '../util.js';

/** @test {Plugin} */
describe('test config.plugins: [...]', ()=>{
  cli('./test/fixture/config/esdoc-plugins.json');
  const tags = readTags('./test/fixture/dest/esdoc-plugins/index.json');

  /* eslint-disable global-require */
  it('call each handlers', ()=>{
    const pluginPath = path.resolve('./test/fixture/package/plugin/MyPlugin1.js');
    const plugin = require(pluginPath);

    assert(plugin.callInfo.handlerNames.onStart);
    assert(plugin.callInfo.handlerNames.onHandleConfig);
    assert(plugin.callInfo.handlerNames.onHandleCode);
    assert(plugin.callInfo.handlerNames.onHandleCodeParser);
    assert(plugin.callInfo.handlerNames.onHandleAST);
    assert(plugin.callInfo.handlerNames.onHandleDocs);
    assert(plugin.callInfo.handlerNames.onPublish);
    assert(plugin.callInfo.handlerNames.onHandleContent);
    assert(plugin.callInfo.handlerNames.onComplete);
    assert.deepEqual(plugin.callInfo.option, {foo: 1});
    assert.equal(plugin.callInfo.usedParser, true);
  });

  it('custom document by each handlers', ()=>{
    const tag = tags.find(tag => tag.name === 'MyClass_ModifiedCode_ModifiedAST_ModifiedTag');
    assert(tag);

    const html = fs.readFileSync('./test/fixture/dest/esdoc-plugins/index.html');
    assert(html.includes('content was made by MyPlugin1(modified).onPublish'));
  });

  /* eslint-disable global-require */
  it('call multi plugins', ()=>{
    const pluginPath = path.resolve('./test/fixture/package/plugin/MyPlugin1.js');
    const plugin = require(pluginPath);

    assert.deepEqual(plugin.callInfo.handlerNames.onStart, ['MyPlugin1', 'MyPlugin2']);
    assert.deepEqual(plugin.callInfo.handlerNames.onHandleConfig, ['MyPlugin1', 'MyPlugin2']);
    assert.deepEqual(plugin.callInfo.handlerNames.onHandleCode, ['MyPlugin1', 'MyPlugin2']);
    assert.deepEqual(plugin.callInfo.handlerNames.onHandleCodeParser, ['MyPlugin1', 'MyPlugin2']);
    assert.deepEqual(plugin.callInfo.handlerNames.onHandleAST, ['MyPlugin1', 'MyPlugin2']);
    assert.deepEqual(plugin.callInfo.handlerNames.onHandleDocs, ['MyPlugin1', 'MyPlugin2']);
    assert.deepEqual(plugin.callInfo.handlerNames.onPublish, ['MyPlugin1', 'MyPlugin2']);
    assert.deepEqual(plugin.callInfo.handlerNames.onHandleContent, ['MyPlugin1', 'MyPlugin2']);
    assert.deepEqual(plugin.callInfo.handlerNames.onComplete, ['MyPlugin1', 'MyPlugin2']);
  });
});
