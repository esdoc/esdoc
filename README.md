[![Build Status](https://travis-ci.org/typhonjs-node-esdoc/esdoc.svg?branch=master)](https://travis-ci.org/typhonjs-node-esdoc/esdoc)
[![Coverage](https://img.shields.io/codecov/c/github/typhonjs-node-esdoc/esdoc.svg)](https://codecov.io/github/typhonjs-node-esdoc/esdoc)
[![Documentation](http://docs.typhonjs.io/typhonjs-node-esdoc/esdoc/badge.svg)](http://docs.typhonjs.io/typhonjs-node-esdoc/esdoc/)
[![Dependency Status](https://www.versioneye.com/user/projects/5750850d91bfda00363192af/badge.svg?style=flat)](https://www.versioneye.com/user/projects/5750850d91bfda00363192af)
[![Gitter](https://img.shields.io/gitter/room/typhonjs/TyphonJS.svg)](https://gitter.im/typhonjs/TyphonJS)

This is a maintained fork of ESDoc that will rapidly see new features and bug fixes. Hopefully one day it can be contributed upstream when the original author is ready. Stay tuned to [Ongoing Refactoring](https://github.com/typhonjs-node-esdoc/esdoc/issues/1) to keep informed on current progress.

To include in your project add to `package.json` in devDependencies: `"esdoc": "git+https://git@github.com/typhonjs-node-esdoc/esdoc.git"`. Please note that this directly links to Github. If you want to pull in the latest version on Github just delete your `./node_modules/esdoc` directory and run `npm install` again. 

Fork maintainer: [Mike Leahy](https://github.com/typhonrt)

# ESDoc

ESDoc is a documentation generator for JavaScript(ES6).

<img class="screen-shot" src="https://esdoc.org/image/top.png" width="500px" style="max-width: 500px; border: 1px solid rgba(0,0,0,0.1); box-shadow: 1px 1px 1px rgba(0,0,0,0.5);">

# Features
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

```
esdoc -c esdoc.json
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

# Documentation
please visit [esdoc.org](https://esdoc.org) to see more documentation.

# License
MIT

# Author
[Ryo Maruyama@h13i32maru](https://twitter.com/h13i32maru)
