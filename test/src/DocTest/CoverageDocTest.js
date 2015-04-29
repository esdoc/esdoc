import fs from 'fs';
import {assert} from './util.js';

describe('Coverage:', ()=> {
  it('has coverage.json', ()=>{
    let json = fs.readFileSync('./test/fixture/esdoc/coverage.json', {encoding: 'utf8'}).toString();
    let coverage = JSON.parse(json);
    assert.equal(coverage.coverage, '87.67%');
    assert.equal(coverage.expectCount, 73);
    assert.equal(coverage.actualCount, 64);
    assert.deepEqual(coverage.files, {
      "src/MyClass.js": {
        "expectCount": 36,
        "actualCount": 31
      },
      "src/MyError.js": {
        "expectCount": 1,
        "actualCount": 1
      },
      "src/MyEvent.js": {
        "expectCount": 1,
        "actualCount": 1
      },
      "src/MyInterface.js": {
        "expectCount": 3,
        "actualCount": 3
      },
      "src/OtherClass/SuperMyClass.js": {
        "expectCount": 19,
        "actualCount": 19
      },
      "src/myFunction.js": {
        "expectCount": 8,
        "actualCount": 6
      },
      "src/myVariable.js": {
        "expectCount": 5,
        "actualCount": 3
      }
    });
  });
});
