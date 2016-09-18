import path from 'path';
import {cli, readDoc as _readDoc, assert, consoleLogSwitch} from '../util.js';

/** @test {Plugin} */
describe('test config.plugins: [...]', ()=>{
  consoleLogSwitch(false);
  cli('./test/fixture-config/esdoc-plugins.json');
  consoleLogSwitch(true);

  function readDoc(filePath) {
    return _readDoc(filePath, './test/fixture-config/esdoc-plugins');
  }

  it('call each handlers', ()=>{
    const pluginPath = path.resolve('./test/fixture/plugin/MyPlugin1.js');
    const plugin = require(pluginPath);

    assert(plugin.callInfo.handlerNames.onStart);
    assert(plugin.callInfo.handlerNames.onHandleConfig);
    assert(plugin.callInfo.handlerNames.onHandleCode);
    assert(plugin.callInfo.handlerNames.onHandleCodeParser);
    assert(plugin.callInfo.handlerNames.onHandleAST);
    assert(plugin.callInfo.handlerNames.onHandleTag);
    assert(plugin.callInfo.handlerNames.onHandleHTML);
    assert(plugin.callInfo.handlerNames.onComplete);
    assert.deepEqual(plugin.callInfo.option, {foo: 1});
    assert.equal(plugin.callInfo.usedParser, true);
  });

  it('custom document by each handlers', ()=>{
    const doc = readDoc('index.html');

    assert.includes(doc, 'head title', 'Modified Config');
    assert.includes(doc, '.navigation', 'MyClass_ModifiedCode_ModifiedAST_ModifiedTag_ModifiedHTML');
    assert.includes(doc, 'head meta[name="x-from-plugin"]', 'fileName:', 'content');
  });

  it('call multi plugins', ()=>{
    const pluginPath = path.resolve('./test/fixture/plugin/MyPlugin1.js');
    const plugin = require(pluginPath);

    assert.deepEqual(plugin.callInfo.handlerNames.onStart, ['MyPlugin1', 'MyPlugin2']);
    assert.deepEqual(plugin.callInfo.handlerNames.onHandleConfig, ['MyPlugin1', 'MyPlugin2']);
    assert.deepEqual(plugin.callInfo.handlerNames.onHandleCode, ['MyPlugin1', 'MyPlugin2']);
    assert.deepEqual(plugin.callInfo.handlerNames.onHandleCodeParser, ['MyPlugin1', 'MyPlugin2']);
    assert.deepEqual(plugin.callInfo.handlerNames.onHandleAST, ['MyPlugin1', 'MyPlugin2']);
    assert.deepEqual(plugin.callInfo.handlerNames.onHandleTag, ['MyPlugin1', 'MyPlugin2']);
    assert.deepEqual(plugin.callInfo.handlerNames.onHandleHTML, ['MyPlugin1', 'MyPlugin2']);
    assert.deepEqual(plugin.callInfo.handlerNames.onComplete, ['MyPlugin1', 'MyPlugin2']);
  });
});
