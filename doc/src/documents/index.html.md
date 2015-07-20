---
layout: "default"
isPage: true
---

ESDoc is a documentation generator for JavaScript(ES6).

<img class="screen-shot" src="./image/top.png">

# Feature
- Generates detailed documentation.
- Measures documentation coverage.
- Integrate test codes into documentation.

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

<p class="file-path">src/MyClass.js</p>

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

<p class="file-path">esdoc.json</p>

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

