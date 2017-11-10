import ESDocCLI from '../../src/ESDocCLI';
import process from 'process';
import fs from 'fs';
import assert from 'assert';
import path from 'path';

describe('test ESDocCLI:', ()=>{
  describe('command option', ()=>{
    const orig = console.log;
    it('can show help', ()=>{
      const argv = [null, null];
      const cli = new ESDocCLI(argv);
      console.log = function(){};
      cli._showHelp();
      console.log = orig;
    });

    it('can show version', ()=>{
      const argv = [null, null];
      const cli = new ESDocCLI(argv);
      console.log = function(){};
      cli._showVersion();
      console.log = orig;
    });
  });

  describe('find configuration', ()=>{
    it('finds -c', ()=>{
      const cli = new ESDocCLI([null, null, '-c', 'esdoc2.json']);
      assert.equal(cli._findConfigFilePath(), 'esdoc2.json');
    });

    it('finds .esdoc2.json', ()=>{
      process.chdir('./test/');
      fs.writeFileSync('.esdoc2.json', 'dummy');
      const cli = new ESDocCLI([null, null]);
      assert.equal(cli._findConfigFilePath(), path.resolve('.esdoc2.json'));
      fs.unlinkSync('.esdoc2.json');
      process.chdir('../');
    });

    it('finds .esdoc2.js', ()=>{
      process.chdir('./test/');
      fs.writeFileSync('.esdoc2.js', 'dummy');
      const cli = new ESDocCLI([null, null]);
      assert.equal(cli._findConfigFilePath(), path.resolve('.esdoc2.js'));
      fs.unlinkSync('.esdoc2.js');
      process.chdir('../');
    });
  });
});
