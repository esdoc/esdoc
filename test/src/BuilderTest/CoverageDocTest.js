import fs from 'fs';
import {assert} from './../util.js';

/** @test {CoverageBuilder} */
describe('Coverage:', ()=> {

  /** @test {CoverageBuilder#exec} */
  it('has coverage.json', ()=>{
    let json = fs.readFileSync('./test/fixture/esdoc/coverage.json', {encoding: 'utf8'}).toString();
    let coverage = JSON.parse(json);
    assert.equal(coverage.coverage, '77.55%');
    assert.equal(coverage.expectCount, 98);
    assert.equal(coverage.actualCount, 76);
    assert.deepEqual(coverage.files, {
      "src/ForTestDoc/AbstractDoc.js": {
        "expectCount": 3,
        "actualCount": 0
      },
      "src/ForTestDoc/ClassDoc.js": {
        "expectCount": 1,
        "actualCount": 0
      },
      "src/ForTestDoc/ClassDocBuilder.js": {
        "expectCount": 2,
        "actualCount": 0
      },
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
      "src/Export.js": {
        "expectCount": 15,
        "actualCount": 8
      },
      "src/MyInterface.js": {
        "expectCount": 3,
        "actualCount": 3
      },
      "src/ExtendNest.js": {
        "expectCount": 2,
        "actualCount": 2
      },
      "src/ReactJSX.js": {
        "expectCount": 2,
        "actualCount": 2
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
