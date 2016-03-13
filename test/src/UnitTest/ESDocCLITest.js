import assert from 'assert';
import fs from 'fs-extra';
import path from 'path';
import ESDocCLI from '../../../src/ESDocCLI.js';
import {consoleLogSwitch} from '../util.js';

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
    consoleLogSwitch(false);
    cli.exec();
    consoleLogSwitch(true);
    assert(true);
  });

  /**
   * @test {ESDocCLI#_getLocalConfigFilePath}
   */
  it('can find project root `esdoc.json` file.', ()=>{
    let cliPath = path.resolve('./src/cli.js');
    let argv = ['node', cliPath];
    let cli = new ESDocCLI(argv);
    assert(cli._getLocalConfigFilePath() === path.resolve('esdoc.json'));
  });

  /**
   * @test {ESDocCLI#exec}
   * @test {ESDocCLI#_getLocalConfigFilePath}
   */
  it('can execute with esdoc.json file.', ()=>{
    let cliPath = path.resolve('./src/cli.js');
    let rcFileDir = path.resolve('test', 'fixture', 'rcfiles', 'ConfigJSON');
    let argv = ['node', cliPath, '--rcdir', rcFileDir];
    let cli = new ESDocCLI(argv);
    consoleLogSwitch(false);
    cli.exec();
    consoleLogSwitch(true);
    assert(true);
  });

  /**
   * @test {ESDocCLI#exec}
   * @test {ESDocCLI#_getLocalConfigFilePath}
   */
  it('can execute with .esdocrc.js file.', ()=>{
    let cliPath = path.resolve('./src/cli.js');
    let rcFileDir = path.resolve('test', 'fixture', 'rcfiles', 'RcJS');
    let argv = ['node', cliPath, '--rcdir', rcFileDir];
    let cli = new ESDocCLI(argv);
    consoleLogSwitch(false);
    cli.exec();
    consoleLogSwitch(true);
    assert(true);
  });

  /**
   * @test {ESDocCLI#exec}
   * @test {ESDocCLI#_getLocalConfigFilePath}
   */
  it('can execute with .esdocrc.json file.', ()=>{
    let cliPath = path.resolve('./src/cli.js');
    let rcFileDir = path.resolve('test', 'fixture', 'rcfiles', 'RcJSON');
    let argv = ['node', cliPath, '--rcdir', rcFileDir];
    let cli = new ESDocCLI(argv);
    consoleLogSwitch(false);
    cli.exec();
    consoleLogSwitch(true);
    assert(true);
  });

  /**
   * @test {ESDocCLI#exec}
   * @test {ESDocCLI#_getLocalConfigFilePath}
   */
  it('can execute with .esdocrc file.', ()=>{
    let cliPath = path.resolve('./src/cli.js');
    let rcFileDir = path.resolve('test', 'fixture', 'rcfiles', 'RcLegacy');
    let argv = ['node', cliPath, '--rcdir', rcFileDir];
    let cli = new ESDocCLI(argv);
    consoleLogSwitch(false);
    cli.exec();
    consoleLogSwitch(true);
    assert(true);
  });
});
