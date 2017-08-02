# Usage
- [Installation](#installation)
- [Configuration](#configuration)
- [Writing Tags](#writing-tags)

## Installation
Install ESDoc and standard-plugin from npm.

```sh
cd your-project/
npm install --save-dev esdoc esdoc-standard-plugin
./node_modules/.bin/esdoc -h
```

## Configuration
The minimum configuration is the following JSON. All configurations are [here](./config.html).

<p class="file-path">.esdoc.json</p>
```json
{
  "source": "./src",
  "destination": "./docs",
  "plugins": [
    {"name": "esdoc-standard-plugin"}
  ]
}
```

ESDoc automatically finds the configuration file path by the order, if you don't specify `-c esdoc.json`.

1. `.esdoc.json` in the current directory
2. `.esdoc.js` in the current directory
3. `esdoc` property in `package.json`

## Writing Tags
ESDoc supports some documentation tags(aka. jsdoc tags). All tags are [here](./tags.html).

```javascript
/**
 * this is MyClass.
 */
export default class MyClass {
  /**
   * @param {number} a - this is a value.
   * @param {number} b - this is a value.
   * @return {number} result of the sum value.
   */
  sum(a, b){
    return a + b;
  }
}
```

And run ESDoc.
```
./node_modules/.bind/esdoc
open ./docs/index.html
```

