![Owner Status](https://img.shields.io/badge/owner-busy-red.svg)
[![Build Status](https://travis-ci.org/esdoc/esdoc.svg?branch=master)](https://travis-ci.org/esdoc/esdoc)
[![Coverage Status](https://coveralls.io/repos/esdoc/esdoc/badge.svg)](https://coveralls.io/r/esdoc/esdoc)
[![Document](https://doc.esdoc.org/github.com/esdoc/esdoc/badge.svg?t=0)](https://doc.esdoc.org/github.com/esdoc/esdoc)

# ESDoc

ESDoc is a documentation generator for JavaScript(ES6).

<img class="screen-shot" src="https://esdoc.org/image/top.png" width="500px" style="max-width: 500px; border: 1px solid rgba(0,0,0,0.1); box-shadow: 1px 1px 1px rgba(0,0,0,0.5);">

# Feature
- Generates detailed documentation.
- Measures documentation coverage.
- Integrate test codes into documentation.
- Integrate manual into documentation.
- [ESDoc Hosting Service](https://doc.esdoc.org)

# Demo
- [ESDoc](https://esdoc.org/esdoc) is self-hosting &#x1F604;

# Install

```
npm install -g esdoc
esdoc -h
```

# Usage
## Create a separate configuration file
You can create a separate configuration file in JSON or JavaScript format.
To use it, you should pass the location of this file to ESDoc; ESDoc does not search for files.

JSON example:
```bash
esdoc -c esdoc.json
```

```json
{
  "source": "./src",
  "destination": "./doc/out/esdoc"
}
```

JavaScript example:
```bash
esdoc -c esdoc.js
```

```javascript
module.exports = {
  source: './src',
  destination: './doc/out/esdoc'
}
```

## Add configuration to your package.json
You can also add the configuration for ESDoc inside your package.json.
Simply add a new object with `esdoc` as its key and provide JSON-formatted configuration.


Package example:
```bash
esdoc
```

```json
{
  "name": "esdoc",
  "version": "0.4.6",
  "description": "Documentation Generator For JavaScript(ES6)",
  "author": "h13i32maru",
  "homepage": "https://esdoc.org/",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/esdoc/esdoc"
  },
  "esdoc": {
    "source": "./src",
    "destination": "./doc/out/esdoc"
  }
}
```

# Example
```
├── esdoc.json
└── src/MyClass.js
```

``src/MyClass.js``

```javascript
/**
 * this is MyClass.
 */
export default class MyClass {
  /**
   * @param {number} param this is param.
   * @return {number} this is return.
   */
  method(param){}
}
```

``esdoc.json``

```json
{
  "source": "./src",
  "destination": "./esdoc"
}
```

exec esdoc

```
esdoc -c esdoc.json
open ./esdoc/index.html
```

# Document
please visit [esdoc.org](https://esdoc.org) to see more documentation.

# License
MIT

# Author
[Ryo Maruyama@h13i32maru](https://twitter.com/h13i32maru)
