import _assert from 'assert';
import fs from 'fs';
import cheerio from 'cheerio';
import path from 'path';
import ESDocCLI from '../../src/ESDocCLI.js';

export function cli(configPath = null) {
  const cliPath = path.resolve('./src/cli.js');
  const argv = ['node', cliPath];

  if (configPath) {
    configPath = path.resolve(configPath);
    argv.push('-c', configPath);
    console.log(`process: ${configPath}`);
  }

  const cli = new ESDocCLI(argv);
  consoleLogSwitch(false);
  cli.exec();
  consoleLogSwitch(true);
}

export function readDoc(fileName, dirName = './test/fixture/dest/esdoc') {
  const html = fs.readFileSync(`${dirName}/${fileName}`, {encoding: 'utf-8'});
  const $ = cheerio.load(html);
  return $('html').first();
}

export function find($el, selector, callback) {
  const $els = $el.find(selector);
  if (!$els.length) _assert(false, `node is not found. selector = "${selector}"`);
  if ($els.length !== 1) _assert(false, `many nodes are found. selector = "${selector}"`);

  callback($els.first());
}

export function findParent($el, selector, parentSelector, callback) {
  find($el, selector, ($child)=>{
    const $parents = $child.parents(parentSelector);

    if (!$parents.length) _assert(false, `parent is not found. selector = "${parentSelector}"`);
    if ($parents.length !== 1) _assert(false, `many parents are found. selector = "${parentSelector}"`);

    callback($parents.first());
  });
}

function getActual($el, selector, attr) {
  let $target;
  if (selector) {
    const $els = $el.find(selector);
    if (!$els.length) _assert(false, `node is not found. selector = "${selector}"`);
    if ($els.length !== 1) _assert(false, `many nodes are found. selector = "${selector}"`);
    $target = $els.first();
  } else {
    $target = $el;
  }

  if (!$target.length) {
    _assert(false, `node is not found. selector = "${selector}"`);
  }

  let actual;
  if (attr) {
    actual = $target.attr(attr);
  } else {
    actual = $target.text().replace(/\s+/g, ' ');
  }

  if (actual === null) {
    _assert(false, `actual is null. selector = ${selector}, attr = ${attr}`);
  }

  return actual;
}

_assert.includes = function($el, selector, expect, attr) {
  const actual = getActual($el, selector, attr);
  _assert(actual.includes(expect) === true, `selector: "${selector}",\nactual: ${actual}\nexpect: ${expect}`);
};

_assert.multiIncludes = function($el, selector, expects, attr) {
  const $targets = $el.find(selector);
  if ($targets.length !== expects.length) _assert(false, `node length and expects length is mismatch. selector = "${selector}"`);

  for (let i = 0; i < $targets.length; i++) {
    const $target = $targets.eq(i);
    let actual;
    if (attr) {
      actual = $target.attr(attr);
    } else {
      actual = $target.text().replace(/\s+/g, ' ');
    }

    if (actual === null) {
      _assert(false, `actual is null. selector = ${selector}, attr = ${attr}`);
    }

    const expect = expects[i];
    _assert(actual.includes(expect) === true, `selector: "${selector}",\nactual: ${actual}\nexpect: ${expect}`);
  }
};

_assert.notIncludes = function($el, selector, expect, attr) {
  const actual = getActual($el, selector, attr);
  _assert(actual.includes(expect) === false, `selector: "${selector}"`);
};

_assert.notFound = function($el, selector) {
  if (selector) {
    const $els = $el.find(selector);
    if ($els.length) _assert(false, `node is found. selector = "${selector}"`);
  }
};

export const assert = _assert;

const consoleLog = console.log;
export function consoleLogSwitch(on) {
  if (on) {
    console.log = consoleLog;
  } else {
    console.log = ()=>{};
  }
}
