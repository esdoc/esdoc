---
layout: "default"
isPage: true
---

ESDoc is API Documentation Generator for JavaScript(ES6).

<img class="screen-shot" src="./image/top.png">

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

# License
MIT

