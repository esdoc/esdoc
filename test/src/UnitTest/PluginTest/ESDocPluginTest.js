import path from 'path';
import ESDocCLI from '../../../../src/ESDocCLI.js';
import {readDoc, assert, find, consoleLogSwitch} from '../../util.js';

/** @test {Plugin} */
describe('Plugin:', ()=>{
  it('use plugin without error', ()=>{
    const cliPath = path.resolve('./src/cli.js');
    const configPath = path.resolve('./test/fixture/esdoc-plugin.json');
    const argv = ['node', cliPath, '-c', configPath];
    const cli = new ESDocCLI(argv);

    consoleLogSwitch(false);
    cli.exec();
    consoleLogSwitch(true);
  });

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
    const doc = readDoc('index.html', './test/fixture/esdoc-plugin');

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
