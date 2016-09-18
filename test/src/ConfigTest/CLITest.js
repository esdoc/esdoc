import path from 'path';
import {consoleLogSwitch} from '../util.js';
import ESDocCLI from '../../../src/ESDocCLI.js';

/**
 * @test {ESDocCLI#exec}
 * @test {ESDocCLI#_createConfigFromJSONFile}
 */
describe('test cli', ()=>{
  const cliPath = path.resolve('./src/cli.js');
  const configPath = path.resolve('./test/fixture/config/esdoc-cli.json');

  it('can execute with config file.', ()=>{
    const argv = ['node', cliPath, '-c', configPath];
    const cli = new ESDocCLI(argv);

    consoleLogSwitch(false);
    cli.exec();
    consoleLogSwitch(true);
  });

  it('can show help', ()=>{
    const argv = ['node', cliPath, '-c', configPath];
    const cli = new ESDocCLI(argv);

    consoleLogSwitch(false);
    cli._showHelp();
    consoleLogSwitch(true);
  });

  it('can show version', ()=>{
    const argv = ['node', cliPath, '-c', configPath];
    const cli = new ESDocCLI(argv);

    consoleLogSwitch(false);
    cli._showVersion();
    consoleLogSwitch(true);
  });
});
