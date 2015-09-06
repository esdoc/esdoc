import fs from 'fs';
import {assert} from './../util.js';

/** @test {CoverageBuilder} */
describe('Coverage:', ()=> {

  /** @test {CoverageBuilder#exec} */
  it('has coverage.json', ()=>{
    let json = fs.readFileSync('./test/fixture/esdoc/coverage.json', {encoding: 'utf8'}).toString();
    let coverage = JSON.parse(json);
    assert.equal(coverage.coverage, '87.8%');
    assert.equal(coverage.expectCount, 123);
    assert.equal(coverage.actualCount, 108);
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
        "expectCount": 38,
        "actualCount": 33
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
        "expectCount": 23,
        "actualCount": 23
      },
      "src/MyExpressionExtend.js": {
        "expectCount": 2,
        "actualCount": 2
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
      "src/Z001_MyDuplicationPropertyClass.js": {
        "actualCount": 5,
        "expectCount": 5
      },
      "src/OtherClass/SuperMyClass.js": {
        "expectCount": 19,
        "actualCount": 19
      },
      "src/nMyAnonymous.js": {
        "expectCount": 4,
        "actualCount": 4
      },
      "src/myFunction.js": {
        "expectCount": 10,
        "actualCount": 8
      },
      "src/myVariable.js": {
        "expectCount": 7,
        "actualCount": 5
      }
    });
  });

  /** @test {CoverageBuilder#exec} */
  it('creates coverage badge', ()=>{
    let json = fs.readFileSync('./test/fixture/esdoc/coverage.json', {encoding: 'utf8'}).toString();
    let coverage = JSON.parse(json);
    let badge = fs.readFileSync('./test/fixture/esdoc/badge.svg', {encoding: 'utf8'}).toString();
    let ratio = Math.floor(100 * coverage.actualCount / coverage.expectCount) + '%';
    assert(badge.includes(ratio));
  });
});
