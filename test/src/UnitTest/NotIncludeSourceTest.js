import fs from 'fs-extra';
import path from 'path';
import ESDocCLI from '../../../src/ESDocCLI.js';
import {readDoc, assert, find, consoleLogSwitch} from '../util.js';

/** @test {publish} */
describe('Source code:', ()=>{
  it('use esdoc-non-source.json without error', ()=>{
    const cliPath = path.resolve('./src/cli.js');
    const configPath = path.resolve('./test/fixture/esdoc-non-source.json');
    const argv = ['node', cliPath, '-c', configPath];
    const cli = new ESDocCLI(argv);

    consoleLogSwitch(false);
    cli.exec();
    consoleLogSwitch(true);
  });

  it('doest not include source code.', ()=>{
    let doc = readDoc('file/src/MyClass.js.html', 'esdoc-non-source');
    assert.includes(doc, '[data-ice="content"]', 'Sorry, this documentation does not provide source code.');
    assert.notIncludes(doc, '[data-ice="content"]', 'class MyClass1');
  });
});
