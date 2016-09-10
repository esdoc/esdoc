import {readDoc} from './../../util.js';

/** @test {DocResolver#_resolveNecessary} */
describe('TestExportExtendsInner', ()=> {
  it('is documented.', ()=> {
    readDoc('class/src/Export/Extends.js~TestExportExtendsInner.html');
  });
});
