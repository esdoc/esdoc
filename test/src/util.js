import _assert from 'assert';
import fs from 'fs';
import path from 'path';
import cheerio from 'cheerio';

export function getEsdoc() {
  return fs.readFileSync(`./test/fixture/esdoc.json`, {encoding: 'utf-8'});
}

export function readDoc(fileName, dirName = 'esdoc') {
  let html = fs.readFileSync(`./test/fixture/${dirName}/${fileName}`, {encoding: 'utf-8'});
  let $ = cheerio.load(html);
  return $('html').first();
}

export function find($el, selector, callback) {
  let $els = $el.find(selector);
  if (!$els.length) assert(false, `node is not found. selector = "${selector}"`);
  if ($els.length !== 1) assert(false, `many nodes are found. selector = "${selector}"`);

  callback($els.first());
}

function getActual($el, selector, attr) {
  let $target;
  if (selector) {
    let $els = $el.find(selector);
    if (!$els.length) assert(false, `node is not found. selector = "${selector}"`);
    if ($els.length !== 1) assert(false, `many nodes are found. selector = "${selector}"`);
    $target = $els.first();
  } else {
    $target = $el
  }

  if (!$target.length) {
    assert(false, `node is not found. selector = "${selector}"`);
  }

  let actual;
  if (attr) {
    actual = $target.attr(attr);
  } else {
    actual = $target.text().replace(/\s+/g, ' ');
  }

  if (actual === null) {
    assert(false, `actual is null. selector = ${selector}, attr = ${attr}`);
  }

  return actual;
}

_assert.includes = function($el, selector, expect, attr) {
  let actual = getActual($el, selector, attr);
  assert(actual.includes(expect) === true, `selector: "${selector}",\nactual: ${actual}\nexpect: ${expect}`);
};

_assert.notIncludes = function($el, selector, expect, attr) {
  let actual = getActual($el, selector, attr);
  assert(actual.includes(expect) === false, `selector: "${selector}"`);
};

export var assert = _assert;

const consoleLog = console.log;
export function consoleLogSwitch(on) {
  if (on) {
    console.log = consoleLog;
  } else {
    console.log = ()=>{};
  }
}
