import fs from 'fs';
import {assert} from './../util.js';

/** @test {CoverageBuilder} */
describe('Coverage:', ()=> {

  /** @test {CoverageBuilder#exec} */
  it('has coverage.json', ()=>{
    let json = fs.readFileSync('./test/fixture/esdoc/coverage.json', {encoding: 'utf8'}).toString();
    let coverage = JSON.parse(json);
    assert.equal(coverage.coverage, '89.28%');
    assert.equal(coverage.expectCount, 140);
    assert.equal(coverage.actualCount, 125);
    assert.deepEqual(coverage.files, {
      "src/ForTestDoc/AbstractDoc.js": {
        "expectCount": 3,
        "actualCount": 0,
        "undocumentLines": [
          1,
          2,
          4
        ]
      },
      "src/ForTestDoc/ClassDoc.js": {
        "expectCount": 1,
        "actualCount": 0,
        "undocumentLines": [
          3
        ]
      },
      "src/ForTestDoc/ClassDocBuilder.js": {
        "expectCount": 2,
        "actualCount": 0,
        "undocumentLines": [
          1,
          2
        ]
      },
      "src/MyClass.js": {
        "expectCount": 43,
        "actualCount": 38,
        "undocumentLines": [
          225,
          230,
          144,
          145,
          146
        ]
      },
      "src/MyError.js": {
        "expectCount": 1,
        "actualCount": 1,
        "undocumentLines": []
      },
      "src/MyEvent.js": {
        "expectCount": 1,
        "actualCount": 1,
        "undocumentLines": []
      },
      "src/Export.js": {
        "expectCount": 23,
        "actualCount": 23,
        "undocumentLines": []
      },
      "src/MyExpressionExtend.js": {
        "expectCount": 2,
        "actualCount": 2,
        "undocumentLines": []
      },
      "src/MyInterface.js": {
        "expectCount": 3,
        "actualCount": 3,
        "undocumentLines": []
      },
      "src/ExtendNest.js": {
        "expectCount": 2,
        "actualCount": 2,
        "undocumentLines": []
      },
      "src/ReactJSX.js": {
        "expectCount": 2,
        "actualCount": 2,
        "undocumentLines": []
      },
      "src/OtherClass/SuperMyClass.js": {
        "expectCount": 19,
        "actualCount": 19,
        "undocumentLines": []
      },
      "src/Z001_MyDuplicationPropertyClass.js": {
        "expectCount": 5,
        "actualCount": 5,
        "undocumentLines": []
      },
      "src/Z002_MyComputedMethodClass.js": {
        "expectCount": 10,
        "actualCount": 10,
        "undocumentLines": []
      },
      "src/nMyAnonymous.js": {
        "expectCount": 4,
        "actualCount": 4,
        "undocumentLines": []
      },
      "src/myFunction.js": {
        "expectCount": 11,
        "actualCount": 9,
        "undocumentLines": [
          50,
          55
        ]
      },
      "src/myVariable.js": {
        "expectCount": 8,
        "actualCount": 6,
        "undocumentLines": [
          22,
          23
        ]
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
