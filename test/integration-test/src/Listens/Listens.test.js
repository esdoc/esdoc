import assert from 'assert';
import {find} from '../../util';

describe('test/Listens/Listens:', ()=>{
  it('method listen events', ()=>{
    const doc = find('longname', 'src/Listens/Listens.js~TestListensClass#methodListens');
    assert.deepEqual(doc.listens, [
      {
        description: '',
        name: 'foo',
        types: ['Event'],
      },
      {
        description: 'listens for custom bar',
        name: 'bar',
        types: ['CustomEvent'],
      },
      {
        description: 'listens for any bang',
        name: 'bang',
        types: ['*'],
      },
    ]);
  });

  it('class listen events', ()=>{
    const doc = find('longname', 'src/Listens/Listens.js~TestListensClass');
    assert.deepEqual(doc.listens, [
      {
        description: '',
        name: 'scroll',
        types: ['*'],
      },
      {
        description: 'listens for click',
        name: 'click',
        types: ['MouseEvent'],
      },
      {
        description: 'listens for input',
        name: 'input',
        types: ['InputEvent'],
      },
    ]);
  });
});
