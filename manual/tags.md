# Tags
Documentation tags are similar to JSDoc tags.

e.g.

```javascript
/**
 * this is MyClass description.
 * @example
 * let myClass = new MyClass();
 */
export default class MyClass {
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
  - [@link](#-link)
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
- [For Test](#for-test)
  - [@test](#-test)
- [Type Syntax](#type-syntax)
  - [Simple](#simple)
  - [Array](#array)
  - [Object](#object)
  - [Record](#record)
  - [Generics](#generics)
  - [Function](#function)
  - [Union](#union)
  - [Nullable And Not Nullable](#nullable-and-not-nullable)
  - [Spread](#spread)
  - [Optional And Default](#optional-and-default)
- [Identifier Syntax](#identifier-syntax)

## For Common
### @access
syntax: ``@access <public|protected|package|private>``

Alias are ``@public``, ``@protected``, ``@package``, and ``@private``.

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

----

### @deprecated
syntax: ``@deprecated [description]``

```javascript
/**
 * @deprecated use MyClassEx instead of this.
 */
class MyClass{...}
```

----

### @desc
syntax: ``@desc <description>``

``<description>`` supports markdown.

Normally you don't need to use ``@desc``, because first section in doc comment is determined automatically as ``@desc``.

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

----

### @example
syntax: ``@example <JavaScript>``

```javascript
/**
 * @example
 * let myClass = new MyClass();
 * let result = myClass.foo();
 * console.log(result);
 * 
 * @example
 * let result = MyClass.bar();
 * console.log(result);
 */
class MyClass{...}
```

And you can use ``<caption>...</caption>`` at first line.

```javascript
/**
 * @example <caption>This is caption</caption>
 * let myClass = new MyClass();
 */
class MyClass{...}
```

----

### @experimental
syntax: ``@experimental [description]``

```javascript
/**
 * @experimental this class includes breaking change.
 */
class MyClass{...}
```

----

### @ignore
syntax: ``@ignore``

The identifier is not displayed in document.

```javascript
/**
 * @ignore
 */
class MyClass{...}
```

----

### @link
syntax: ``{@link <identifier>}``

link other identifier

```javascript
/**
 * this is MyClass.
 * If device spec is low, you can use {@link MySimpleClass}.
 */
class MyClass{...}
```

----

### @see
syntax: ``@see <URL>``

```javascript
/**
 * @see http://example.com
 * @see http://example.org
 */
class MyClass{...}
```

----

### @since
syntax: ``@since <version>``

```javascript
/**
 * @since 0.0.1
 */
class MyClass{...}
```

----

### @todo
syntax: ``@todo <description>``

```javascript
/**
 * @todo support multi byte character.
 * @todo cache calculation result.
 */
class MyClass{...}
```

----

### @version
syntax: ``@version <version>``

```javascript
/**
 * @version 1.2.3
 */
class MyClass{...}
```

----

## For Class
### @extends
syntax: ``@extends <identifier>``

Normally you don't need to use ``@extends``. because ES2015 has the Class-Extends syntax. however, you can use this tag if you want to explicitly specify.

```javascript
/**
 * @extends {SuperClass1}
 * @extends {SuperClass2}
 */
class MyClass extends mix(SuperClass1, SuperClass2) {...}
```

----

### @implements
syntax: ``@implements <identifier>``

```javascript
/**
 * @implements {MyInterface1}
 * @implements {MyInterface2}
 */
class MyClass {...}
```

----

### @interface
syntax: ``@interface``

```javascript
/**
 * @interface
 */
class MyInterface {...}
```

----

## For Method And Function
### @abstract
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

----

### @emits
syntax: ``@emits <identifier> [description]``

```javascript
class MyClass {
  /**
   * @emits {MyEvent1} emit event when foo.
   * @emits {MyEvent2} emit event when bar.
   */
  method(){...}
}
```

----

### @listens
syntax: ``@listens <identifier> [description]``

```javascript
class MyClass {
  /**
   * @listens {MyEvent1} listen event because foo.
   * @listens {MyEvent2} listen event because bar.
   */
  method(){...}
}
```

----

### @override
syntax: ``@override``

```javascript
class MyClass extends SuperClass {
  /**
   * @override
   */
  method(){...}
}
```

----

### @param
syntax: ``@param <type> <name> [-] [description]``

About ``<type>`` to see [Type Syntax](#type-syntax)

```javascript
class MyClass {
  /**
   * @param {number} p - this is p description.
   */
  method(p){...}
}
```

----

### @return
syntax: ``@return <type> [description]``

About ``<type>`` to see [Type Syntax](#type-syntax)

```javascript
class MyClass {
  /**
   * @return {number} this is description.
   */
  method(){...}
}
```

If return Object, you can use ``@property <type> <name> [description]`` for each properties.

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

----

### @throws
syntax: ``@throws <identifier> [description]``

```javascript
class MyClass {
  /**
   * @throws {MyError1} throw error when foo.
   * @throws {MyError2} throw error when bar.
   */
  method(){...}
}
```

----

## For Member And Variable
### @type
syntax: ``@type <type>``

About ``<type>`` to see [Type Syntax](#type-syntax)

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

If you use ``get/set`` syntax, you can specify ``@type``.

```javascript
class MyClass {
  /** @type {string} */
  get value() {}

