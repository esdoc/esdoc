import DocBuilder from './DocBuilder.js';

/**
 * Search index of identifier builder class.
 */
export default class SearchIndexBuilder extends DocBuilder {
  /**
   * execute building output.
   * @param {function(javascript: string, filePath: string)} callback - is called with output.
   */
  exec(callback) {
    let searchIndex = [];
    let docs = this._find({});

    for (let doc of docs) {
      let indexText;
      let url;
      let displayText;

      if (doc.importPath) {
        displayText = `<span>${doc.name}</span> <span class="search-result-import-path">${doc.importPath}</span>`;
        indexText = `${doc.importPath}~${doc.name}`.toLowerCase();
        url = this._getURL(doc);
      } else if (doc.kind === 'testDescribe' || doc.kind === 'testIt') {
        displayText = doc.testFullDescription;
        indexText = [...(doc.testTargets || []), ...(doc._custom_test_targets || [])].join(' ').toLowerCase();
        let filePath = doc.longname.split('~')[0];
        let fileDoc = this._find({kind: 'testFile', longname: filePath})[0];
        url = `${this._getURL(fileDoc)}#lineNumber${doc.lineNumber}`;
      } else if (doc.kind === 'external') {
        displayText = doc.longname;
        indexText = displayText.toLowerCase();
        url = doc.externalLink;
      } else {
        displayText = doc.longname;
        indexText = displayText.toLowerCase();
        url = this._getURL(doc);
      }

      let kind = doc.kind;
      switch (kind) {
        case 'constructor':
          kind = 'method';
          break;
        case 'get':
        case 'set':
          kind = 'member';
          break;
        case 'testDescribe':
        case 'testIt':
          kind = 'test';
          break;
      }

      searchIndex.push([indexText, url, displayText, kind]);
    }

    searchIndex.sort((a, b)=>{
      if (a[2] === b[2]) {
        return 0;
      } else if (a[2] < b[2]) {
        return -1;
      } else {
        return 1;
      }
    });

    let javascript = 'window.esdocSearchIndex = ' + JSON.stringify(searchIndex, null, 2);

    callback(javascript, 'script/search_index.js');
  }
}
