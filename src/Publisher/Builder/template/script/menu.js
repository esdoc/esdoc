(function() {
  var classList = document.querySelector('body').classList;
  function toggleHandler(selector, className){
    var trigger = document.querySelector(selector);
    if (trigger){
      trigger.addEventListener('click', function(e){
        e.preventDefault();
        classList[classList.contains(className) ? 'remove' : 'add'](className);
      });
    }
  }
  toggleHandler('#esdoc-toggle-nav', 'esdoc-nav-open');
  toggleHandler('#esdoc-toggle-links', 'esdoc-links-open');

  // close the navigation when click on a link.
  document.querySelector('#esdoc-layout > nav').addEventListener('click', function(e){
    if (e.target.nodeName.toLowerCase() === 'a') {
      classList.remove('esdoc-nav-open');
    }
  });

})();
