import {readDoc, assert, find} from './../util.js';

/** @test {ASTUtil} */
describe('ASTUtil:', ()=> {
  /** @test {ASTUtil.traverse} */
  it('can traverse React JSX.', ()=> {
    let doc = global.db.find({name: 'TestJSXDefinition'})[0];
    assert.equal(doc.name, 'TestJSXDefinition');
  });
});
