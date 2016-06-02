'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shorten = shorten;
exports.markdown = markdown;
exports.dateForUTC = dateForUTC;
exports.parseExample = parseExample;

var _marked = require('marked');

var _marked2 = _interopRequireDefault(_marked);

var _escapeHtml = require('escape-html');

var _escapeHtml2 = _interopRequireDefault(_escapeHtml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * shorten description.
 * e.g. ``this is JavaScript. this is Java.`` => ``this is JavaScript.``.
 *
 * @param {DocObject} doc - target doc object.
 * @param {boolean} [asMarkdown=false] - is true, test as markdown and convert to html.
 * @returns {string} shorten description.
 * @todo shorten before process markdown.
 */
function shorten(doc) {
  var asMarkdown = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

  if (!doc) return '';

  if (doc.summary) return doc.summary;

  var desc = doc.descriptionRaw;
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
    if (char1 === "'") inSQuote = !inSQuote;else if (char1 === '"') inWQuote = !inWQuote;else if (char4 === '<code>') inCode = true;else if (char5 === '</code>') inCode = false;

    if (inSQuote || inCode || inWQuote) continue;

    if (char1 === '.') {
      if (char2 === ' ' || char2 === '\n' || char2 === '<') {
        len = i + 1;
        break;
      }
    } else if (char1 === '\n' && char2 === '\n') {
      len = i + 1;
      break;
    }
  }

  var result = desc.substr(0, len);
  if (asMarkdown) {
    result = markdown(result);
  }

  return result;
}

/**
 * convert markdown text to html.
 * @param {string} text - markdown text.
 * @param {boolean} [breaks=false] if true, break line. FYI gfm is not breaks.
 * @return {string} html.
 */
function markdown(text) {
  var breaks = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

  var availableTags = ['span', 'a', 'p', 'div', 'img', 'h1', 'h2', 'h3', 'h4', 'h5', 'br', 'hr', 'li', 'ul', 'ol', 'code', 'pre'];
  var availableAttributes = ['src', 'href', 'title', 'class', 'id', 'name', 'width', 'height'];

  var compiled = (0, _marked2.default)(text, {
    gfm: true,
    tables: true,
    breaks: breaks,
    sanitize: true,
    sanitizer: function sanitizer(tag) {
      if (tag.match(/<!--.*-->/)) {
        return tag;
      }
      var tagName = tag.match(/^<\/?(\w+)/)[1];
      if (!availableTags.includes(tagName)) {
        return (0, _escapeHtml2.default)(tag);
      }

      var sanitizedTag = tag.replace(/([\w\-]+)=(["'].*?["'])/g, function (_, attr, val) {
        if (!availableAttributes.includes(attr)) return '';
        if (val.indexOf('javascript:') !== -1) return '';
        return attr + '=' + val;
      });

      return sanitizedTag;
    },
    highlight: function highlight(code) {
      //return `<pre class="source-code"><code class="prettyprint">${escape(code)}</code></pre>`;
      return '<code class="source-code prettyprint">' + (0, _escapeHtml2.default)(code) + '</code>';
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

/**
 * parse ``@example`` value.
 * ``@example`` value can have ``<caption>`` tag.
 *
 * @param {string} example - target example value.
 * @returns {{body: string, caption: string}} parsed example value.
 */
function parseExample(example) {
  var body = example;
  var caption = '';

  var regexp = new RegExp("^<caption>(.*?)</caption>\n");
  var matched = example.match(regexp);
  if (matched) {
    body = example.replace(regexp, '');
    caption = matched[1].trim();
  }

  return { body: body, caption: caption };
}