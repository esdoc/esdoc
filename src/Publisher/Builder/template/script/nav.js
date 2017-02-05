{
  document.querySelector('#openNav').addEventListener('click', ()=>{
    const els = Array.from(document.querySelectorAll('nav li:not([data-in-root="true"]) > *'));
    for (const el of els) {
      el.style.display = null;
    }
  });

  document.querySelector('#closeNav').addEventListener('click', ()=>{
    const els = Array.from(document.querySelectorAll('nav li:not([data-in-root="true"]) > *'));
    let lastDirPath = null;
    for (const el of els) {
      if (el.classList.contains('nav-dir-path')) {
        const dirPath = `${el.textContent}/`;
        if (dirPath.indexOf(lastDirPath) === 0) {
          el.style.display = 'none';
        } else {
          lastDirPath = dirPath;
        }
      } else {
        el.style.display = 'none';
      }
    }
  });

  const dirPathEls = Array.from(document.querySelectorAll('nav li > .nav-dir-path'));
  for (const el of dirPathEls) {
    el.addEventListener('click', (ev)=>{
      let targetEl = ev.target.parentElement;
      const lastDirPath = ev.target.textContent + '/';
      let display = ev.target.nextElementSibling.style.display === 'none' ? null : 'none';
      const dirPathDisplay = display;
      while(1) {
        for (const el of Array.from(targetEl.children)) {
          if (el.classList.contains('nav-dir-path')) {
            el.style.display = dirPathDisplay;
          } else {
            el.style.display = display;
          }
        }

        targetEl = targetEl.nextElementSibling;
        if (!targetEl) {
          break;
        }
        else if (targetEl.querySelector('.nav-dir-path')) {
          const dirPath = targetEl.querySelector('.nav-dir-path').textContent;
          if (`${dirPath}/`.indexOf(lastDirPath) === 0) {
            display = 'none';
          } else {
            break;
          }
        }
      }

      ev.target.style.display = null;
    });
  }
}
