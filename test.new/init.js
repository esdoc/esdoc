import fs from 'fs';
import path from 'path';
import ESDocCLI from '../src/ESDocCLI.js';

export function cli(configPath) {
  const cliPath = path.resolve('./src/cli.js');
  const argv = ['node', cliPath];

  if (configPath) {
    configPath = path.resolve(configPath);
    argv.push('-c', configPath);
    console.log(`== start == ${configPath}`);
  }

  const cli = new ESDocCLI(argv);
  cli.exec();
  console.log(`== finish ==`);
}

cli('./test.new/esdoc.json');
global.docs = JSON.parse(fs.readFileSync('./test.new/out/index.json').toString());
