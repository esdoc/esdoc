/**
 * ESDoc config object.
 * @typedef {Object} ESDocConfig
 * @property {!string} source - directory path of javascript source code.
 * @property {!string} destination - directory path of output.
 * @property {string} [title]
 * @property {string[]} [includes=["\\.(js|es6)$"]]
 * @property {string[]} [excludes=["\\.config\\.(js|es6)$"]]
 * @property {string[]} [access=["public", "protected", "package", "private"]]
 * @property {boolean} [autoPrivate=true]
 * @property {boolean} [builtinExternal=true]
 * @property {boolean} [unexportedIdentifier=false]
 * @property {boolean} [undocumentIdentifier=true]
 * @property {boolean} [coverage=true]
 * @property {boolean} [debug=false]
 * @property {boolean} [outputAST=true]
 * @property {string} [index="./README.md"]
 * @property {string} [package="./package.json"]
 * @property {string[]} [styles=[]]
 * @property {string[]} [scripts=[]]
 * @property {{type: string, source: string, includes: string[], excludes: string[]}} test
 * @property {Object} [manual]
 * @property {boolean} manual.globalIndex
 * @property {string} manual.asset
 * @property {string} manual.index
 * @property {string[]} manual.overview
 * @property {string[]} manual.design
 * @property {string[]} manual.installation
 * @property {string[]} manual.usage
 * @property {string[]} manual.tutorial
 * @property {string[]} manual.configuration
 * @property {string[]} manual.example
 * @property {string[]} manual.advanced
 * @property {string[]} manual.faq
 * @property {string[]} manual.changelog
 * @property {Object} [experimentalProposal]
 * @property {boolean} experimentalProposal.classProperties
 * @property {boolean} experimentalProposal.objectRestSpread
 * @property {boolean} experimentalProposal.doExpressions
 * @property {boolean} experimentalProposal.functionBind
 * @property {boolean} experimentalProposal.functionSent
 * @property {boolean} experimentalProposal.asyncGenerators
 * @property {boolean} experimentalProposal.decorators
 * @property {boolean} experimentalProposal.exportExtensions
 * @property {boolean} experimentalProposal.dynamicImport
 * @see https://esdoc.org/config.html
 */

/**
 * doc comment tag.
 * @typedef {Object} Tag
 * @property {string} tagName
 * @property {*} tagValue
 */

/**
 * Parsed doc comment.
 * @typedef {Object} DocObject
 */

/**
 * @typedef {Object} AST
 * @property {Object} body
 * @property {Object[]} leadingComments
 * @see https://github.com/estree/estree
 */

/**
 * @typedef {Object} ASTNode
 * @see https://github.com/estree/estree
 * @property {string} type
 * @property {Object} [superClass]
 * @property {Object[]} [leadingComments]
 * @property {Object[]} [trailingComments]
 * @property {Object[]} [body]
 * @property {ASTNode} [parent] - this is customize by ESDoc
 */

/**
 * @typedef {Object} NPMPackageObject
 * @see https://docs.npmjs.com/files/package.json
 */

/**
 * @typedef {Object} Taffy
 * @see http://www.taffydb.com/
 */

/**
 * @typedef {Object} IceCap
 * @see https://github.com/h13i32maru/ice-cap
 */

/**
 * @typedef {Object} CoverageObject
 * @property {string} coverage - ratio.
 * @property {number} expectCount - all identifier count.
 * @property {number} actualCount - documented identifier count.
 * @property {Object<string, Object>} files - file name and coverage.
 */

/**
 * ESDocCLI uses argv
 * @typedef {Object} ESDocCLIArgv
 * @property {boolean} [h] - for help
 * @property {boolean} [help] - for help
 * @property {boolean} [v] - for version
 * @property {boolean} [version] - for version
 * @property {string} [c] - for config file path
 * @property {string[]} [_] - for source directory path
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
 * @typedef {Object} ParsedParam
 * @property {boolean} [nullable]
 * @property {string[]} types
 * @property {boolean} [spread]
 * @property {boolean} [optional]
 * @property {string} [defaultValue]
 * @property {*} [defaultRaw]
 * @property {string} [name]
 * @property {string} [description]
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

/**
 * @typedef {Object} ManualConfigItem
 * @property {string} label
 * @property {string[]} paths
 * @property {string} [fileName]
 * @property {string} [reference]
 */
"use strict";