[![Build Status](https://travis-ci.org/h13i32maru/esdoc.svg?branch=master)](https://travis-ci.org/h13i32maru/esdoc)
[![Coverage Status](https://coveralls.io/repos/h13i32maru/esdoc/badge.svg)](https://coveralls.io/r/h13i32maru/esdoc)
# ESDoc

ESDoc is API Documentation Generator for JavaScript(like JSDoc).

- [Demo](#demo)
- [Install](#install)
- [Usage](#usage)
- [Config](#config)
- [Tags](#tags)
  - [For Common](#for-Common)
  - [For Class](#for-Class)
  - [For Method And Function](#for-method-and-function)
  - [For Member And Variable](#for-member-and-variable)
  - [For Virtual](#for-member-and-variable)
- [API](#api)
- [Internal Data Structure](#internal-data-structure)

# Demo
- todo

# Install
sorry, not yet publish to npmjs.org

```
npm install -g h13i32maru.esdoc
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

# Config

ESDoc config file.

```json
{
  "source": "./path/to/src",
  "destination": "./path/to/esdoc",
  "pattern": "\\.js$",
  "access": ["public", "protected", "private"],
  "onlyExported": true,
  "importPathPrefix": "",
  "readme": "./path/to/README.md",
  "package": "./path/to/package.json",
  "styles": ["./path/to/style.css"],
  "scripts": ["./path/to/script.js"]
}
```

- ``source`` (required)
  - directory path of JavaScript source codes.
- ``destination`` (required)
  - output directory path.
- ``pattern``
  - process only files that are matched with the regexp.
  - default: ``null``
- ``access``
  - process only symbols(class, method, function, etc...) that are have the access(public, protected and private).
  - default: ``["public", "protected", "private"]``
- ``onlyExported``
  - process only symbols that are exported(ES6 export syntax).
  - e.g. ``export MyClass {...}`` is exported, ``MyClass{}`` is not exported.
  - default: ``false``
- ``importPathPrefix``
  - display symbol's import path with the prefix.
  - e.g. if ``MyClass`` in ``src/foo/MyClass.js``, import path is ``import MyClass from 'src/foo/MyClass.js'``. but specified the prefix with ``importPathPrefix: "out"``, import path is ``import MyClass from 'out/src/foo/MyClass.js'``.
  - default: ``""``
- ``readme``
  - includes README.md into out put document.
  - default: null
- ``package``
  - use info(version, url, etc...) in package.json
- ``styles``
  - includes styles into out put document.
  - default: ``null``
- ``scripts``
  - includes scripts into out put document.
  - default: ``null``
  
# Tags
Documentation tags are similar to JSDoc tags.

e.g.

```javascript
/**
 * this is MyClass description.
 * @example
 * let myClass = new MyClass();
 */
class MyClass {
  /**
   * this is constructor description.
   * @param {number} arg1 this is arg1 description.
   * @param {string[]} arg2 this is arg2 description.
   */ 
  constructor(arg1, arg2) {...}
}
```

### For Common
#### @access
``@access <public|protected|private>``

alias are ``@public``, ``@protected`` and ``@private``.

```javascript
/**
 * @access public
 */
class MyClass {
  /**
   * @private
   */
  _method(){...}
}
```

#### @deprecated
``@deprecated [description]``

```javascript
/**
 * @deprecated use MyClassEx instead of this.
 */
class MyClass{...}
```

#### @desc
``@desc <description>``

the first line is processed as automatically @desc.

```javascript
/**
 * @desc this is description.
 */
class MyClass{...}

/**
 * this is description.
 */
class MyClass{...}
```

#### @example
``@example <JavaScript>``

```javascript
/**
 * @example
 * let myClass = new MyClass();
 * let result = myClass.foo();
 * console.log(result);
 * 
 * @example
 * let result MyClass.bar();
 * console.log(result);
 */
class MyClass{...}
```

#### @experimental
``@experimental [description]``

```javascript
/**
 * @experimental this class includes breaking change.
 */
class MyClass{...}
```

#### @ignore
``@ignore``

symbol is not diaplayed in document.

```javascript
/**
 * @ignore
 */
class MyClass{...}
```

#### @see
``@see <URL>``

```javascript
/**
 * @see http://example.com
 * @see http://example.org
 */
class MyClass{...}
```

#### @since
``@since <version>``

```javascript
/**
 * @since 0.0.1
 */
class MyClass{...}
```

#### @todo
``@todo <description>``

```javascript
/**
 * @todo support multi byte character.
 * @todo cache calculation result.
 */
class MyClass{...}
```

#### @version
``@version <version>``

```javascript
/**
 * @version 1.2.3
 */
class MyClass{...}
```

### For Class
#### @extends
``@extends <symbol>``

normally automatically detected. because ES6 has the extends syntax. howerver, you want to use this tag if you want to explicitly specify.

```javascript
/**
 * @extends {SuperClass1}
 * @extends {SuperClass2}
 */
class MyClass extends mix(SuperClass1, SuperClass2) {...}
```

#### @implements
``@implements <symbol>``

```javascript
/**
 * @implements {MyInterface1}
 * @implements {MyInterface2}
 */
class MyClass {...}
```

#### @interface
``@interface``

```javascript
/**
 * @interface
 */
class MyInterface {...}
```

### For Method And Function
#### @abstract
``@abstract``

```javascript
class MyClass {
  /**
   * this method must be overridden by sub class.
   * @abstract
   */
  method(){...}
}
```

#### @emits
``@emits <symbol> [description]``

```javascript
class MyClass {
  /**
   * @emits {MyEvent1} emit event when foo.
   * @emits {MyEvent2} emit event when bar.
   */
  method(){...}
}
```

#### @listens
``@listens <symbol> [description]``

```javascript
class MyClass {
  /**
   * @listens {MyEvent1} listen event because foo.
   * @listens {MyEvent2} listen event because bar.
   */
  method(){...}
}
```

#### @override
``@override``

```javascript
class MyClass extends SuperClass {
  /**
   * @override
   */
  method(){...}
}
```

#### @param
``@param <type> <name> [description]``

```javascript
class MyClass {
  /**
   * @param {number} p this is p description.
   */
  method(p){...}
}
```

| pattern | syntax |
|------------|-------------|
| Array | ``@param {number[]} p`` |
| Union | ``@param {number|string} p`` |
| Nullable | ``@param {?number} p`` |
| Not Nullable | ``@param {!number} p`` |
| Spread | ``@param {...number} p`` |
| Optional | ``@param {number} [p]`` |
| Default | ``@param {number} [p=10]`` |
| Object | ``@param {Object} p`` <br> ``@param {number} p.foo`` <br> ``@param {string} p.bar`` |


#### @return
``@return <type> [description]``

```javascript
class MyClass {
  /**
   * @return {number} this is description.
   */
  method(){...}
}
```

if return Object, can use ``@property <type> <name> [description]`` for each properties.

```javascript
class MyClass {
  /**
   * @return {Object} this is description.
   * @property {number} foo this is description.
   * @property {number} bar this is description.
   */
  method(){...}
}
```

#### @throws
``@throws <symbol> [description]``

```javascript
class MyClass {
  /**
   * @throws {MyError1} throw error when foo.
   * @throws {MyError2} throw error when bar.
   */
  method(){...}
}
```

### For Member And Variable
#### @type
``@type <type>``

```javascript
class MyClass {
  constructor() {
    /**
     * @type {number}
     */
    this.p = 123;
  }
}
```

if type is Object, can use ``@property <type> <name> [description]`` for each properties.

```javascript
class MyClass {
  constructor() {
    /**
     * @type {Object}
     * @property {number} p.foo
     * @property {string} p.bar
     */
    this.p = {foo: 123, bar: "abc"};
  }
}
```

### For Virtual
#### @external
``@external <symbol>``

should be use with ``@see``.

```javascript
/**
 * @external {XMLHttpRequest}
 * @see https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest
 */
```

#### @typedef
``@typedef <type> <name>``

```javascript
/**
 * @typedef {number|string} MyType
 */
```

if type is Object, can use ``@property <type> <name> [description]`` for each properties.

```javascript
/**
 * @typedef {Object} MyType
 * @property {number} foo this is description.
 * @property {string} bar this is description.
 */
```

### For Internal
the following tags are usually no need to use.

- @kind
- @static
- @name
- @memberof
- @longname
- @export
- @importPath
- @importStyle
- @lineNumber
- @content

# API
```javascript
import esdoc from 'esdoc';

esdoc(config, (results, config)=>{
  console.log(results);
});
```

# Internal Data Structure
- todo
