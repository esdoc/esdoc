const cheerio = require('cheerio');

exports.onHandleHTML = function(ev) {
  const $ = cheerio.load(ev.data.html);

  // title
  $('head title').text('ESDoc - Good Documentation for JavaScript');

  // header
  const $header = $('body > header');
  $header.html(`
    <a href="./" class="logo"><img src="./manual/asset/image/logo.png"/></a>
    <a href="./" class="brand">ESDoc</a>
    <ul>
      <li><a href="./manual/usage/usage.html">Usage</a></li>
      <li><a href="./manual/usage/feature.html">Features</a></li>
      <li><a href="./manual/configuration/config.html">Config</a></li>
      <li><a href="./manual/usage/tags.html">Tags</a></li>
      <li><a href="./manual/advanced/api.html">API</a></li>
      <li><a href="./manual/changelog/changelog.html">Releases</a></li>
      <li><a href="./manual/faq/faq.html">FAQ</a></li>
    </ul>
    <a href="https://github.com/esdoc/esdoc" class="github"><img src="./manual/asset/image/github.png"/></a>
  `);

  // remove unnecessary scripts
  const scripts = ['script/search_index.js', 'script/search.js', 'script/inherited-summary.js', 'script/test-summary.js', 'script/inner-link.js'];
  for (const script of scripts) {
    $(`script[src="${script}"]`).remove();
  }

  // footer
  $('body > footer').html(`© 2016 <a href="https://twitter.com/h13i32maru">Ryo Maruyama</a>. All rights reserved.`);

  // changelog
  $('#changelog').text('Releases');

  // result
  ev.data.html = $.html();
};
