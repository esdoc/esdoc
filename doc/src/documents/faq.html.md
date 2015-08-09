---
layout: "default"
isPage: true
---

# FAQ
- [Difference between ESDoc and JSDoc](#difference-between-esdoc-and-jsdoc)
- [Supported Languages](#supported-languages)
- [Supported Environment](#supported-environment)
- [Import Path In Documentation](#import-path-in-documentation)

## Difference between ESDoc and JSDoc
JSDoc is most popular JavaScript API Documentation tool.
ESDoc is inspired by JSDoc.

- ESDoc
  - supports ES6
  - targets at ES6 ``class`` and ``import/export`` style
  - generates detailed document
  - measures document coverage
  - associates test code to document.
  - is slower than JSDoc(I want to improve it)
- JSDoc
  - supports ES3/ES5 (JSDoc 3.3.0 will support ES6)
  - targets Class-base OOP and Prototype-base OOP
  - has many flexible document tags

## Supported Languages
ESDoc supports ES6(ECMAScript-262 6th, ES2015).

The languages below are not supported.
- ES3, ES5: Use [JSDoc](https://github.com/jsdoc3/jsdoc)
- ES7: Because ES7 is not stable. However, [ESDoc ES7 Plugin](https://github.com/esdoc/esdoc-es7-plugin) experimentally supports to ES7.
- Alt-JS(TypeScript, CoffeeScript, Dart, etc...): Because supporting them is too hard.

## Supported Environment
ESDoc supports Node.js(v0.12)

## Import Path In Documentation
ESDoc displays the import path of class/function into the document.
However, the import path may be different from real import path because usually ES6 is transpiled to use it.

So, [ESDoc Import Path Plugin](https://github.com/esdoc/esdoc-importpath-plugin) converts import path to real import path.
