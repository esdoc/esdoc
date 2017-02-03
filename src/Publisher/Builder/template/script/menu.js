(function() {
  // body class list
  var classList = document.body.classList;

  // class name toggler
  function toggle(e, toggleName, removeName){
    e.preventDefault();
    classList[classList.contains(toggleName) ? 'remove' : 'add'](toggleName);
    classList.remove(removeName);
  }

  // event delegation handler
  document.body.addEventListener('click', function(e){
    if (e.target.classList.contains('esdoc-toggle-nav')) {
      toggle(e, 'esdoc-nav-open', 'esdoc-links-open');
    } else if(e.target.classList.contains('esdoc-toggle-links')) {
      toggle(e, 'esdoc-links-open', 'esdoc-nav-open');
    }
  });

  // close navigation when click on link (usefull for anchor).
  document.querySelector('#esdoc-layout > aside').addEventListener('click', function(e){
    if (e.target.nodeName.toLowerCase() === 'a') {
      classList.remove('esdoc-nav-open');
    }
  });
})();
