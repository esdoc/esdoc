import marked from 'marked';

export function shorten(doc) {
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
    if (char1 === "'") inSQuote = !inSQuote;
    else if (char1 === '"') inWQuote = !inWQuote;
    else if (char4 === '<code>') inCode = true;
    else if (char5 === '</code>') inCode = false;

    if (inSQuote || inCode || inWQuote) continue;

    if (char1 === '.') {
      if (char2 === ' ' || char2 === '\n') {
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

export function markdown(text) {
  let compiled = marked(text, {
    gfm: true,
    tables: true,
    highlight: function (code) {
      return `<pre class="source-code"><code class="prettyprint">${code}</code></pre>`;
    }
  });

  return compiled;
}
