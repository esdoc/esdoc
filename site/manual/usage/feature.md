# Features
ESDoc has some useful features.

**Automatically Features**
- [ES2015 Class](#es2015-class)
- [ES2015 Module](#es2015-module)
- [Built-in Search Documentation](#built-in-search-documentation)
- [Guess Type of Variables](#guess-type-of-variables)

**Optional Features**
- [Documentation Coverage](#documentation-coverage)
- [Documentation Lint](#documentation-lint)
- [Integration Test Codes](#integration-test-codes)
- [Integration Manual](#integration-manual)

**Other Features**
- [ECMAScript Proposal](#ecmascript-proposal)
- [Customize Documentation](#customize-documentation)
- [ESDoc Hosting Service](#esdoc-hosting-service)

## ES2015 Class
ESDoc supports ES2015 Class syntax and targets codes that are written by it.

ES2015 Class syntax makes the clear relation of class, method, member, constructor and inheritance.<br/>
This means that ESDoc can generate a document without using a tag for these. In other words, you don't need to write tags for classes.

ESDoc automatically generates the under contents by Class syntax.

- Super classes
- Direct Subclasses and Indirect Subclasses.
- Inherited methods and members from super class.
- Override methods and members from super class.

<img src="./asset/image/feature/class1.png" class="screen-shot" width="500px">

<img src="./asset/image/feature/class2.png" class="screen-shot" width="500px">

Note: ESDoc doesn't support prototype base codes and function base codes.

## ES2015 Module
ESDoc supports ES2015 Modules syntax and targets codes that are written by it.<br/>
ES2015 Modules syntax is file base. So ESDoc treats as one file = one module.

ESDoc displays a import style in accordance with the export style.

- If `export default class Foo{}`, displays `import Foo from './Foo.js'` in `Foo` class documentation.
- If `export class Foo{}`, displays ``import {Foo} from './Foo.js'``in `Foo` class documentation.

This is useful because you not need to see export style in source code.

<img src="./asset/image/feature/module1.png" class="screen-shot" width="500px">

And you may as well as use [esdoc-importpath-plugin](https://github.com/esdoc/esdoc-importpath-plugin) to transform path.

Note: ESDoc doesn't support `module/require` of Node.js.

## Built-in Search Documentation
ESDoc supports built-in searching in document with only JavaScript(without server implementation).

The implementation of searching:

- ESDoc made the index(JSON) at the time of document generation.
- The user search from the index.

<img src="./asset/image/feature/search1.png" class="screen-shot" width="500px">

Note: This implementation is very naive. There might be a problem in search performance. For now, no problem in 500 indexes.

## Guess Type of Variables
ESDoc guesses type of variables using codes if those have no `@param`.

The following variables are supported.
- A class type using class syntax(ES2015).
- A method/function arguments type using default argument syntax(ES2015).
- A property type using assignment value.
- A return type using return value.

Note: This implementation is very simple. So ESDoc guesses only primitive values(number, boolean, string).

## Documentation Coverage
ESDoc measures a documentation coverage. This is useful information for the following.

- This leads the motivation of documentation.
- This inspects a missing of documentation.

ESDoc processes only top-level class, function and variable.<br/>
This is based on, ESDoc measures coverage by how much the document is being written out of all the processing target.<br/>
And, ESDoc is also to measure coverage of each module, you will have become easier to also find a missing of the document.

For example, [this](https://doc.esdoc.org/github.com/esdoc/esdoc/source.html) is coverage of ESDoc itself.

<img src="./asset/image/feature/coverage1.png" class="screen-shot" width="500px">

If you want to disable coverage, you need to specify `false` at configuration.
```json
{
  "source": "./path/to/src",
  "destination": "./path/to/esdoc",
  "coverage": false
}
```

## Documentation Lint
If documentation is invalid, ESDoc shows warning log.

```javascript
export default class Foo {
  /**
   * @param {number} x
   */
  method(p){}
}
```

<img src="./asset/image/feature/lint.png" class="screen-shot" width="500px">

If you want to disable this lint, you need to specify `false` at configuration.
```json
{
  "source": "./path/to/src",
  "destination": "./path/to/esdoc",
  "lint": false
}
```

Note: For now, ESDoc lints only method/function signature.

## Integration Test Codes
Test codes are important information.<br/>
So, ESDoc generates a cross reference of test codes and document.

You need to write configurations.

```json
{
  "source": "./src",
  "destination": "./doc",
  "test": {
    "type": "mocha",
    "source": "./test"
  }
}
```

And write `@test` tag.

```javascript
/** @test {MyClass} */
describe('MyClass is super useful class.', ()=>{

  /** @test {MyClass#sayMyName} */
  it('say my name', ()=>{
    let foo = new MyClass('Alice');
    assert.equal(foo.sayMyName(), 'My name is Alice');
  })
});
```

<img src="./asset/image/feature/test1.png" class="screen-shot" width="500px">

<img src="./asset/image/feature/test2.png" class="screen-shot" width="500px">

Note: For now, ESDoc supports only Mocha style(`describe/it`).

## Integration Manual
You can integrate a manual of a your project into documentation. The manual is:

- Overview
- Design
- Installation
- Usage
- Tutorial
- Configuration
- Example
- Advanced
- FAQ
- Changelog

You need to write configurations. All configurations are [here](./configuration/config.html#full-config).

```json
{
  "source": "./src",
  "destination": "./doc",
  "manual": {
    "overview": ["./manual/overview.md"],
    "usage": ["./manual/usage.md"],
    "example": ["./manual/example.md"]
  }
}
```

And write manual file using markdown.

```
# Overview
This is my project overview.
...
```

<img src="./asset/image/feature/manual1.png" class="screen-shot" width="500px">

<img src="./asset/image/feature/manual2.png" class="screen-shot" width="500px">

Note: ESDoc doesn't support free-style manual sections.

If you want to use asset(image) for manual, you can specify asset directory path.
```json
{
  "source": "./src",
  "destination": "./doc",
  "manual": {
    "asset": "./manual/asset",
    "overview": ["./manual/overview.md"],
    "usage": ["./manual/usage.md"],
    "example": ["./manual/example.md"]
  }
}
```

If you want to write index of manual, you can specify index file path.
```json
{
  "source": "./src",
  "destination": "./doc",
  "manual": {
    "index": "./manual/index.md",
    "asset": "./manual/asset",
    "overview": ["./manual/overview.md"],
    "usage": ["./manual/usage.md"],
    "example": ["./manual/example.md"]
  }
}
```

If you want to use manual as documentation index, you can specify global index.
```json
{
  "source": "./src",
  "destination": "./doc",
  "manual": {
    "globalIndex": true,
    "index": "./manual/index.md",
    "asset": "./manual/asset",
    "overview": ["./manual/overview.md"],
    "usage": ["./manual/usage.md"],
    "example": ["./manual/example.md"]
  }
}
```

## ECMAScript Proposal
ESDoc supports a part of [ECMAScript Proposal](https://github.com/tc39/proposals) that are implemented by [Babel](http://babeljs.io/docs/plugins/#transform-plugins-experimental).

If you want to use this, you need to specify `experimentalProposal` at configuration.<br/>
All configurations are [here](./configuration/config.html#full-config).

```json
{
  "source": "./src",
  "destination": "./doc",
  "experimentalProposal": {
    "classProperties": true,
    "objectRestSpread": true
  }
}
```

```javascript

/**
 * this is Foo class.
 */
export default class Foo {
  /**
   * this is static p.
   * @type {number}
   */
  static p = 123;

  /**
   * this is p.
   * @type {number}
   */
  p = 123;
  
  /**
  * this is method.
  * @param {Object} config - this is config.
  * @param {number} config.x - this is number x.
  * @param {string} config.y - this is string y.
  * @param {number[]} config.a - thi is number[] a.
  * @param {string[]} config.b - thi is number[] b.
  */
  method({x, y, ...z}){}
}
```

## Customize Documentation
If you want to customize a document, you can includes your stylesheets and scripts to the document.<br/>
And, ESDoc supports plugin feature. Please read [API](./advanced/api.html) for more information.

## ESDoc Hosting Service
[ESDoc Hosting Service](https://doc.esdoc.org) generates your documentation via GitHub and hosts it.

<img src="./asset/image/feature/hosting1.png" class="screen-shot" width="500px">
