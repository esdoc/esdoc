'use strict';

var _utilJs = require('../util.js');

/** @test {ClassDoc} */
describe('ClassDoc:', function () {

  /** @test {ClassDoc#@extends} */
  it('can parse nested extend.', function () {
    var doc = global.db.find({ name: 'MyKiloClass' })[0];
    _utilJs.assert.equal(doc['extends'].length, 1);
    _utilJs.assert.equal(doc['extends'][0], 'tera~TeraClass.GigaClass.MegaClass');
  });
});