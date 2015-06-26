'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.shorten = shorten;
exports.markdown = markdown;
exports.dateForUTC = dateForUTC;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _marked = require('marked');

var _marked2 = _interopRequireDefault(_marked);

/**
 * shorten description.
 * e.g. ``this is JavaScript. this is Java.`` => ``this is JavaScript.``.
 *
 * @param {DocObject} doc - target doc object.
 * @returns {string} shorten description.
 * @todo shorten before process markdown.
 */

function shorten(doc) {
  if (!doc) return '';

  if (doc.summary) return doc.summary;

  var desc = doc.description;
  if (!desc) return '';

  var len = desc.length;
  var inSQuote = false;
  var inWQuote = false;
  var inCode = false;
  for (var i = 0; i < desc.length; i++) {
    var char1 = desc.charAt(i);
    var char2 = desc.charAt(i + 1);
    var char4 = desc.substr(i, 6);
    var char5 = desc.substr(i, 7);
    if (char1 === '\'') inSQuote = !inSQuote;else if (char1 === '"') inWQuote = !inWQuote;else if (char4 === '<code>') inCode = true;else if (char5 === '</code>') inCode = false;

    if (inSQuote || inCode || inWQuote) continue;

    if (char1 === '.') {
      if (char2 === ' ' || char2 === '\n' || char2 === '<') {
        len = i + 1;
        break;
      }
    } else if (char1 === '\n') {
      len = i + 1;
      break;
    }
  }

  return desc.substr(0, len);
}

/**
 * convert markdown text to html.
 * @param {string} text - markdown text.
 * @param {boolean} [breaks=false] if true, break line. FYI gfm is not breaks.
 * @return {string} html.
 */

function markdown(text) {
  var breaks = arguments[1] === undefined ? false : arguments[1];

  var compiled = (0, _marked2['default'])(text, {
    gfm: true,
    tables: true,
    breaks: breaks,
    highlight: function highlight(code) {
      return '<pre class="source-code"><code class="prettyprint">' + code + '</code></pre>';
    }
  });

  return compiled;
}

/**
 * get UTC date string.
 * @param {Date} date - target date object.
 * @returns {string} UTC date string(yyyy-mm-dd hh:mm:ss)
 */

function dateForUTC(date) {
  function pad(num, len) {
    var count = Math.max(0, len - ('' + num).length);
    return '0'.repeat(count) + num;
  }

  var year = date.getUTCFullYear();
  var month = pad(date.getUTCMonth() + 1, 2);
  var day = pad(date.getUTCDay() + 1, 2);
  var hours = pad(date.getUTCHours(), 2);
  var minutes = pad(date.getUTCMinutes(), 2);
  var seconds = pad(date.getUTCSeconds(), 2);

  return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds + ' (UTC)';
}