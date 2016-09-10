import {readDoc, assert, find} from './../../util.js';

/** @test {AbstractDoc#@desc} */
describe('TestDescMarkdown:', ()=> {
  const doc = readDoc('class/src/Desc/Markdown.js~TestDescMarkdown.html');

  describe('in self detail', ()=> {
    it('has markdown desc.', ()=> {
      find(doc, '.self-detail [data-ice="description"]', (doc)=>{
        // line
        assert.includes(doc.find('p:nth-child(1)'), null, 'this is TestDescMarkdown.');

        // code fence of html
        assert.includes(doc.find('pre:nth-child(2) code.lang-html code.source-code.prettyprint'), null,
          `<div>text</div> <ul> <li>item1</li> <li>item2</li> <li>item3</li> </ul>`
        );

        // header
        assert.includes(doc.find('h1#inner-link:nth-child(3)'), null, 'Inner Link');

        // list
        assert.includes(doc.find('ul:nth-child(4) li:nth-child(1)'), null, 'item1');
        assert.includes(doc.find('ul:nth-child(4) li:nth-child(2)'), null, 'item2');
        assert.includes(doc.find('ul:nth-child(4) li:nth-child(3)'), null, 'item3');

        // link
        assert.includes(doc.find('p:nth-child(5) a[href$="#inner-link"]'), null, 'inner link');

        // code fence of js
        assert.includes(doc.find('pre:nth-child(6) code.lang-js code.source-code.prettyprint'), null,
          `let foo = 'this is code block'`
        );

        // table
        assert.includes(doc.find('table:nth-child(7) thead tr'), null, 'Left align Right align Center align');
        assert.includes(doc.find('table:nth-child(7) tbody tr:nth-child(1)'), null, 'This This This');
        assert.includes(doc.find('table:nth-child(7) tbody tr:nth-child(2)'), null, 'column column column');
      });
    });
  });
});
