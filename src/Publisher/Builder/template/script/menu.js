(function() {
  var classList = document.body.classList;
  function toggleHandler(selector, className){
    var triggers = document.querySelectorAll(selector);
    for (var i = 0; i < triggers.length; i++) {
      triggers[i].addEventListener('click', function(e){
        e.preventDefault();
        classList[classList.contains(className) ? 'remove' : 'add'](className);
      });
    }
  }
  toggleHandler('.esdoc-toggle-nav', 'esdoc-nav-open');
  toggleHandler('.esdoc-toggle-links', 'esdoc-links-open');

  // close the navigation when click on a link.
  document.querySelector('#esdoc-layout > nav').addEventListener('click', function(e){
    if (e.target.nodeName.toLowerCase() === 'a') {
      classList.remove('esdoc-nav-open');
    }
  });
})();
