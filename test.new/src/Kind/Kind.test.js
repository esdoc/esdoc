import assert from 'assert';
import {find} from '../../util';

describe('test/Kind/Kind:', ()=>{
  it('has kind = class', ()=>{
    const doc = find('longname', 'src/Kind/Kind.js~TestKindClass');
    assert.equal(doc.kind, 'class');
  });

  it('has kind = constructor', ()=>{
    const doc = find('longname', 'src/Kind/Kind.js~TestKindClass#constructor');
    assert.equal(doc.kind, 'constructor');
  });

  it('has kind = member', ()=>{
    const doc = find('longname', 'src/Kind/Kind.js~TestKindClass#testKindMember');
    assert.equal(doc.kind, 'member');
  });

  it('has kind = method', ()=>{
    const doc = find('longname', 'src/Kind/Kind.js~TestKindClass#testKindMethod');
    assert.equal(doc.kind, 'method');
  });

  it('has kind = get', ()=>{
    const doc = find('longname', 'src/Kind/Kind.js~TestKindClass#testKindGet');
    assert.equal(doc.kind, 'get');
  });

  it('has kind = set', ()=>{
    const doc = find('longname', 'src/Kind/Kind.js~TestKindClass#testKindSet');
    assert.equal(doc.kind, 'set');
  });

  it('has kind = function', ()=>{
    const doc = find('longname', 'src/Kind/Kind.js~testKindFunction');
    assert.equal(doc.kind, 'function');
  });

  it('has kind = variable', ()=>{
    const doc = find('longname', 'src/Kind/Kind.js~testKindVariable');
    assert.equal(doc.kind, 'variable');
  });

  it('has kind = typedef', ()=>{
    const doc = find('longname', 'src/Kind/Kind.js~testKindTypedef');
    assert.equal(doc.kind, 'typedef');
  });

  it('has kind = external', ()=>{
    const doc = find('longname', 'src/Kind/Kind.js~testKindExternal');
    assert.equal(doc.kind, 'external');
  });

  xit('has kind = file');

  xit('has kind = testFile');
  xit('has kind = testDescribe');
  xit('has kind = testIt');

  xit('has kind = packageJOSN');
  xit('has kind = index');

  xit('has kind = manualIndex');
  xit('has kind = manualAsset');
  xit('has kind = manualOverview');
  xit('has kind = manualInstallation');
  xit('has kind = manualDesign');
  xit('has kind = manualTutorial');
  xit('has kind = manualUsage');
  xit('has kind = manualAdvanced');
  xit('has kind = manualConfiguration');
  xit('has kind = manualExample');
  xit('has kind = manualFaq');
  xit('has kind = manualChangelog');
});
