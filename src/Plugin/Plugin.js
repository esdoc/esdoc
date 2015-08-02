import path from 'path';

class Plugin {
  constructor()  {
    this._plugins = null;
  }

  init(plugins = []) {
    this._plugins = copy(plugins);
  }

  _execHandler(handlerName, ev, giveOption = false) {
    for (let item of this._plugins) {
      let plugin;
      if (item.name.match(/^[.\/]/)) {
        const pluginPath = path.resolve(item.name);
        plugin = require(pluginPath);
      } else {
        plugin = require(item.name);
      }

      if (!plugin[handlerName]) continue;

      if (giveOption) ev.data.option = item.option;

      plugin[handlerName](ev);
    }
  }

  onStart() {
    const ev = new PluginEvent();
    this._execHandler('onStart', ev, true);
  }

  onHandleConfig(config) {
    const ev = new PluginEvent({config});
    this._execHandler('onHandleConfig', ev);
    return ev.data.config;
  }

  onHandleCode(code) {
    const ev = new PluginEvent({code});
    this._execHandler('onHandleCode', ev);
    return ev.data.code;
  }

  onHandleCodeParser(parser) {
    const ev = new PluginEvent();
    ev.data.parser = parser;
    this._execHandler('onHandleCodeParser', ev);
    return ev.data.parser;
  }

  onHandleAST(ast) {
    const ev = new PluginEvent({ast});
    this._execHandler('onHandleAST', ev);
    return ev.data.ast;
  }

  onHandleTag(tag) {
    const ev = new PluginEvent({tag});
    this._execHandler('onHandleTag', ev);
    return ev.data.tag;
  }

  onHandleHTML(html) {
    const ev = new PluginEvent({html});
    this._execHandler('onHandleHTML', ev);
    return ev.data.html;
  }

  onComplete() {
    const ev = new PluginEvent();
    this._execHandler('onComplete', ev);
  }
}

class PluginEvent {
  constructor(data = {}) {
    this.data = copy(data);
  }
}

function copy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export default new Plugin();
