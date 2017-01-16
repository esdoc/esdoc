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
  toggleHandler('.navbar-burger', 'navigation-open');
  toggleHandler('.navbar-menu', 'menu-open');

  // close the navigation when click on a link.
  document.querySelector('.navigation').addEventListener('click', function(e){
    if (e.target.nodeName.toLowerCase() === 'a') {
      classList.remove('navigation-open');
    }
  });
})();
