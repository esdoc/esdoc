[![Build Status](https://travis-ci.org/h13i32maru/esdoc.svg?branch=master)](https://travis-ci.org/h13i32maru/esdoc)
[![Coverage Status](https://coveralls.io/repos/h13i32maru/esdoc/badge.svg)](https://coveralls.io/r/h13i32maru/esdoc)
<span class="esdoc-coverage"></span>

# ESDoc

ESDoc is API Documentation Generator for JavaScript(ES6).

<img class="screen-shot" src="https://esdoc.org/image/top.png" style="max-width: 500px; border: 1px solid rgba(0,0,0,0.1); box-shadow: 1px 1px 1px rgba(0,0,0,0.5);">

# Feature
- Generate detailed document.
- Measure document coverage.
- Associate test code to document.
- Target at ES6 ``class`` and ``import/export`` style.

# Demo
- [ESDoc](https://esdoc.org/esdoc) (self hosting)
- A ES6 software that does not have document tag.
  - [Aurelia HTTP Client](https://esdoc.org/demo/aurelia-http-client/esdoc)
  - [Aurelia Validation](https://esdoc.org/demo/aurelia-validation/esdoc)

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
  "destination": "./esdoc",
}
```

exec esdoc

```
esdoc -c esdoc.json
open ./esdoc/index.html
```

# Document
please visit [esdoc.org](https://esdoc.org) to see more document.

# License
MIT
