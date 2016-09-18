import {assert, cli, consoleLogSwitch} from '../../util.js';

/**
 * @test {ESDocCLI#exec}
 * @test {ESDocCLI#_createConfigFromJSONFile}
 */
describe('test cli', ()=>{
  it('can execute with config file.', ()=>{
    consoleLogSwitch(false);
    cli('./test/fixture/esdoc-cli.json');
    consoleLogSwitch(true);
    assert(true);
  });
});
