import path from 'path';
import ESDocCLI from '../../../src/ESDocCLI.js';
import {readDoc, assert, find, consoleLogSwitch} from '../util.js';

/** @test {EmptyType} */
describe('EmptyType:', ()=>{
  it('error for empty types is useful', ()=>{
    const cliPath = path.resolve('./src/cli.js');
    const configPath = path.resolve('./test/fixture/empty-type.json');
    const argv = ['node', cliPath, '-c', configPath];
    const cli = new ESDocCLI(argv);

    consoleLogSwitch(false);
    try {
      cli.exec();
    }
    catch (e) {
      assert.equal(e.message, 'Empty Type found name=null desc=Empty Type Error 1', 'Empty types should have meaningful error messages.');
    }
    consoleLogSwitch(true);
  });
});
