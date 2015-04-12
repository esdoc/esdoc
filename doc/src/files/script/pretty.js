(function(){
  var elms = document.querySelectorAll('.lang-json, .lang-javascript');
  for (var i = 0; i < elms.length; i++) {
    elms[i].className += ' prettyprint';
  }

  prettyPrint();
})();
