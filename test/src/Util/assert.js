import assert from 'power-assert';
import Logger from '../../../src/Util/Logger.js';

export default assert;

let TAG = 'assert';
assert.doc = function(doc, obj) {
  for (let key of Object.keys(obj)) {
    if (key in doc) {
      assert.deepEqual(doc[key], obj[key]);
    } else {
      Logger.w(TAG, `"${key}" is not found in doc. doc.longname = "${doc.longname}"`);
    }
  }
};

