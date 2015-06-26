'use strict';

var _utilJs = require('../util.js');

/** @test {AbstractDoc} */
describe('AbstractDoc:', function () {

  /** @test {AbstractDoc#@unknown} */
  it('has unknown tag.', function () {
    var doc = global.db.find({ name: 'MyClass1' })[0];
    _utilJs.assert.equal(doc.unknown.length, 1);
    _utilJs.assert.equal(doc.unknown[0].tagName, '@foobar');
    _utilJs.assert.equal(doc.unknown[0].tagValue, 'this is unknown tag.');
  });

  /** @test {AbstractDoc#@undocument} */
  it('has undocument tag.', function () {
    var doc = undefined;

    doc = global.db.find({ name: 'method5', undocument: true })[0];
    _utilJs.assert.equal(doc.undocument, true);

    doc = global.db.find({ name: 'method6', undocument: true })[0];
    _utilJs.assert.equal(doc.undocument, true);
  });
});