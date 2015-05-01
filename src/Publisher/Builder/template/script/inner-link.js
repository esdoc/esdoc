// inner link(#foo) can not correctly scroll, because page has fixed header,
// so, I manually scroll.
(function(){
  window.addEventListener('hashchange', function(evt){
    window.scrollBy(0, -55);
  });

  if (location.hash) {
    setTimeout(function(){
      window.scrollBy(0, -55);
    }, 0);
  }
})();
