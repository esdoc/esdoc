import FileDoc from './FileDoc.js';

/**
 * Doc class for test code file.
 */
export default class TestFileDoc extends FileDoc {
  /** set ``testFile`` to kind. */
  ['@_kind']() {
    this._value.kind = 'testFile';
  }
}
