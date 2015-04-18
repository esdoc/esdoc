---
layout: "default"
isPage: true
---

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

## All Tags
- [For Common](#for-common)
  - [@access](#-access)
  - [@deprecated](#-deprecated)
  - [@desc](#-desc)
  - [@example](#-example)
  - [@experimental](#-experimental)
  - [@ignore](#-ignore)
  - [@see](#-see)
  - [@since](#-since)
  - [@todo](#-todo)
  - [@version](#-version)
- [For Class](#for-class)
  - [@extends](#-extends)
  - [@implements](#-implements)
  - [@interface](#-interface)
- [For Method And Function](#for-method-and-function)
  - [@abstract](#-abstract)
  - [@emits](#-emits)
  - [@listens](#-listens)
  - [@override](#-override)
  - [@param](#-param)
  - [@return](#-return)
  - [@throws](#-throws)
- [For Member And Variable](#for-member-and-variable)
  - [@type](#-type)
- [For Virtual](#for-member-and-variable)
  - [@external](#-external)
  - [@typedef](#-typedef)
- [Type Syntax](#type-syntax)
  - [Simple](#simple)
  - [Array](#array)
  - [Union](#union)
  - [Nullable And Not Nullable](#nullable-and-not-nullable)
  - [Spread](#spread)
  - [Optional And Default](#optional-and-default)
  - [Object](#object)

## For Common
#### @access
syntax: ``@access <public|protected|private>``

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
syntax: ``@deprecated [description]``

```javascript
/**
 * @deprecated use MyClassEx instead of this.
 */
class MyClass{...}
```

#### @desc
syntax: ``@desc <description>``

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
syntax: ``@example <JavaScript>``

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
syntax: ``@experimental [description]``

```javascript
/**
 * @experimental this class includes breaking change.
 */
class MyClass{...}
```

#### @ignore
syntax: ``@ignore``

symbol is not diaplayed in document.

```javascript
/**
 * @ignore
 */
class MyClass{...}
```

#### @see
syntax: ``@see <URL>``

```javascript
/**
 * @see http://example.com
 * @see http://example.org
 */
class MyClass{...}
```

#### @since
syntax: ``@since <version>``

```javascript
/**
 * @since 0.0.1
 */
class MyClass{...}
```

#### @todo
syntax: ``@todo <description>``

```javascript
/**
 * @todo support multi byte character.
 * @todo cache calculation result.
 */
class MyClass{...}
```

#### @version
syntax: ``@version <version>``

```javascript
/**
 * @version 1.2.3
 */
class MyClass{...}
```

## For Class
#### @extends
syntax: ``@extends <symbol>``

normally automatically detected. because ES6 has the extends syntax. howerver, you want to use this tag if you want to explicitly specify.

```javascript
/**
 * @extends {SuperClass1}
 * @extends {SuperClass2}
 */
class MyClass extends mix(SuperClass1, SuperClass2) {...}
```

#### @implements
syntax: ``@implements <symbol>``

```javascript
/**
 * @implements {MyInterface1}
 * @implements {MyInterface2}
 */
class MyClass {...}
```

#### @interface
syntax: ``@interface``

```javascript
/**
 * @interface
 */
class MyInterface {...}
```

## For Method And Function
#### @abstract
syntax: ``@abstract``

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
syntax: ``@emits <symbol> [description]``

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
syntax: ``@listens <symbol> [description]``

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
syntax: ``@override``

```javascript
class MyClass extends SuperClass {
  /**
   * @override
   */
  method(){...}
}
```

#### @param
syntax: ``@param <type> <name> [description]``

about ``<type>`` to see [Type Syntax](#type-syntax)

```javascript
class MyClass {
  /**
   * @param {number} p this is p description.
   */
  method(p){...}
}
```

#### @return
syntax: ``@return <type> [description]``

about ``<type>`` to see [Type Syntax](#type-syntax)

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
syntax: ``@throws <symbol> [description]``

```javascript
class MyClass {
  /**
   * @throws {MyError1} throw error when foo.
   * @throws {MyError2} throw error when bar.
   */
  method(){...}
}
```

## For Member And Variable
#### @type
syntax: ``@type <type>``

about ``<type>`` to see [Type Syntax](#type-syntax)

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

## For Virtual
#### @external
syntax: ``@external <symbol>``

should be use with ``@see``.

```javascript
/**
 * @external {XMLHttpRequest} https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest
 */
```

#### @typedef
syntax: ``@typedef <type> <name>``

about ``<type>`` to see [Type Syntax](#type-syntax)

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

## Type Syntax

``@param``, ``@return``, ``@type`` and ``@typedef`` are support the following type syntax.

### Simple
```javascript
/**
 * @param {number} paramName this is simple param.
 */
function(paramName){...}
```
### Array
```javascript
/**
 * @param {number[]} paramName this is array param.
 */
function(paramName){...}
```

### Union
```javascript
/**
 * @param {number|string} paramName this is union param.
 */
function(paramName){...}
```

### Nullable And Not Nullable
```javascript
/**
 * @param {?number} paramName this is nullable param.
 */
function(paramName){...}

/**
 * @param {!number} paramName this is not nullable param.
 */
function(paramName){...}

/**
 * @param {?(number|string)} paramName this is nullable and union param.
 */
function(paramName){...}
```

### Spread
```javascript
/**
 * @param {...number} paramName this is spread param.
 */
function(...paramName){...}
```

### Optional And Default
```javascript
/**
 * @param {number} [paramName] this is optional param.
 */
function(...paramName){...}

/**
 * @param {number} [paramName=10] this is default param.
 */
function(...paramName){...}
```

### Object
```javascript
/**
 * @param {Object} paramName this is object param.
 * @param {number} paramName.foo this is property param.
 * @param {string} paramName.bar this is property param.
 */
function(...paramName){...}
```

## For Internal
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

