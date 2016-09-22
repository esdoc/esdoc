import IceCap from 'ice-cap';
import DocBuilder from './DocBuilder.js';

/**
 * Test file output html builder class.
 */
export default class TestDocBuilder extends DocBuilder {
  /**
   * execute building output html.
   * @param {function(html: string, filePath: string)} callback - is called with output html.
   */
  exec(callback) {
    let testDescribeDoc = this._find({kind: 'testDescribe'})[0];
    if (!testDescribeDoc) return;

    let ice = this._buildLayoutDoc();
    let fileName = this._getOutputFileName(testDescribeDoc);
    let baseUrl = this._getBaseUrl(fileName);
    let title = this._getTitle('Test');

    ice.load('content', this._buildTestDocHTML());
    ice.attr('baseUrl', 'href', baseUrl);
    ice.text('title', title);
    callback(ice.html, fileName);
  }

  /**
   * build whole test file output html.
   * @returns {string} html of whole test file.
   * @private
   */
  _buildTestDocHTML() {
    let ice = new IceCap(this._readTemplate('test.html'));
    let testDescribeHTML = this._buildTestDescribeDocHTML();
    ice.load('tests', testDescribeHTML);
    return ice.html;
  }

  /**
   * build test describe list html.
   * @param {number} [depth=0] - test depth.
   * @param {string} [memberof] - target test.
   * @returns {string} html of describe list.
   * @private
   */
  _buildTestDescribeDocHTML(depth = 0, memberof = null) {
    let cond = {kind: 'testDescribe', testDepth: depth};
    if (memberof) cond.memberof = memberof;
    let describeDocs = this._orderedFind('testId asec', cond);
    let padding;
    let html = '';

    for (let describeDoc of describeDocs) {
      let ice = new IceCap(this._readTemplate('testDescribe.html'));

      let testCount = this._find({kind: 'testIt', longname: {regex: new RegExp(`^${describeDoc.longname}\\.`)}}).length;
      padding = 10 * (depth + 1);
      ice.attr('testDescribe', 'data-test-depth', depth);
      /* eslint-disable no-loop-func */
      ice.into('testDescribe', describeDoc, (describeDoc, ice)=>{
        let descriptionHTML = this._buildFileDocLinkHTML(describeDoc, describeDoc.description);

        let testTargetsHTML = [];
        for (let testTarget of describeDoc._custom_test_targets || []) {
          testTargetsHTML.push(this._buildDocLinkHTML(testTarget[0], testTarget[1]));
        }
        testTargetsHTML = testTargetsHTML.join('\n') || '-';

        ice.load('testDescription', descriptionHTML);
        ice.attr('testDescription', 'style', `padding-left: ${padding}px`);
        ice.load('testTarget', testTargetsHTML);
        ice.text('testCount', testCount);
      });

      padding = 10 * (depth + 2);
      let itDocs = this._orderedFind('testId asec', {kind: 'testIt', testDepth: depth + 1, memberof: describeDoc.longname});
      /* eslint-disable no-loop-func */
      ice.loop('testIt', itDocs, (i, itDoc, ice)=>{
        let descriptionHTML = this._buildFileDocLinkHTML(itDoc, itDoc.description);

        let testTargetsHTML = [];
        for (let testTarget of itDoc._custom_test_targets || []) {
          testTargetsHTML.push(this._buildDocLinkHTML(testTarget[0], testTarget[1]));
        }
        testTargetsHTML = testTargetsHTML.join('\n') || '-';

        ice.attr('testIt', 'data-test-depth', depth + 1);
        ice.load('testDescription', descriptionHTML);
        ice.attr('testDescription', 'style', `padding-left: ${padding}px`);
        ice.load('testTarget', testTargetsHTML);
      });

      let innerDescribeHTML = this._buildTestDescribeDocHTML(depth + 1, describeDoc.longname);

      html += '\n' + ice.html + '\n' + innerDescribeHTML;
    }

    return html;
  }
}
