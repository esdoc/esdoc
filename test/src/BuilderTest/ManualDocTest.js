import {readDoc, assert, find} from './../util.js';

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
    find(doc, '[data-ice="nav"]', (doc)=>{
      assert.includes(doc, '[data-ice="navItem"]:nth-of-type(1)', 'Overview');
      assert.includes(doc, '[data-ice="navItem"]:nth-of-type(2)', 'Installation');
      assert.includes(doc, '[data-ice="navItem"]:nth-of-type(3)', 'Usage');
      assert.includes(doc, '[data-ice="navItem"]:nth-of-type(4)', 'Tutorial');
      assert.includes(doc, '[data-ice="navItem"]:nth-of-type(5)', 'Configuration');
      assert.includes(doc, '[data-ice="navItem"]:nth-of-type(6)', 'Example');
      assert.includes(doc, '[data-ice="navItem"]:nth-of-type(7)', 'Reference');
      assert.includes(doc, '[data-ice="navItem"]:nth-of-type(8)', 'FAQ');
      assert.includes(doc, '[data-ice="navItem"]:nth-of-type(9)', 'Changelog');

      assert.includes(doc, '[data-ice="navItem"]:nth-of-type(1) a', 'manual/overview.html', 'href');
      assert.includes(doc, '[data-ice="navItem"]:nth-of-type(2) a', 'manual/installation.html', 'href');
      assert.includes(doc, '[data-ice="navItem"]:nth-of-type(3) a', 'manual/usage.html', 'href');
      assert.includes(doc, '[data-ice="navItem"]:nth-of-type(4) a', 'manual/tutorial.html', 'href');
      assert.includes(doc, '[data-ice="navItem"]:nth-of-type(5) a', 'manual/configuration.html', 'href');
      assert.includes(doc, '[data-ice="navItem"]:nth-of-type(6) a', 'manual/example.html', 'href');
      assert.includes(doc, '[data-ice="navItem"]:nth-of-type(7) a', 'identifiers.html', 'href');
      assert.includes(doc, '[data-ice="navItem"]:nth-of-type(8) a', 'manual/faq.html', 'href');
      assert.includes(doc, '[data-ice="navItem"]:nth-of-type(9) a', 'manual/changelog.html', 'href');
    });
  });

  /** @test {ManualDocBuilder#_buildManualIndex} */
  it('has each heading tags', ()=>{
    const doc = readDoc('manual/index.html');

    // overview
    find(doc, '[data-ice="manual"]:nth-of-type(1)', (doc)=>{
      assert.includes(doc, '.manual-toc-title', 'Overview');

      assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1)', 'Feature');
      assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(2)', 'Demo');
      assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(3)', 'License');
      assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(4)', 'Author');

      assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1) a', 'manual/overview.html#feature', 'href');
      assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(2) a', 'manual/overview.html#demo', 'href');
      assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(3) a', 'manual/overview.html#license', 'href');
      assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(4) a', 'manual/overview.html#author', 'href');
    });

    // installation
    find(doc, '[data-ice="manual"]:nth-of-type(2)', (doc)=>{
      assert.includes(doc, '.manual-toc-title', 'Installation');

      assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1)', 'indent 2');
      assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(2)', 'indent 3');
      assert.includes(doc, '.indent-h3[data-ice="manualNav"]:nth-of-type(3)', 'indent 4');
      assert.includes(doc, '.indent-h4[data-ice="manualNav"]:nth-of-type(4)', 'indent 5');

      assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1) a', 'manual/installation.html#indent-2', 'href');
      assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(2) a', 'manual/installation.html#indent-3', 'href');
      assert.includes(doc, '.indent-h3[data-ice="manualNav"]:nth-of-type(3) a', 'manual/installation.html#indent-4', 'href');
      assert.includes(doc, '.indent-h4[data-ice="manualNav"]:nth-of-type(4) a', 'manual/installation.html#indent-5', 'href');
    });

    // usage
    find(doc, '[data-ice="manual"]:nth-of-type(3)', (doc)=>{
      assert.includes(doc, '.manual-toc-title', 'Usage');
    });

    // tutorial
    find(doc, '[data-ice="manual"]:nth-of-type(4)', (doc)=>{
      assert.includes(doc, '.manual-toc-title', 'Tutorial');
    });

    // configuration
    find(doc, '[data-ice="manual"]:nth-of-type(5)', (doc)=>{
      assert.includes(doc, '.manual-toc-title', 'Configuration');
    });

    // example
    find(doc, '[data-ice="manual"]:nth-of-type(6)', (doc)=>{
      assert.includes(doc, '.manual-toc-title', 'Example');

      assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1)', 'Minimum Config');
      assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(2)', 'Integration Test Code Into Documentation');

      assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1) a', 'manual/example.html#minimum-config', 'href');
      assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(2) a', 'manual/example.html#integration-test-code-into-documentation', 'href');
    });

    // reference
    find(doc, '[data-ice="manual"]:nth-of-type(7)', (doc)=>{
      assert.includes(doc, '.manual-toc-title', 'Reference');

      assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1)', 'Class');
      assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(2)', 'Interface');
      assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(3)', 'Function');
      assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(4)', 'Variable');
      assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(5)', 'Typedef');
      assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(6)', 'External');

      assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1) a', 'identifiers.html#class', 'href');
      assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(2) a', 'identifiers.html#interface', 'href');
      assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(3) a', 'identifiers.html#function', 'href');
      assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(4) a', 'identifiers.html#variable', 'href');
      assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(5) a', 'identifiers.html#typedef', 'href');
      assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(6) a', 'identifiers.html#external', 'href');
    });

    // faq
    find(doc, '[data-ice="manual"]:nth-of-type(8)', (doc)=>{
      assert.includes(doc, '.manual-toc-title', 'FAQ');

      assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1)', 'Goal');

      assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1) a', 'manual/faq.html#goal', 'href');
    });

    // changelog
    find(doc, '[data-ice="manual"]:nth-of-type(9)', (doc)=>{
      assert.includes(doc, '.manual-toc-title', 'Changelog');

      assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1)', '0.0.1');

      assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1) a', 'manual/changelog.html#0-0-1', 'href');
    });
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
    assert.includes(doc, '.github-markdown h1', 'Usage');
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
