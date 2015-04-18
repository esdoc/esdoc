import assert from 'power-assert';
import fs from 'fs-extra';
import path from 'path';
import ESDocCLI from '../../../src/cli.js';

describe('ESDocCLI:', ()=>{
  it('can execute with config file.', ()=>{
    let cliPath = path.resolve('./src/cli.js');
    let configPath = path.resolve('./test/fixture/esdoc.json');
    let argv = ['node', cliPath, '-c', configPath];
    let cli = new ESDocCLI(argv);
    cli.exec();
    assert(true);
  });

  it('can execute with directory path', ()=>{
    let cliPath = path.resolve('./src/cli.js');
    let dirPath = path.resolve('./test/fixture/src');
    let argv = ['node', cliPath, dirPath];
    let cli = new ESDocCLI(argv);
    cli.exec();
    fs.removeSync('./_esdoc_');
    assert(true);
  });
});
