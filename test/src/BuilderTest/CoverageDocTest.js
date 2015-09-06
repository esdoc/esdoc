import fs from 'fs';
import {assert} from './../util.js';

/** @test {CoverageBuilder} */
describe('Coverage:', ()=> {

  /** @test {CoverageBuilder#exec} */
  it('has coverage.json', ()=>{
    let json = fs.readFileSync('./test/fixture/esdoc/coverage.json', {encoding: 'utf8'}).toString();
    let coverage = JSON.parse(json);
    assert.equal(coverage.coverage, '87.9%');
    assert.equal(coverage.expectCount, 124);
    assert.equal(coverage.actualCount, 109);
    assert.deepEqual(coverage.files, {
      "src/ForTestDoc/AbstractDoc.js": {
        "expectCount": 3,
        "actualCount": 0,
        "undocumentLines": [
          2,
          4,
          1
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
        "expectCount": 39,
        "actualCount": 34,
        "undocumentLines": [
          222,
          227,
          141,
          142,
          143
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
      "src/nMyAnonymous.js": {
        "expectCount": 4,
        "actualCount": 4,
        "undocumentLines": []
      },
      "src/myFunction.js": {
        "expectCount": 10,
        "actualCount": 8,
        "undocumentLines": [
          50,
          55
        ]
      },
      "src/myVariable.js": {
        "expectCount": 7,
        "actualCount": 5,
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
