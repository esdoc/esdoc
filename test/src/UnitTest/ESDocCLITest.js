import assert from 'assert';
import fs from 'fs-extra';
import path from 'path';
import ESDocCLI from '../../../src/ESDocCLI.js';

/** @test {ESDocCLI} */
describe('ESDocCLI:', ()=>{

  /**
   * @test {ESDocCLI#exec}
   * @test {ESDocCLI#_createConfigFromJSONFile}
   */
  it('can execute with config file.', ()=>{
    let cliPath = path.resolve('./src/cli.js');
    let configPath = path.resolve('./test/fixture/esdoc-cli.json');
    let argv = ['node', cliPath, '-c', configPath];
    let cli = new ESDocCLI(argv);
    cli.exec();
    assert(true);
  });
});
