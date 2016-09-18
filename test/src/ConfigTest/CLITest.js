import {assert, cli} from '../util.js';

/**
 * @test {ESDocCLI#exec}
 * @test {ESDocCLI#_createConfigFromJSONFile}
 */
describe('test cli', ()=>{
  it('can execute with config file.', ()=>{
    cli('./test/fixture-config/esdoc-cli.json');
    assert(true);
  });
});
