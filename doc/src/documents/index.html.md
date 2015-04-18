---
layout: "default"
isPage: true
---

[![Build Status](https://travis-ci.org/h13i32maru/esdoc.svg?branch=master)](https://travis-ci.org/h13i32maru/esdoc)
[![Coverage Status](https://coveralls.io/repos/h13i32maru/esdoc/badge.svg)](https://coveralls.io/r/h13i32maru/esdoc)
# ESDoc

[ESDoc](https://github.com/h13i32maru/esdoc) is API Documentation Generator for JavaScript(like JSDoc).

- [Demo](#demo)
- [Install](#install)
- [Usage](#usage)
- [Example](#example)
- [Config](config.html)
- [Tags](tags.html)
- [Customize](customize.html)

# Demo
TODO: create more better demo.

- http://h13i32maru.github.io/color-logger/
- http://h13i32maru.github.io/esdoc-test-fixture/

# Install
sorry, not yet publish to npmjs.org.
because I want use https://www.npmjs.com/package/esdoc, but the name is already used with empty software :(

```
cd your-project
git clone https://github.com/h13i32maru/esdoc
cd esdoc
npm install
npm run build
./bin/esdoc -h
```

# Usage
with config file.

```
esdoc -c esdoc.json
```

with directory path

```
esdoc ./path/to/js/dir
```

# Example
```
├── esdoc.json
├── esdoc/bin/esdoc
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
  "destination": "./esdoc",
}
```

exec esdoc

```
./esdoc/bin/esdoc -c esdoc.json
open ./esdoc/index.html
```

# Document
please visit [https://esdoc.org](esdoc.org) to see more document.

# License
MIT


