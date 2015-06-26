'use strict';

var _utilJs = require('./../util.js');

/** @test {FileDocBuilder} */
describe('MyClass.js.html:', function () {
  var doc = (0, _utilJs.readDoc)('file/src/MyClass.js.html');

  /**
   * @test {FileDocBuilder#exec}
   * @test {FileDocBuilder#_buildFileDoc}
   */
  it('has source code.', function () {
    _utilJs.assert.includes(doc, 'body [data-ice="title"]', 'src/MyClass.js');
    _utilJs.assert.includes(doc, 'code[data-ice="content"]', 'export default class MyClass1 extends SuperMyClass1');
  });
});