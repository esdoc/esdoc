import {cli, readTags} from './util.js';

cli('./test/fixture/package/esdoc.json');
global.tags = readTags('./test/fixture/dest/esdoc/dump.json');
