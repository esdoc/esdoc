/**
 * ESDoc config object.
 * @typedef {Object} ESDocConfig
 * @property {!string} source - directory path of javascript source code.
 * @property {!string} destination - directory path of output.
 * @property {string} [title]
 * @property {string[]} [includes=["\\.js$"]]
 * @property {string[]} [excludes=["\\.config.\\.js$"]]
 * @property {string[]} [access=["public", "protected"]]
 * @property {boolean} [autoPrivate=true]
 * @property {boolean} [defaultExternal=true]
 * @property {boolean} [onlyExported=true]
 * @property {boolean} [undocumentSymbol=true]
 * @property {boolean} [coverage=true]
 * @property {boolean} [debug=false]
 * @property {string} [readme="./README.md"]
 * @property {string} [package="./package.json"]
 * @property {string} [importPathPrefix=""]
 * @property {string[]} [styles=[]]
 * @property {string[]} [scripts=[]]
 * @property {{type: string, source: string, includes: string[], excludes: string[]}} test
 * @see https://esdoc.org/config.html
 */

/**
 * Parsed doc comment.
 * @typedef {Object} DocObject
 */

/**
 * @typedef {Object} DocTypedef
 */

/**
 * @typedef {Object} PackageTypedef
 * @property {Object} repository
 * @property {string} repository.url
 */

/**
 * @todo remove this typedef.
 * @typedef {Object} IceCapInstanceTypedef
 * @property {function} loop
 * @property {function} attr
 * @property {function} text
 * @property {function} load
 * @property {function} into
 * @property {function} drop
 * @property {string} html
 */

/**
 * @todo remove this typedef.
 * @typedef {Object} TaffyCursor
 * @property {function} each
 */
