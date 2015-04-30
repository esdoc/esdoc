import FileDoc from './FileDoc.js';

export default class TestFileDoc extends FileDoc {
  ['@kind']() {
    this._value.kind = 'testFile';
  }
}
