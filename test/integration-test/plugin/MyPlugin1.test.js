import assert from 'assert';
import fs from 'fs';
import {find} from '../util';

describe('test/plugin/MyPlugin1:', ()=>{
  it('calls handlers', async ()=>{
    setTimeout( () => {
      const callInfo = require('./MyPlugin1').callInfo;
      assert.deepEqual(callInfo.handlerNames, {
        onStart: true,
        onHandleConfig: true,
        onHandleCode: true,
        onHandleCodeParser: true,
        onHandleAST: true,
        onHandleDocs: true,
        onPublish: true,
        onHandleContent: true,
        onComplete: true
      });
  
      assert.equal(callInfo.usedParser, true);  
    }, 1500)
  });

  it('modified input', ()=>{
    const doc = find('longname', /EmptyForPlugin_Modified1_Modified2$/);
    assert.equal(doc.kind, 'class');
  });

  it('output', ()=>{
    const content = fs.readFileSync('./test/integration-test/out/index.md').toString();
    assert(content.includes('EmptyForPlugin_Modified1_Modified2'));
    assert(content.includes('made by MyPlugin1_Modified'));
  });
});
