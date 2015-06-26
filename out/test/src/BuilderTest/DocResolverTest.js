'use strict';

var _utilJs = require('./../util.js');

/** @test {DocResolver} */
describe('DocResolver:', function () {
  var docMyClass7 = (0, _utilJs.readDoc)('class/src/MyClass.js~MyClass7.html');
  var docMyClass8 = (0, _utilJs.readDoc)('class/src/MyClass.js~MyClass8.html');

  /** @test {DocResolver#_resolveIgnore} */
  it('does not ignore identifier that does not have @ignore.', function () {
    // MyClass7
    _utilJs.assert.includes(docMyClass7, '.self-detail [data-ice="name"]', 'MyClass7');
    (0, _utilJs.find)(docMyClass7, 'table[data-ice="summary"]:nth-of-type(1)', function (doc) {
      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public method1() this is method1 desc.');
    });

    // MyClass8
    _utilJs.assert.includes(docMyClass8, '.self-detail [data-ice="name"]', 'MyClass8');
    (0, _utilJs.find)(docMyClass8, 'table[data-ice="summary"]:nth-of-type(1)', function (doc) {
      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public method1() this is method1 desc.');
    });
  });

  /** @test {DocResolver#_resolveIgnore} */
  it('ignores identifier that have @ignore.', function () {
    try {
      (0, _utilJs.readDoc)('class/src/MyClass.js~MyClass999.html');
    } catch (e) {
      (0, _utilJs.assert)(e instanceof Error);
      (0, _utilJs.assert)(e.message.includes('no such file or directory'));
      return;
    }
    (0, _utilJs.assert)(false, 'unreachable');
  });
});