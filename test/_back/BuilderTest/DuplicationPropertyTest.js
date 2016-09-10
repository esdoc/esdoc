import {readDoc, assert, find} from './../util.js';

describe('Duplication property:', ()=>{
  let doc = readDoc('class/src/Z001_MyDuplicationPropertyClass.js~Z001_MyDuplicationPropertyClass.html');

  it('excludes member because setter/getter', ()=>{
    find(doc, '[data-ice="memberSummary"]', (doc)=>{
      assert.includes(doc, '[data-ice="summary"]', 'public set value: number');
      assert.includes(doc, '[data-ice="summary"]', 'public get value: number');
      assert.notIncludes(doc, '[data-ice="summary"]', 'public value: number');
    });
  });

  it('excludes member because method', ()=>{
    find(doc, '[data-ice="memberSummary"]', (doc)=>{
      assert.notIncludes(doc, '[data-ice="summary"]', 'public onClick: *');
    });

    find(doc, '[data-ice="methodSummary"]', (doc)=>{
      assert.includes(doc, '[data-ice="summary"]', 'public onClick()');
    });
  });
});
