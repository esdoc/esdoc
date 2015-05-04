---
layout: "default"
isPage: true
---

**CAUTION: ESDoc is super alpha version!**

ESDoc is API Documentation Generator for JavaScript(ES6).

# Feature
- Generate detailed document.
- Measure document coverage.
- Associate test code to document.
- Target at ES6 ``class`` and ``import/export`` style.

# Demo
TODO: create more better demo.

- [http://h13i32maru.github.io/color-logger/](http://h13i32maru.github.io/color-logger/)
- [http://h13i32maru.github.io/esdoc-test-fixture/](http://h13i32maru.github.io/esdoc-test-fixture/)

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

# License
MIT

