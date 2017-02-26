import assert from 'assert';
import fs from 'fs';

describe('test manual docs:', ()=>{
  const docs = global.tags;

  function file(filePath) {
    return fs.readFileSync(filePath).toString();
  }

  it('has manualIndex.', ()=>{
    const doc = docs.find(doc => doc.kind === 'manualIndex');
    assert(doc);
    assert.equal(doc.name, './test/fixture/package/manual/index.md');
    assert.equal(doc.content, file(doc.name));
    assert(doc.globalIndex);
    assert(doc.coverage);
  });

  it('has manualAsset.', ()=>{
    const doc = docs.find(doc => doc.kind === 'manualAsset');
    assert(doc);
    assert.equal(doc.name, './test/fixture/package/manual/asset');
  });

  it('has manualOverview.', ()=>{
    const doc = docs.find(doc => doc.kind === 'manualOverview');
    assert(doc);
    assert.equal(doc.name, './test/fixture/package/manual/overview.md');
    assert.equal(doc.content, file(doc.name));
  });

  it('has manualDesign.', ()=>{
    const doc = docs.find(doc => doc.kind === 'manualDesign');
    assert(doc);
    assert.equal(doc.name, './test/fixture/package/manual/design.md');
    assert.equal(doc.content, file(doc.name));
  });

  it('has manualInstallation.', ()=>{
    const doc = docs.find(doc => doc.kind === 'manualInstallation');
    assert(doc);
    assert.equal(doc.name, './test/fixture/package/manual/installation.md');
    assert.equal(doc.content, file(doc.name));
  });

  it('has two manualUsage.', ()=>{
    const _docs = docs.filter(doc => doc.kind === 'manualUsage');
    assert.equal(_docs.length, 2);

    assert.equal(_docs[0].name, './test/fixture/package/manual/usage1.md');
    assert.equal(_docs[0].content, file(_docs[0].name));

    assert.equal(_docs[1].name, './test/fixture/package/manual/usage2.md');
    assert.equal(_docs[1].content, file(_docs[1].name));
  });

  it('has manualTutorial.', ()=>{
    const doc = docs.find(doc => doc.kind === 'manualTutorial');
    assert(doc);
    assert.equal(doc.name, './test/fixture/package/manual/tutorial.md');
    assert.equal(doc.content, file(doc.name));
  });

  it('has manualConfiguration.', ()=>{
    const doc = docs.find(doc => doc.kind === 'manualConfiguration');
    assert(doc);
    assert.equal(doc.name, './test/fixture/package/manual/configuration.md');
    assert.equal(doc.content, file(doc.name));
  });

  it('has manualExample.', ()=>{
    const doc = docs.find(doc => doc.kind === 'manualExample');
    assert(doc);
    assert.equal(doc.name, './test/fixture/package/manual/example.md');
    assert.equal(doc.content, file(doc.name));
  });

  it('has manualAdvanced.', ()=>{
    const doc = docs.find(doc => doc.kind === 'manualAdvanced');
    assert(doc);
    assert.equal(doc.name, './test/fixture/package/manual/advanced.md');
    assert.equal(doc.content, file(doc.name));
  });

  it('has manualFaq.', ()=>{
    const doc = docs.find(doc => doc.kind === 'manualFaq');
    assert(doc);
    assert.equal(doc.name, './test/fixture/package/manual/faq.md');
    assert.equal(doc.content, file(doc.name));
  });

  it('has manualChangelog.', ()=>{
    const doc = docs.find(doc => doc.kind === 'manualChangelog');
    assert(doc);
    assert.equal(doc.name, './test/fixture/package/CHANGELOG.md');
    assert.equal(doc.content, file(doc.name));
  });
});
