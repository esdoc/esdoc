(function() {
  var bodyCss = document.querySelector('body').classList;
  var className = 'navigation-open';
  document.querySelector('.navigation-burger').addEventListener('click', function (e) {
    e.preventDefault();
    bodyCss[bodyCss.contains(className) ? 'remove' : 'add'](className);
  });
})();