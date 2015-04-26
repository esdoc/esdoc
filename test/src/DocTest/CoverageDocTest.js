import fs from 'fs';
import {assert} from './util.js';

describe('Coverage:', ()=> {
  it('has coverage.json', ()=>{
    let json = fs.readFileSync('./test/fixture/esdoc/coverage.json', {encoding: 'utf8'}).toString();
    let coverage = JSON.parse(json);
    assert.equal(coverage.coverage, '87.5%');
    assert.equal(coverage.expectCount, 72);
    assert.equal(coverage.actualCount, 63);
    assert.deepEqual(coverage.files, {
      "src/MyClass.js": {
        "expectCount": 35,
        "actualCount": 30
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
