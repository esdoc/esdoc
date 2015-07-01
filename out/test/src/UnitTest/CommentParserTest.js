'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _srcParserCommentParserJs = require('../../../src/Parser/CommentParser.js');

var _srcParserCommentParserJs2 = _interopRequireDefault(_srcParserCommentParserJs);

/** @test {CommentParser} */
describe('CommentParser:', function () {
  /** @test {CommentParser.parse} */
  it('can parse doc comment.', function () {
    var value = '*\n* this is desc.\n* @tag1\n* @tag2 tag2 value\n* @tag3 tag3 value\n* tag3 second value\n*\n* @tag4 tag4 value\n*\n';
    var comment = { type: 'Block', value: value };
    var tags = _srcParserCommentParserJs2['default'].parse(comment);
    _assert2['default'].equal(tags.length, 5);
    _assert2['default'].deepEqual(tags[0], { tagName: '@desc', tagValue: 'this is desc.' });
    _assert2['default'].deepEqual(tags[1], { tagName: '@tag1', tagValue: '' });
    _assert2['default'].deepEqual(tags[2], { tagName: '@tag2', tagValue: 'tag2 value' });
    _assert2['default'].deepEqual(tags[3], { tagName: '@tag3', tagValue: 'tag3 value\ntag3 second value' });
    _assert2['default'].deepEqual(tags[4], { tagName: '@tag4', tagValue: 'tag4 value' });
  });

  it('can parse doc comments with trailing tabs', function () {
    var value = '*\n\t* this is desc.\n\t* @tag1\n\t* @tag2 tag2 value\n\t* @tag3 tag3 value\n\t* tag3 second value\n\t*\n\t* @tag4 tag4 value\n\t*\n';
    var comment = { type: 'Block', value: value };
    var tags = _srcParserCommentParserJs2['default'].parse(comment);
    _assert2['default'].equal(tags.length, 5);
    console.log('tags', tags);
    _assert2['default'].deepEqual(tags[0], { tagName: '@desc', tagValue: 'this is desc.' });
    _assert2['default'].deepEqual(tags[1], { tagName: '@tag1', tagValue: '' });
    _assert2['default'].deepEqual(tags[2], { tagName: '@tag2', tagValue: 'tag2 value' });
    _assert2['default'].deepEqual(tags[3], { tagName: '@tag3', tagValue: 'tag3 value\ntag3 second value' });
    _assert2['default'].deepEqual(tags[4], { tagName: '@tag4', tagValue: 'tag4 value' });
  });

  /** @test {CommentParser.isESDoc} */
  it('return empty with non doc comment.', function () {
    var value = 'this is not doc comment.\n';
    var comment = { type: 'Block', value: value };
    var tags = _srcParserCommentParserJs2['default'].parse(comment);
    _assert2['default'].equal(tags.length, 0);
  });

  /** @test {CommentParser.parse} */
  it('return empty with line comment.', function () {
    var value = 'this is line comment.';
    var comment = { type: 'Line', value: value };
    var tags = _srcParserCommentParserJs2['default'].parse(comment);
    _assert2['default'].equal(tags.length, 0);
  });
});