import assert from 'assert';
import {find, file} from '../util';

describe('test/manual:', ()=>{
  it('has manual index', ()=>{
    const doc = find('longname', /manual\/index.md$/);
    assert.equal(doc.content, file(doc.name));
    assert.equal(doc.globalIndex, true);
    assert.equal(doc.coverage, true)
  });

  it('has manual asset', ()=>{
    const doc = find('longname', /manual\/asset$/);
    assert(doc);
  });

  it('has manual overview', ()=>{
    const doc = find('longname', /manual\/overview.md$/);
    assert.equal(doc.content, file(doc.name));
  });

  it('has manual design', ()=>{
    const doc = find('longname', /manual\/design.md$/);
    assert.equal(doc.content, file(doc.name));
  });

  it('has manual installation', ()=>{
    const doc = find('longname', /manual\/installation.md$/);
    assert.equal(doc.content, file(doc.name));
  });

  it('has manual usage', ()=>{
    const [doc1, doc2] = find('longname', /manual\/usage1.md$/, /manual\/usage2.md$/);
    assert.equal(doc1.content, file(doc1.name));
    assert.equal(doc2.content, file(doc2.name));
  });

  it('has manual tutorial', ()=>{
    const doc = find('longname', /manual\/tutorial.md$/);
    assert.equal(doc.content, file(doc.name));
  });

  it('has manual configuration', ()=>{
    const doc = find('longname', /manual\/configuration.md$/);
    assert.equal(doc.content, file(doc.name));
  });

  it('has manual example', ()=>{
    const doc = find('longname', /manual\/example.md$/);
    assert.equal(doc.content, file(doc.name));
  });

  it('has manual advanced', ()=>{
    const doc = find('longname', /manual\/advanced.md$/);
    assert.equal(doc.content, file(doc.name));
  });

  it('has manual faq', ()=>{
    const doc = find('longname', /manual\/faq.md$/);
    assert.equal(doc.content, file(doc.name));
  });

  it('has manual changelog', ()=>{
    const doc = find('longname', /CHANGELOG.md$/);
    assert.equal(doc.content, file(doc.name));
  });
});
