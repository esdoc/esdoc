export default class Logger {
  static get debug() {
    return this._debug;
  }

  static set debug(v) {
    this._debug = v;
  }

  static v(tag, ...msg) {
    // WebStorm occur error with `this.debug`.
    if (this['debug']) console.log('[35m[V]', `[${tag}]`, ...msg, '[0m'); // purple
  }

  static d(tag, ...msg) {
    if (this['debug']) console.debug('[34m[D]', `[${tag}]`, ...msg, '[0m'); // blue
  }

  static i(tag, ...msg) {
    if (this['debug']) console.info('[32m[I]', `[${tag}]`, ...msg, '[0m'); // green
  }

  static w(tag, ...msg) {
    if (this['debug']) console.warn('[33m[W]', `[${tag}]`, ...msg, '[0m'); // yello
  }

  static e(tag, ...msg) {
    if (this['debug']) console.error('[31m[E]', `[${tag}]`, ...msg, '[0m'); // red
  }
}

// ASCII ESCAPE SEQUENCE http://www5c.biglobe.ne.jp/~ecb/assembler2/b_2.html
