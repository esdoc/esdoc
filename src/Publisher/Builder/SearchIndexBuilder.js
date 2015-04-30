import path from 'path';
import DocBuilder from './DocBuilder.js';

export default class SearchIndexBuilder extends DocBuilder {
  exec(callback) {
    let searchIndex = [];
    let docs = this._find({});

    for (let doc of docs) {
      let indexText, url, displayText;

      if (doc.importPath) {
        displayText = `<span>${doc.name}</span> <span class="search-result-import-path">${doc.importPath}</span>`;
        indexText = `${doc.importPath}~${doc.name}`.toLowerCase();
        url = this._getURL(doc, null, 2);
      } else if (doc.kind === 'testDescribe' || doc.kind === 'testIt') {
        displayText = doc.descriptionRaw;
        indexText = displayText.toLowerCase();
        url = this._getURL(doc, null, 2);
      } else {
        displayText = doc.longname;
        indexText = displayText.toLowerCase();
        url = this._getURL(doc, null, 2);
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
