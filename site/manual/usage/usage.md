# Usage
- [Installation](#installation)
- [Configuration](#configuration)
- [Writing Tags](#writing-tags)

## Installation
Install ESDoc from npm.

```sh
# install to a global
npm install --global esdoc
esdoc -h

# install to a project
cd your-project/
npm install --save-dev esdoc
./node_modules/.bin/esdoc -h
```

If you want to use latest developing version, you can install from GitHub.

```sh
git clone git@github.com:esdoc/esdoc.git
cd esdoc/
npm install
npm run test
npm run build
npm install --global ./
esdoc -h
```

## Configuration
The minimum configuration is the following JSON. All configurations are [here](./configuration/config.html).

<p class="file-path">.esdoc.json</p>
```json
{
  "source": "./src",
  "destination": "./doc"
}
```

ESDoc automatically finds the configuration file path by the order, if you don't specify `-c esdoc.json`.

1. `.esdoc.json` in the current directory
2. `.esdoc.js` in the current directory
3. `esdoc` property in `package.json`

## Writing Tags
ESDoc supports some documentation tags(aka. jsdoc tags). All tags are [here](./usage/tags.html).

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
esdoc
open ./doc/index.html
```

