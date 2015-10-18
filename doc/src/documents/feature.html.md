---
layout: "default"
isPage: true
---

# Features
ESDoc has some features.
I will introduce part of the features.
If you want to see all features, you visit [Demo](./#demo) page.

- [ES6 Class](#es6-class)
- [ES6 Module](#es6-module)
- [Documentation Coverage](#documentation-coverage)
- [Integration Test Codes](#integration-test-codes)
- [Integration Manual](#integration-manual)
- [Search Documentation](#search-documentation)
- [Guess Type](#guess-type)
- [Documentation Lint](#documentation-lint)
- [Customize](#customize)
- [ESDoc Hosting Service](#esdoc-hosting-service)


## ES6 Class
ESDoc supports ES6 Class syntax and targets a code that is written by it.
ES6 Class syntax makes the clear relation of class, method, member, constructor and inheritance.
This means that ESDoc can generate a document without using a tag for these.

ESDoc automatically generates the under contents by Class syntax.

- Super classes of self
- Direct Subclasses and Indirect Subclasses of self.
- Inherited methods and members from super class.
- Override methods and members from super class.

<img src="./image/feature/class1.png" class="screen-shot">

<img src="./image/feature/class2.png" class="screen-shot">

## ES6 Module
ESDoc supports ES6 Module syntax and targets a code that is written by it.
ES6 Modules syntax is file base. So ESDoc treats as one file = one module.

ESDoc displays the import style in accordance with the export style.
- If ``export default class Foo{}``, displays ``import Foo from './Foo.js'``
- If ``export class Foo{}``, displays ``import {Foo} from './Foo.js'``

This is useful because you not need to see export style in source code.

<img src="./image/feature/module1.png" class="screen-shot">

## Documentation Coverage
ESDoc measures a documentation coverage. This is useful information for following.
- This leads the motivation of documentation.
- This inspects a missing of documentation.

ESDoc processes only top-level class, function and variable.
This is based on, ESDoc measures coverage by how much the document is being written out of all the processing target.
And, ESDoc is also to measure coverage of each module, you will have become easier to also find a missing of the document.
For example, [this](./esdoc/source.html) is coverage of ESDoc itself.

<img src="./image/feature/coverage1.png" class="screen-shot">

## Integration Test Codes
Test codes are important information.
So, ESDoc generates a cross reference of test codes and document.
You need to use @test tag for this function.

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

<img src="./image/feature/test1.png" class="screen-shot">

<img src="./image/feature/test2.png" class="screen-shot">

However, for now, ESDoc supports only Mocha.

## Integration Manual
You can integrate manual into documentation. The manual is:
- Overview
- Installation
- Usage
- Tutorial
- Configuration
- Example
- FAQ
- Changelog

You write manual as markdown and add ``manual`` config.

```json
{
  "source": "./src",
  "destination": "./doc",
  "manual": {
    "overview": "./manual/overview.md",
    "installation": "./manual/installation.md",
    "usage": "./manual/usage.md",
    "tutorial": "./manual/tutorial.md",
    "configuration": "./manual/configuration.md",
    "example": "./manual/example.md",
    "faq": "./manual/faq.md",
    "changelog": "./CHANGELOG.md"
  }
}
```

You can specify a only part of these manuals (e.g. only overview and installation).

<img src="./image/feature/manual1.png" class="screen-shot">

<img src="./image/feature/manual2.png" class="screen-shot">

## Search Documentation
ESDoc supports searching in document with only JavaScript(without server implementation).
The implementation of searching:
- ESDoc made the index(JSON) at the time of document generation.
- The user search from the index.

However, this implementation is very naive. There might be a problem in search performance. For now, no problem in 500 indexes.

<img src="./image/feature/search1.png" class="screen-shot">

## Guess Type
ESDoc guesses type of function arguments by ES6 default argument syntax if there is not  ``@param`` at the function.
This implementation is very simply. If Arguments has a primitive(number, boolean, string, etc) default value, ESDoc guesses that the function arguments type is the primitive value.
ESDoc guesses type of function return in the same way if there is not ``@return`` at the function.

## Documentation Lint
If documentation is invalid, show warning log.

```javascript
export default class Foo {
  /**
   * @param {number} x
   */
  method(p){}
}
```

<img src="./image/feature/lint.png" class="screen-shot">

For now, only validate method|function signature.

## Customize
If you want to customize a document, you can includes your stylesheets and scripts to the document.
And, ESDoc support to plugin feature. But, ESDoc has goal that generates the useful document without user plugins.
Please read [API](/api.html) for more information.

## ESDoc Hosting Service
[ESDoc Hosting Service](https://doc.esdoc.org) generates your documentation via GitHub and hosts it.

<img src="./image/feature/hosting1.png" class="screen-shot">