  /** @type {string} */
  set value(v){}
}
```

If ``<type>`` is Object, you can use ``@property <type> <name> [description]`` for each properties.

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

----

## For Virtual
### @external
syntax: ``@external <identifier> <URL>``

```javascript
/**
 * @external {XMLHttpRequest} https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest
 */
```

----

### @typedef
syntax: ``@typedef <type> <name>``

About ``<type>`` to see [Type Syntax](#type-syntax)

```javascript
/**
 * @typedef {number|string} MyType
 */
```

If ``<type>`` is Object, you can use ``@property <type> <name> [description]`` for each properties.

```javascript
/**
 * @typedef {Object} MyType
 * @property {number} foo this is description.
 * @property {string} bar this is description.
 */
```

----

## For Test
### @test
syntax: ``@test <identifier>``

```javascript
/** @test {MyClass} */
describe('MyClass has foo bar feature', ()=>{

  /** @test {MyClass#baz} */
  it('MyClass#baz returns magic value', ()=>{
    assert(true);
  });
});
```
----

## Type Syntax

``@param``, ``@return``, ``@type`` and ``@typedef`` are support the following type syntax.

### Simple
```javascript
/**
 * @param {number} param - this is simple param.
 */
function myFunc(param){...}
```
### Array
```javascript
/**
 * @param {number[]} param - this is array param.
 */
function myFunc(param){...}
```

### Object
```javascript
/**
 * @param {Object} param - this is object param.
 * @param {number} param.foo - this is property param.
 * @param {string} param.bar - this is property param.
 */
function myFunc(param){...}

/**
 * this is object destructuring.
 * @param {Object} param - this is object param.
 * @param {number} param.foo - this is property param.
 * @param {string} param.bar - this is property param.
 */
function myFunc({foo, bar}){...}
```

### Record
```javascript
/**
 * @param {{foo: number, bar: string}} param - this is object param.
 */
function myFunc(param){...}

/**
 * this is nullable property
 * @param {{foo: ?number, bar: string}} param - this is object param.
 */
function myFunc(param){...}

/**
 * this is object destructuring.
 * @param {{foo: number, bar: string}} param - this is object param.
 */
function myFunc({foo, bar}){...}
```

### Generics
```javascript
/**
 * @param {Array<string>} param - this is Array param.
 */
function myFunc(param){...}

/**
 * @param {Map<number, string>} param - this is Map param.
 */
function myFunc(param){...}

/**
 * @return {Promise<string[], MyError>} this is Promise return value.
 */
function myFunc(){...}
```

### Function
```javascript
/**
 * @param {function(foo: number, bar: string): boolean} param - this is function param.
 */
function myFunc(param){...}
```

### Union
```javascript
/**
 * @param {number|string} param - this is union param.
 */
function myFunc(param){...}
```

### Nullable And Not Nullable
```javascript
/**
 * @param {?number} param - this is nullable param.
 */
function myFunc(param){...}

/**
 * @param {!Object} param - this is not nullable param.
 */
function myFunc(param){...}

/**
 * @param {?(number|string)} param - this is nullable and union param.
 */
function myFunc(param){...}
```

### Spread
```javascript
/**
 * @param {...number} param - this is spread param.
 */
function myFunc(...param){...}
```

### Optional And Default
```javascript
/**
 * @param {number} [param] - this is optional param.
 */
function myFunc(param){...}

/**
 * @param {number} [param=10] - this is default param.
 */
function myFunc(param){...}
```

## Identifier Syntax
``<identifier>`` supports following syntax.
- class: ``MyClass``
- method and member: ``MyClass#foo``
- static method and member: ``MyClass.bar``
- function and variable: ``myFunc``, ``myVariable``

if same names in your project, you can use full identifier syntax. full identifier is ``filePath~identifier``.

e.g. If ``MyClass`` in ``src/foo1.js`` and ``src/foo2.js``, you can write following,
- ``src/foo1.js~MyClass``
- ``src/foo2.js~MyClass``

