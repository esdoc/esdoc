import {getEsdoc, readDoc, assert, find} from './../util.js';

let m = JSON.parse( getEsdoc() ).manual;

/** @test {ManualDocBuilder} */
describe('Manual:', ()=>{

  it('has manual link in header', ()=>{
    const doc = readDoc('index.html');
    assert.includes(doc, '[data-ice="manualHeaderLink"]', 'Manual');
    assert.includes(doc, '[data-ice="manualHeaderLink"]', './manual/index.html', 'href');
  });

  /** @test {ManualDocBuilder#_buildManualNav} */
  it('has manual navigation', ()=>{
    const doc = readDoc('manual/index.html');

    var i = 1;
    for (var file in m) {
      if (file != 'asset') {

        let label = file.charAt(0).toUpperCase() + file.slice(1);
        let f = file.split('.')[0]+'.html';

        find(doc, '[data-ice="nav"]', (doc)=>{
          assert.includes(doc, '[data-ice="manual"]:nth-of-type('+i+')', ''+label);
          assert.includes(doc, '[data-ice="manual"]:nth-of-type('+i+') .manual-toc-title a', 'manual/'+f, 'href');
        });

        i++;
      }
    }

  });

  /** @test {ManualDocBuilder#_buildManualIndex} */
  it('has each heading tags', ()=>{
    const doc = readDoc('manual/index.html');

    var i = 1;
    for (var file in m) {
      if (file != 'asset') {

        let label = file.charAt(0).toUpperCase() + file.slice(1);
        let f = file.split('.')[0]+'.html';

        find(doc, '.content [data-ice="manual"]:nth-of-type('+i+')', (doc)=>{
          assert.includes(doc, '.manual-toc-title', label);
        });

        i++;
      }
    }

  });

  /** @test {ManualDocBuilder#_buldManual} */
  it('has overview', ()=>{
    const doc = readDoc('manual/overview.html');
    assert.includes(doc, '.github-markdown h1', 'Overview');
    assert.includes(doc, '.github-markdown [data-ice="content"]', 'ESDoc is a documentation generator for JavaScript(ES6).');
  });

  /** @test {ManualDocBuilder#_buldManual} */
  it('has installation', ()=>{
    const doc = readDoc('manual/installation.html');
    assert.includes(doc, '.github-markdown h1', 'Installation');
    assert.includes(doc, '.github-markdown [data-ice="content"]', 'npm install -g esdoc');
  });

  /** @test {ManualDocBuilder#_buldManual} */
  it('has usage', ()=>{
    const doc = readDoc('manual/usage.html');
    assert.includes(doc, '.github-markdown h1:nth-of-type(1)', 'Usage');
    assert.includes(doc, '.github-markdown [data-ice="content"]', 'esdoc -c esdoc.json');
  });

  /** @test {ManualDocBuilder#_buldManual} */
  it('has tutorial', ()=>{
    const doc = readDoc('manual/tutorial.html');
    assert.includes(doc, '.github-markdown h1', 'Tutorial');
    assert.includes(doc, '.github-markdown [data-ice="content"]', 'this is tutorial');
  });

  /** @test {ManualDocBuilder#_buldManual} */
  it('has configuration', ()=>{
    const doc = readDoc('manual/configuration.html');
    assert.includes(doc, '.github-markdown h1', 'Configuration');
    assert.includes(doc, '.github-markdown [data-ice="content"]', 'this is configuration');
  });

  /** @test {ManualDocBuilder#_buldManual} */
  it('has example', ()=>{
    const doc = readDoc('manual/example.html');
    assert.includes(doc, '.github-markdown h1', 'Example');
    assert.includes(doc, '.github-markdown [data-ice="content"] h2:nth-of-type(1)', 'Minimum Config');
  });

  /** @test {ManualDocBuilder#_buldManual} */
  it('has faq', ()=>{
    const doc = readDoc('manual/faq.html');
    assert.includes(doc, '.github-markdown h1', 'FAQ');
    assert.includes(doc, '.github-markdown [data-ice="content"]', 'ESDoc has two goals.');
  });

  /** @test {ManualDocBuilder#_buldManual} */
  it('has changelog', ()=>{
    const doc = readDoc('manual/changelog.html');
    assert.includes(doc, '.github-markdown h1', 'Changelog');
    assert.includes(doc, '.github-markdown [data-ice="content"] h2:nth-of-type(1)', '0.0.1');
  });
});
