(function(){
  var searchIndex = window.esdocSearchIndex;
  var searchBox = document.querySelector('#esdoc-search-box');
  var input = document.querySelector('#esdoc-search-input').firstChild;
  var resultWrapper = document.querySelector('#esdoc-search-result');
  var result = resultWrapper.firstChild;
  var selectedIndex = -1;
  var prevText;

  // active search box and focus when mouse enter or when click on search box.
  searchBox.addEventListener('mouseenter', openBox);
  searchBox.addEventListener('click', openBox);

  // close search box when mouse leave on search box or when blur on input.
  searchBox.addEventListener('mouseleave', closeBox);
  input.addEventListener('blur', closeBox);

  function openBox(){
    searchBox.classList.add('active');
    // the `focus` works on Desktop when mouse enter and on Mobile when `click`.
    // the `focus` fails on Mobile when mouse enter, but a `blur` event is triggered!
    input.focus();
  }

  function closeBox(){
    input.value || searchBox.classList.remove('active');
  }

  // search with text when key is upped.
  input.addEventListener('keyup', function(ev){
    var text = ev.target.value.toLowerCase();
    if (!text) {
      resultWrapper.style.display = 'none';
      result.innerHTML = '';
      return;
    }

    if (text === prevText) return;
    prevText = text;

    var html = {class: [], method: [], member: [], function: [], variable: [], typedef: [], external: [], file: [], test: [], testFile: []};
    var len = searchIndex.length;
    var kind;
    for (var i = 0; i < len; i++) {
      var pair = searchIndex[i];
      if (pair[0].indexOf(text) !== -1) {
        kind = pair[3];
        html[kind].push('<li><a href="' + pair[1] + '">' + pair[2] + '</a></li>');
      }
    }

    var innerHTML = '';
    for (kind in html) {
      var list = html[kind];
      if (!list.length) continue;
      innerHTML += '<li class="search-separator">' + kind + '</li>\n' + list.join('\n');
    }
    result.innerHTML = innerHTML;
    if (innerHTML) resultWrapper.style.display = 'block';
    selectedIndex = -1;
  });

  // down, up and enter key are pressed, select search result.
  input.addEventListener('keydown', function(ev){
    if (ev.keyCode === 40) {
      // arrow down
      var current = result.children[selectedIndex];
      var selected = result.children[selectedIndex + 1];
      if (selected && selected.classList.contains('search-separator')) {
        var selected = result.children[selectedIndex + 2];
        selectedIndex++;
      }

      if (selected) {
        if (current) current.classList.remove('selected');
        selectedIndex++;
        selected.classList.add('selected');
      }
    } else if (ev.keyCode === 38) {
      // arrow up
      var current = result.children[selectedIndex];
      var selected = result.children[selectedIndex - 1];
      if (selected && selected.classList.contains('search-separator')) {
        var selected = result.children[selectedIndex - 2];
        selectedIndex--;
      }

      if (selected) {
        if (current) current.classList.remove('selected');
        selectedIndex--;
        selected.classList.add('selected');
      }
    } else if (ev.keyCode === 13) {
      // enter
      var current = result.children[selectedIndex];
      if (current) {
        var link = current.querySelector('a');
        if (link) location.href = link.href;
      }
    } else {
      return;
    }

    ev.preventDefault();
  });

  // select search result when search result is mouse over.
  var mousemove;
  result.addEventListener('mousemove', function(ev){
    // unselect when mouse move
    var current = result.children[selectedIndex];
    if (current) current.classList.remove('selected');
    clearTimeout(mousemove);
    mousemove = setTimeout(function(){
      var li = ev.target;
      while (li) {
        if (li.nodeName === 'LI') break;
        li = li.parentElement;
      }

      // select when mouse stop
      if (li) {
        selectedIndex = Array.prototype.indexOf.call(result.children, li);
        li.classList.add('selected');
      }
    }, 25);
  });

  // clear search result when body is clicked.
  document.body.addEventListener('click', function(ev){
    selectedIndex = -1;
    resultWrapper.style.display = 'none';
    result.innerHTML = '';
  });

})();
