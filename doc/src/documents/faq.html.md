---
layout: "default"
isPage: true
---

# FAQ
- [Goal](#goal)
- [Difference between ESDoc and JSDoc](#difference-between-esdoc-and-jsdoc)
- [Supported Languages](#supported-languages)
- [Supported Environment](#supported-environment)
- [Import Path In Documentation](#import-path-in-documentation)
- [Articles](#articles)

## Goal
ESDoc has two goals.
The first goal is reducing the cost to write an documentation, it is able to continuously maintenance.
The second goal is without looking the source code of a library, it is to be able to use the library.

In order to achieve this two goals, ESDoc produces a practical document, measures the coverage, integrates the test code and more.

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
ESDoc supports Node.js(v6 or later)

## Import Path In Documentation
ESDoc displays the import path of class/function into the document.
However, the import path may be different from real import path because usually ES6 is transpiled to use it.

So, [ESDoc Import Path Plugin](https://github.com/esdoc/esdoc-importpath-plugin) converts import path to real import path.

## Articles
- English
  - [Write a documentation React and ES6 project by ESDoc | en.blog.koba04](http://en.blog.koba04.com/2015/06/28/esdoc-documentation-for-react-and-es6/)
  - [ECMAScript 6 documentation generators | stackoverflow](http://stackoverflow.com/questions/27334309/ecmascript-6-documentation-generators)
  - [ESDoc – A Documentation Generator for JavaScript(ES6) | Hacker News](https://news.ycombinator.com/item?id=10002867)
  - [Document ES6 with ESDoc](http://jonathancreamer.com/document-es6-with-esdoc/)
- Japanese
  - [ESDocというJavaScript向けのAPIドキュメントツールを作りました | maru source](http://blog.h13i32maru.jp/entry/2015/05/06/221041)
  - <a href="http://jser.info/2015/05/06/iojs2.0.0-msedge-isomorphic/#esdoc---an-api-document-generator-for-javascript(es6)">ESDoc - An API Document Generator For JavaScript(ES6) | JSer.info</a>
  - [ESDoc - ES6時代のドキュメンテーションツール | Speacker Deck](https://speakerdeck.com/h13i32maru/esdoc-es6shi-dai-falsedokiyumentesiyonturu)
  - [ESDoc を試す | アカベコマイリ](http://akabeko.me/blog/2015/07/esdoc/)
