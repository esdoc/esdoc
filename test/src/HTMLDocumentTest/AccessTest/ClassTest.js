import {readDoc, assert} from './../../util.js';

/** @test {ClassDocBuilder} */
describe('TestAccessClass:', ()=> {

  describe('in header:', ()=>{
    /** @test {ClassDocBuilder#_buildClassDoc} */
    it('has public accessor.', ()=> {
      const doc = readDoc('class/src/Access/Class.js~TestAccessClassPublic.html');
      assert.includes(doc, '.header-notice [data-ice="access"]', 'public');
    });

    /** @test {ClassDocBuilder#_buildClassDoc} */
    it('has protected accessor.', ()=> {
      const doc = readDoc('class/src/Access/Class.js~TestAccessClassProtected.html');
      assert.includes(doc, '.header-notice [data-ice="access"]', 'protected');
    });

    /** @test {ClassDocBuilder#_buildClassDoc} */
    it('has private accessor.', ()=> {
      const doc = readDoc('class/src/Access/Class.js~TestAccessClassPrivate.html');
      assert.includes(doc, '.header-notice [data-ice="access"]', 'private');
    });

    /** @test {ClassDocBuilder#_buildClassDoc} */
    it('has auto private accessor.', ()=> {
      const doc = readDoc('class/src/Access/Class.js~_TestAccessClassAutoPrivate.html');
      assert.includes(doc, '.header-notice [data-ice="access"]', 'private');
    });
  });
});
