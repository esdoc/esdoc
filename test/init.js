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

  return cli.exec()
}

export default cli('./test/integration-test/esdoc.json').then(() => {
  console.log(`== finish ==`);   
  global.docs = JSON.parse(fs.readFileSync('./test/integration-test/out/index.json').toString());  
}).catch((e) => {
  console.log('CATCH CLI CATCH ', e);
});



