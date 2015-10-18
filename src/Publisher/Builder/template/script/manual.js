(function(){
  var currentName = location.pathname.match(/([^/]*)\.html$/)[1];
  var cssClass = '.navigation [data-toc-name="' + currentName + '"]';
  var styleText = cssClass + ' .manual-toc { display: block; }\n';
  styleText += cssClass + ' .manual-toc-title { background-color: #039BE5; }\n';
  styleText += cssClass + ' .manual-toc-title a { color: white; }\n';
  var style = document.createElement('style');
  style.textContent = styleText;
  document.querySelector('head').appendChild(style);
})();
