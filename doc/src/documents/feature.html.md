---
layout: "default"
isPage: true
---

# Features
ESDoc has some features.
I will introduce part of the features.
If you want to see all features, you visit [Demo](./#demo) page.

([Japanese](http://blog.h13i32maru.jp/entry/2015/05/06/221041))

- [ES6 Class](#es6-class)
- [ES6 Module](#es6-module)
- [Document Coverage](#document-coverage)
- [Test Codes And Document](#test-codes-and-document)
- [Search Document](#search-document)
- [Guess Type](#guess-type)
- [Customize](#customize)


## ES6 Class
ESDoc supports ES6 Class syntax and targets a code that is written by it.
ES6 Class syntax makes the clear relation of class, method, member, constructor and inheritance.
This means that ESDoc can generate a document without using a tag for these.

ESDoc automatically generates the under contents by Class syntax.

- Super classes of self
- Direct Subclasses and Indirect Subclasses of self.
- Inherited methods and members from super class.
- Override methods and members from super class.

## ES6 Module
ESDoc supports ES6 Module syntax and targets a code that is written by it.
ES6 Modules syntax is file base. So ESDoc treats as one file = one module.

ESDoc displays the import style in accordance with the export style.
- If ``export default class Foo{}``, displays ``import Foo from './Foo.js'``
- If ``export class Foo{}``, displays ``import {Foo} from './Foo.js'``

This is useful because you not need to see export style in source code.

## Document Coverage
Unit test framework can measure test coverage. This leads motivation for test and inspects a missing of test.
This is very important. So ESDoc supports document coverage.

ESDoc processes only top-level class, function and variable.
This is based on, ESDoc measures coverage by how much the document is being written out of all the processing target.
And, ESDoc is also to measure coverage of each module, you will have become easier to also find a missing of the document.
For example, [this](./esdoc/source.html) is coverage of ESDoc itself.


## Test Codes And Document
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

However, for now, ESDoc supports only Mocha.

## Search Document
ESDoc supports searching in document with only JavaScript(without server implementation).
The implementation of searching:
- ESDoc made the index(JSON) at the time of document generation.
- The user search from the index.

However, this implementation is very naive. There might be a problem in search performance. For now, no problem in 500 indexes.

## Guess Type
ESDoc guesses type of function arguments by ES6 default argument syntax if there is not  ``@param`` at the function.
This implementation is very simply. If Arguments has a primitive(number, boolean, string, etc) default value, ESDoc guesses that the function arguments type is the primitive value.
ESDoc guesses type of function return in the same way if there is not ``@return`` at the function.

## Customize
If you want to customize a document, you can includes your stylesheets and scripts to the document.
And, ESDoc will release plugin system for full customize in future. But, ESDoc has goal that generates the useful document without user plugins.
