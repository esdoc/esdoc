import path from 'path';

/**
 * Plugin system for your plugin.
 */
class Plugin {
  /**
   * create instance.
   */
  constructor() {
    this._plugins = null;
  }

  /**
   * initialize with plugin property.
   * @param {Array<{name: string, option: object}>} plugins - expect config.plugins property.
   */
  init(plugins = []) {
    this.onHandlePlugins(plugins);
  }

  /**
   * exec plugin handler.
   * @param {string} handlerName - handler name(e.g. onHandleCode)
   * @param {PluginEvent} ev - plugin event object.
   * @private
   */
  _execHandler(handlerName, ev) {
    /* eslint-disable global-require */
    for (const item of this._plugins) {
      let plugin;
      if (item.name.match(/^[.\/]/)) {
        const pluginPath = path.resolve(item.name);
        plugin = require(pluginPath);
      } else {
        module.paths.push('./node_modules');
        plugin = require(item.name);
        module.paths.pop();
      }

      if (!plugin[handlerName]) continue;

      ev.data.option = item.option;
      plugin[handlerName](ev);
    }
  }

  onHandlePlugins(plugins) {
    this._plugins = plugins;
    const ev = new PluginEvent({plugins});
    this._execHandler('onHandlePlugins', ev);
    this._plugins = ev.data.plugins;
  }

  /**
   * handle start.
   */
  onStart() {
    const ev = new PluginEvent();
    this._execHandler('onStart', ev);
  }

  /**
   * handle config.
   * @param {ESDocConfig} config - original esdoc config.
   * @returns {ESDocConfig} handled config.
   */
  onHandleConfig(config) {
    const ev = new PluginEvent({config});
    this._execHandler('onHandleConfig', ev);
    return ev.data.config;
  }

  /**
   * handle code.
   * @param {string} code - original code.
   * @param {string} filePath - source code file path.
   * @returns {string} handled code.
   */
  onHandleCode(code, filePath) {
    const ev = new PluginEvent({code});
    ev.data.filePath = filePath;
    this._execHandler('onHandleCode', ev);
    return ev.data.code;
  }

  /**
   * handle code parser.
   * @param {function(code: string)} parser - original js parser.
   * @param {object} parserOption - default babylon options.
   * @param {string} filePath - source code file path.
   * @param {string} code - original code.
   * @returns {{parser: function(code: string), parserOption: Object}} handled parser.
   */
  onHandleCodeParser(parser, parserOption, filePath, code) {
    const ev = new PluginEvent();
    ev.data = {parser, parserOption, filePath, code};
    this._execHandler('onHandleCodeParser', ev);
    return {parser: ev.data.parser, parserOption: ev.data.parserOption};
  }

  /**
   * handle AST.
   * @param {AST} ast - original ast.
   * @param {string} filePath - source code file path.
   * @param {string} code - original code.
   * @returns {AST} handled AST.
   */
  onHandleAST(ast, filePath, code) {
    const ev = new PluginEvent({ast});
    ev.data.filePath = filePath;
    ev.data.code = code;
    this._execHandler('onHandleAST', ev);
    return ev.data.ast;
  }

  /**
   * handle docs.
   * @param {Object[]} docs - docs.
   * @returns {Object[]} handled docs.
   */
  onHandleDocs(docs) {
    const ev = new PluginEvent({docs});
    this._execHandler('onHandleDocs', ev);
    return ev.data.docs;
  }

  /**
   * handle publish
   * @param {function(filePath: string, content: string)} writeFile - write content.
   * @param {function(srcPath: string, destPath: string)} copyDir - copy directory.
   * @param {function(filePath: string):string} readFile - read content.
   */
  onPublish(writeFile, copyDir, readFile) {
    const ev = new PluginEvent({});

    // hack: fixme
    ev.data.writeFile = writeFile;
    ev.data.copyFile = copyDir;
    ev.data.copyDir = copyDir;
    ev.data.readFile = readFile;

    this._execHandler('onPublish', ev);
  }

  /**
   * handle content.
   * @param {string} content - original content.
   * @param {string} fileName - the fileName of the HTML file.
   * @returns {string} handled HTML.
   */
  onHandleContent(content, fileName) {
    const ev = new PluginEvent({content, fileName});
    this._execHandler('onHandleContent', ev);
    return ev.data.content;
  }

  /**
   * handle complete
   */
  onComplete() {
    const ev = new PluginEvent();
    this._execHandler('onComplete', ev);
  }
}

/**
 * Plugin Event class.
 */
export class PluginEvent {
  /**
   * create instance.
   * @param {Object} data - event content.
   */
  constructor(data = {}) {
    this.data = copy(data);
  }
}

function copy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Instance of Plugin class.
 */
export default new Plugin();
