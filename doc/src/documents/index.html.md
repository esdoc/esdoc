---
layout: "default"
isPage: true
---

ESDoc is a documentation generator for JavaScript(ES6).

<img class="screen-shot" src="./image/top.png">

# Feature
- Generates detailed document.
- Measures document coverage.
- Cross reference of test and document.
- Targets at ES6 ``class`` and ``import/export`` style.

# Demo
- [ESDoc](https://esdoc.org/esdoc) is self-hosting &#x1F604;
- Libraries written by ES6 without document tags
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
  "destination": "./esdoc"
}
```

exec esdoc

```
esdoc -c esdoc.json
open ./esdoc/index.html
```

# License
MIT

