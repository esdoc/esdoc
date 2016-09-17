import {readDoc, assert, find} from './../util.js';

/** @test {ManualDocBuilder} */
describe('test manual', ()=>{
  describe('test navigation', ()=>{
    it('has manual link in header', ()=>{
      const doc = readDoc('index.html');
      assert.includes(doc, '[data-ice="manualHeaderLink"]', 'Manual');
      assert.includes(doc, '[data-ice="manualHeaderLink"]', './manual/index.html', 'href');
    });

    /** @test {ManualDocBuilder#_buildManualNav} */
    it('has manual navigation', ()=>{
      const doc = readDoc('manual/index.html');
      find(doc, '[data-ice="nav"]', (doc)=>{
        assert.includes(doc, '[data-ice="manual"]:nth-of-type(1)', 'Overview');
        assert.includes(doc, '[data-ice="manual"]:nth-of-type(2)', 'Installation');
        assert.includes(doc, '[data-ice="manual"]:nth-of-type(3)', 'Tutorial');
        assert.includes(doc, '[data-ice="manual"]:nth-of-type(4)', 'Usage');
        assert.includes(doc, '[data-ice="manual"]:nth-of-type(5)', 'Configuration');
        assert.includes(doc, '[data-ice="manual"]:nth-of-type(6)', 'Example');
        assert.includes(doc, '[data-ice="manual"]:nth-of-type(7)', 'Reference');
        assert.includes(doc, '[data-ice="manual"]:nth-of-type(8)', 'FAQ');
        assert.includes(doc, '[data-ice="manual"]:nth-of-type(9)', 'Changelog');

        assert.includes(doc, '[data-ice="manual"]:nth-of-type(1) .manual-toc-title a', 'manual/overview.html', 'href');
        assert.includes(doc, '[data-ice="manual"]:nth-of-type(2) .manual-toc-title a', 'manual/installation.html', 'href');
        assert.includes(doc, '[data-ice="manual"]:nth-of-type(3) .manual-toc-title a', 'manual/tutorial.html', 'href');
        assert.includes(doc, '[data-ice="manual"]:nth-of-type(4) .manual-toc-title a', 'manual/usage.html', 'href');
        assert.includes(doc, '[data-ice="manual"]:nth-of-type(5) .manual-toc-title a', 'manual/configuration.html', 'href');
        assert.includes(doc, '[data-ice="manual"]:nth-of-type(6) .manual-toc-title a', 'manual/example.html', 'href');
        assert.includes(doc, '[data-ice="manual"]:nth-of-type(7) .manual-toc-title a', 'identifiers.html', 'href');
        assert.includes(doc, '[data-ice="manual"]:nth-of-type(8) .manual-toc-title a', 'manual/faq.html', 'href');
        assert.includes(doc, '[data-ice="manual"]:nth-of-type(9) .manual-toc-title a', 'manual/changelog.html', 'href');
      });
    });
  });

  /** @test {ManualDocBuilder#_buildManualIndex} */
  describe('test each heading tags', ()=>{
    const doc = readDoc('manual/index.html');
    it('has overview heading tags', ()=>{
      find(doc, '.content [data-ice="manual"]:nth-of-type(1)', (doc)=>{
        assert.includes(doc, '.manual-toc-title', 'Overview');

        assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1)', 'Overview');
        assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(2)', 'Feature');
        assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(3)', 'Demo');
        assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(4)', 'License');
        assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(5)', 'Author');

        assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1) a', 'manual/overview.html#overview', 'href');
        assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(2) a', 'manual/overview.html#feature', 'href');
        assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(3) a', 'manual/overview.html#demo', 'href');
        assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(4) a', 'manual/overview.html#license', 'href');
        assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(5) a', 'manual/overview.html#author', 'href');
      });
    });

    it('has installation heading tags', ()=>{
      find(doc, '.content [data-ice="manual"]:nth-of-type(2)', (doc)=>{
        assert.includes(doc, '.manual-toc-title', 'Installation');

        assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1)', 'Installation');
        assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(2)', 'indent 2');
        assert.includes(doc, '.indent-h3[data-ice="manualNav"]:nth-of-type(3)', 'indent 3');
        assert.includes(doc, '.indent-h4[data-ice="manualNav"]:nth-of-type(4)', 'indent 4');
        assert.includes(doc, '.indent-h5[data-ice="manualNav"]:nth-of-type(5)', 'indent 5');

        assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1) a', 'manual/installation.html#installation', 'href');
        assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(2) a', 'manual/installation.html#indent-2', 'href');
        assert.includes(doc, '.indent-h3[data-ice="manualNav"]:nth-of-type(3) a', 'manual/installation.html#indent-3', 'href');
        assert.includes(doc, '.indent-h4[data-ice="manualNav"]:nth-of-type(4) a', 'manual/installation.html#indent-4', 'href');
        assert.includes(doc, '.indent-h5[data-ice="manualNav"]:nth-of-type(5) a', 'manual/installation.html#indent-5', 'href');
      });
    });

    it('has tutorial heading tags', ()=>{
      find(doc, '.content [data-ice="manual"]:nth-of-type(3)', (doc)=>{
        assert.includes(doc, '.manual-toc-title', 'Tutorial');

        assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1)', 'Tutorial');

        assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1) a', 'manual/tutorial.html#tutorial', 'href');
      });
    });

    it('has usage heading tags', ()=>{
      find(doc, '.content [data-ice="manual"]:nth-of-type(4)', (doc)=>{
        assert.includes(doc, '.manual-toc-title', 'Usage');

        assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1)', 'Usage');
        assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(2)', 'Usage2');
        assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(3)', 'h2 in usage2');
        assert.includes(doc, '.indent-h3[data-ice="manualNav"]:nth-of-type(4)', 'h3 in usage2');

        assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1) a', 'manual/usage.html#usage', 'href');
        assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(2) a', 'manual/usage.html#usage2', 'href');
        assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(3) a', 'manual/usage.html#h2-in-usage2', 'href');
        assert.includes(doc, '.indent-h3[data-ice="manualNav"]:nth-of-type(4) a', 'manual/usage.html#h3-in-usage2', 'href');
      });
    });

    it('has configuration heading tags', ()=>{
      find(doc, '.content [data-ice="manual"]:nth-of-type(5)', (doc)=>{
        assert.includes(doc, '.manual-toc-title', 'Configuration');

        assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1)', 'Configuration');

        assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1) a', 'manual/configuration.html#configuration', 'href');
      });
    });

    it('has example heading tags', ()=>{
      find(doc, '.content [data-ice="manual"]:nth-of-type(6)', (doc)=>{
        assert.includes(doc, '.manual-toc-title', 'Example');

        assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1)', 'Example');
        assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(2)', 'Minimum Config');
        assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(3)', 'Integration Test Code Into Documentation');

        assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1) a', 'manual/example.html#example', 'href');
        assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(2) a', 'manual/example.html#minimum-config', 'href');
        assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(3) a', 'manual/example.html#integration-test-code-into-documentation', 'href');
      });
    });

    it('has reference heading tags', ()=>{
      find(doc, '.content [data-ice="manual"]:nth-of-type(7)', (doc)=>{
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
    });

    it('has faq heading tags', ()=>{
      find(doc, '.content [data-ice="manual"]:nth-of-type(8)', (doc)=>{
        assert.includes(doc, '.manual-toc-title', 'FAQ');

        assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1)', 'FAQ');
        assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(2)', 'Goal');

        assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1) a', 'manual/faq.html#faq', 'href');
        assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(2) a', 'manual/faq.html#goal', 'href');
      });
    });

    it('has changelog heading tags', ()=>{
      find(doc, '.content [data-ice="manual"]:nth-of-type(9)', (doc)=>{
        assert.includes(doc, '.manual-toc-title', 'Changelog');

        assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1)', 'Changelog');
        assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(2)', '0.0.1');

        assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1) a', 'manual/changelog.html#changelog', 'href');
        assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(2) a', 'manual/changelog.html#0-0-1', 'href');
      });
    });
  });

  /** @test {ManualDocBuilder#_buildManual} */
  describe('test each manual', ()=>{
    it('has overview', ()=>{
      const doc = readDoc('manual/overview.html');
      assert.includes(doc, '.github-markdown h1', 'Overview');
      assert.includes(doc, '.github-markdown [data-ice="content"]', 'ESDoc is a documentation generator for JavaScript(ES6).');
    });

    it('has installation', ()=>{
      const doc = readDoc('manual/installation.html');
      assert.includes(doc, '.github-markdown h1', 'Installation');
      assert.includes(doc, '.github-markdown [data-ice="content"]', 'npm install -g esdoc');
    });

    it('has usage', ()=>{
      const doc = readDoc('manual/usage.html');
      assert.includes(doc, '.github-markdown h1:nth-of-type(1)', 'Usage');
      assert.includes(doc, '.github-markdown [data-ice="content"]', 'esdoc -c esdoc.json');
    });

    it('has tutorial', ()=>{
      const doc = readDoc('manual/tutorial.html');
      assert.includes(doc, '.github-markdown h1', 'Tutorial');
      assert.includes(doc, '.github-markdown [data-ice="content"]', 'this is tutorial');
    });

    it('has configuration', ()=>{
      const doc = readDoc('manual/configuration.html');
      assert.includes(doc, '.github-markdown h1', 'Configuration');
      assert.includes(doc, '.github-markdown [data-ice="content"]', 'this is configuration');
    });

    it('has example', ()=>{
      const doc = readDoc('manual/example.html');
      assert.includes(doc, '.github-markdown h1', 'Example');
      assert.includes(doc, '.github-markdown [data-ice="content"] h2:nth-of-type(1)', 'Minimum Config');
    });

    it('has faq', ()=>{
      const doc = readDoc('manual/faq.html');
      assert.includes(doc, '.github-markdown h1', 'FAQ');
      assert.includes(doc, '.github-markdown [data-ice="content"]', 'ESDoc has two goals.');
    });

    it('has changelog', ()=>{
      const doc = readDoc('manual/changelog.html');
      assert.includes(doc, '.github-markdown h1', 'Changelog');
      assert.includes(doc, '.github-markdown [data-ice="content"] h2:nth-of-type(1)', '0.0.1');
    });
  });
});
