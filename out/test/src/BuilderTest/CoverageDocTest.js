'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _utilJs = require('./../util.js');

/** @test {CoverageBuilder} */
describe('Coverage:', function () {

  /** @test {CoverageBuilder#exec} */
  it('has coverage.json', function () {
    var json = _fs2['default'].readFileSync('./test/fixture/esdoc/coverage.json', { encoding: 'utf8' }).toString();
    var coverage = JSON.parse(json);
    _utilJs.assert.equal(coverage.coverage, '79.06%');
    _utilJs.assert.equal(coverage.expectCount, 86);
    _utilJs.assert.equal(coverage.actualCount, 68);
    _utilJs.assert.deepEqual(coverage.files, {
      'src/ForTestDoc/AbstractDoc.js': {
        'expectCount': 3,
        'actualCount': 0
      },
      'src/ForTestDoc/ClassDoc.js': {
        'expectCount': 1,
        'actualCount': 0
      },
      'src/ForTestDoc/ClassDocBuilder.js': {
        'expectCount': 2,
        'actualCount': 0
      },
      'src/MyClass.js': {
        'expectCount': 36,
        'actualCount': 31
      },
      'src/MyError.js': {
        'expectCount': 1,
        'actualCount': 1
      },
      'src/MyEvent.js': {
        'expectCount': 1,
        'actualCount': 1
      },
      'src/MyInterface.js': {
        'expectCount': 3,
        'actualCount': 3
      },
      'src/ExtendNest.js': {
        'expectCount': 2,
        'actualCount': 2
      },
      'src/ReactJSX.js': {
        'expectCount': 2,
        'actualCount': 2
      },
      'src/SeparateExport.js': {
        'expectCount': 3,
        'actualCount': 0
      },
      'src/OtherClass/SuperMyClass.js': {
        'expectCount': 19,
        'actualCount': 19
      },
      'src/myFunction.js': {
        'expectCount': 8,
        'actualCount': 6
      },
      'src/myVariable.js': {
        'expectCount': 5,
        'actualCount': 3
      }
    });
  });
});