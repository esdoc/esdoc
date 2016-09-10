import {readDoc, assert} from './../../util.js';

/** @test {AbstractDoc#@example} */
describe('TestExampleCaption', ()=> {
  const doc = readDoc('class/src/Example/Caption.js~TestExampleCaption.html');

  describe('in self detail', ()=> {
    it('has caption of example.', ()=> {
      assert.includes(doc, '.self-detail [data-ice="exampleDoc"] [data-ice="exampleCaption"]', 'this is caption');
    });
  });
});
