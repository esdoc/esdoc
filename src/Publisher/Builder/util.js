import marked from 'marked';
import escape from 'escape-html';

/**
 * shorten description.
 * e.g. ``this is JavaScript. this is Java.`` => ``this is JavaScript.``.
 *
 * @param {DocObject} doc - target doc object.
 * @returns {string} shorten description.
 * @todo shorten before process markdown.
 */
export function shorten(doc) {
  if (!doc) return '';

  if (doc.summary) return doc.summary;

  let desc = doc.description;
  if (!desc) return '';

  let len = desc.length;
  let inSQuote = false;
  let inWQuote = false;
  let inCode = false;
  for (let i = 0; i < desc.length; i++) {
    let char1 = desc.charAt(i);
    let char2 = desc.charAt(i + 1);
    let char4 = desc.substr(i, 6);
    let char5 = desc.substr(i, 7);
    if (char1 === "'") inSQuote = !inSQuote;
    else if (char1 === '"') inWQuote = !inWQuote;
    else if (char4 === '<code>') inCode = true;
    else if (char5 === '</code>') inCode = false;

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
export function markdown(text, breaks = false) {
  let compiled = marked(text, {
    gfm: true,
    tables: true,
    breaks: breaks,
    highlight: function (code) {
      return `<pre class="source-code"><code class="prettyprint">${escape(code)}</code></pre>`;
    }
  });

  return compiled;
}

/**
 * get UTC date string.
 * @param {Date} date - target date object.
 * @returns {string} UTC date string(yyyy-mm-dd hh:mm:ss)
 */
export function dateForUTC(date) {
  function pad(num, len) {
    let count = Math.max(0, len - `${num}`.length);
    return '0'.repeat(count) + num;
  }

  let year = date.getUTCFullYear();
  let month = pad(date.getUTCMonth() + 1, 2);
  let day = pad(date.getUTCDay() + 1, 2);
  let hours = pad(date.getUTCHours(), 2);
  let minutes = pad(date.getUTCMinutes(), 2);
  let seconds = pad(date.getUTCSeconds(), 2);

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} (UTC)`;
}
