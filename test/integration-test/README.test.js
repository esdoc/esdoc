import assert from 'assert';
import {find, file} from './util';

describe('test/README.md', ()=>{
  it('has README', ()=>{
    const doc = find('longname', /\/README.md$/);
    assert.equal(doc.kind, 'index');
    assert.equal(doc.content, file(doc.longname));
  });
});
