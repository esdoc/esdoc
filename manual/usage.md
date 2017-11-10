# Usage
- [Installation](#installation)
- [Configuration](#configuration)
- [Writing Tags](#writing-tags)

## Installation
Install esdoc2 and standard-plugin from npm.

```sh
cd your-project/
npm install --save-dev esdoc2 esdoc2-standard-plugin
./node_modules/.bin/esdoc2 -h
```

## Configuration
The minimum configuration is the following JSON. All configurations are [here](./config.html).

<p class="file-path">.esdoc2.json</p>
```json
{
  "source": "./src",
  "destination": "./docs",
  "plugins": [
    {"name": "esdoc2-standard-plugin"}
  ]
}
```

esdoc2 automatically finds the configuration file path by the order, if you don't specify `-c esdoc2.json`.

1. `.esdoc2.json` in the current directory
2. `.esdoc2.js` in the current directory
3. `esdoc2` property in `package.json`

## Writing Tags
esdoc2 supports some documentation tags(aka. jsdoc tags). All tags are [here](./tags.html).

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

And run esdoc2.
```
./node_modules/.bin/esdoc2
open ./docs/index.html
```

