import assert from 'assert';
import {find} from './util';

describe('test/manual:', ()=>{
  it('has manual index', ()=>{
    const doc = find('longname', /manual\/index.md$/);
    assert(doc.content.includes('# ESDoc Manual'));
    assert.equal(doc.globalIndex, true);
    assert.equal(doc.coverage, true)
  });

  it('has manual asset', ()=>{
    const doc = find('longname', /manual\/asset$/);
    assert(doc);
  });

  it('has manual overview', ()=>{
    const doc = find('longname', /manual\/overview.md$/);
    assert(doc.content.includes('# Overview'));
  });

  it('has manual design', ()=>{
    const doc = find('longname', /manual\/design.md$/);
    assert(doc.content.includes('# Design'));
  });

  it('has manual installation', ()=>{
    const doc = find('longname', /manual\/installation.md$/);
    assert(doc.content.includes('# Installation'));
  });

  it('has manual usage', ()=>{
    const [doc1, doc2] = find('longname', /manual\/usage1.md$/, /manual\/usage2.md$/);
    assert(doc1.content.includes('# Usage'));
    assert(doc2.content.includes('# Usage2'));
  });

  it('has manual tutorial', ()=>{
    const doc = find('longname', /manual\/tutorial.md$/);
    assert(doc.content.includes('# Tutorial'));
  });

  it('has manual configuration', ()=>{
    const doc = find('longname', /manual\/configuration.md$/);
    assert(doc.content.includes('# Configuration'));
  });

  it('has manual example', ()=>{
    const doc = find('longname', /manual\/example.md$/);
    assert(doc.content.includes('# Example'));
  });

  it('has manual advanced', ()=>{
    const doc = find('longname', /manual\/advanced.md$/);
    assert(doc.content.includes('# Advanced'));
  });

  it('has manual faq', ()=>{
    const doc = find('longname', /manual\/faq.md$/);
    assert(doc.content.includes('# FAQ'));
  });

  it('has manual changelog', ()=>{
    const doc = find('longname', /CHANGELOG.md$/);
    assert(doc.content.includes('# Changelog'));
  });
});
