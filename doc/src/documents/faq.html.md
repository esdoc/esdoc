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
- [Who's Using ESDoc](#who-s-using-esdoc)
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
  - supports ES2015 and later
  - targets at ES2015 ``class`` and ``import/export`` style
  - easy to use with fewer tags, because understand information from ES syntax.
  - generates detailed document
  - measures document coverage
  - integrates test codes
  - integrates manual
- JSDoc
  - supports ES3/ES5 and ES2015
  - targets Class-base OOP and Prototype-base OOP
  - has many flexible document tags

## Supported Languages
ESDoc supports ES2015 and later.

| Version | Y/N |
| ------- | --- |
| ES2015 | Support all features. But a part of export syntax is not supported. |
| ES2016 | Support all features. |
| ES2017 | Support all features. |
| [ES Proposal](https://github.com/tc39/proposals) | Support a part of proposals. See [Use ECMAScript Proposal](./config.html#use-ecmascript-proposal). |
| ES3 | Not support. Please use other tools. |
| ES5 | Not support. Please use other tools. |
| Alt-JS(TypeScript, Dart, etc...) | Not support. Please use other tools. |

## Supported Environment
ESDoc supports Node.js(v6 or later)

## Import Path In Documentation
ESDoc displays the import path of class/function into the document.
However, the import path may be different from real import path because usually ES modules is transpiled to use it.

So, [ESDoc Import Path Plugin](https://github.com/esdoc/esdoc-importpath-plugin) converts import path to real import path.

## Who's Using ESDoc
- [RxJS5](http://reactivex.io/rxjs/)
- [Sketch API](http://developer.sketchapp.com/reference/api/)
- [Netflix/unleash](https://github.com/Netflix/unleash)
- [lonelyplanet/rizzo-next](https://github.com/lonelyplanet/rizzo-next)
- [linkedin/hopscotch](https://github.com/linkedin/hopscotch/tree/gh72)
- [electron/electron-compile](https://github.com/electron/electron-compile)

And more.

## Articles
- English
  - [Write a documentation React and ES6 project by ESDoc | en.blog.koba04](http://en.blog.koba04.com/2015/06/28/esdoc-documentation-for-react-and-es6/)
  - [ECMAScript 6 documentation generators | stackoverflow](http://stackoverflow.com/questions/27334309/ecmascript-6-documentation-generators)
  - [ESDoc – A Documentation Generator for JavaScript(ES6) | Hacker News](https://news.ycombinator.com/item?id=10002867)
  - [Document ES6 with ESDoc](http://jonathancreamer.com/document-es6-with-esdoc/)
  - [ES2015 | Web | Google Developers](https://developers.google.com/web/shows/ttt/series-2/es2015)
- Japanese
  - [ESDocというJavaScript向けのAPIドキュメントツールを作りました | maru source](http://blog.h13i32maru.jp/entry/2015/05/06/221041)
  - <a href="http://jser.info/2015/05/06/iojs2.0.0-msedge-isomorphic/#esdoc---an-api-document-generator-for-javascript(es6)">ESDoc - An API Document Generator For JavaScript(ES6) | JSer.info</a>
  - [ESDoc - ES6時代のドキュメンテーションツール | Speacker Deck](https://speakerdeck.com/h13i32maru/esdoc-es6shi-dai-falsedokiyumentesiyonturu)
  - [ESDoc を試す | アカベコマイリ](http://akabeko.me/blog/2015/07/esdoc/)
