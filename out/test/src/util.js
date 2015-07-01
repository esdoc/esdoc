'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.readDoc = readDoc;
exports.find = find;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _assert2 = require('assert');

var _assert3 = _interopRequireDefault(_assert2);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

function readDoc(fileName) {
  //let html = fs.readFileSync(path.resolve(__dirname, `../jsdoc/${fileName}`), {encoding: 'utf-8'});
  var html = _fs2['default'].readFileSync('./test/fixture/esdoc/' + fileName, { encoding: 'utf-8' });
  var $ = _cheerio2['default'].load(html);
  return $('html').first();
}

function find($el, selector, callback) {
  var $els = $el.find(selector);
  if (!$els.length) assert(false, 'node is not found. selector = "' + selector + '"');
  if ($els.length !== 1) assert(false, 'many nodes are found. selector = "' + selector + '"');

  callback($els.first());
}

function getActual($el, selector, attr) {
  var $target = undefined;
  if (selector) {
    var $els = $el.find(selector);
    if (!$els.length) assert(false, 'node is not found. selector = "' + selector + '"');
    if ($els.length !== 1) assert(false, 'many nodes are found. selector = "' + selector + '"');
    $target = $els.first();
  } else {
    $target = $el;
  }

  if (!$target.length) {
    assert(false, 'node is not found. selector = "' + selector + '"');
  }

  var actual = undefined;
  if (attr) {
    actual = $target.attr(attr);
  } else {
    actual = $target.text().replace(/\s+/g, ' ');
  }

  if (actual === null) {
    assert(false, 'actual is null. selector = ' + selector + ', attr = ' + attr);
  }

  return actual;
}

_assert3['default'].includes = function ($el, selector, expect, attr) {
  var actual = getActual($el, selector, attr);
  assert(actual.includes(expect) === true, 'selector: "' + selector + '",\nactual: ' + actual + '\nexpect: ' + expect);
};

_assert3['default'].notIncludes = function ($el, selector, expect, attr) {
  var actual = getActual($el, selector, attr);
  assert(actual.includes(expect) === false, 'selector: "' + selector + '"');
};

var assert = _assert3['default'];
exports.assert = assert;