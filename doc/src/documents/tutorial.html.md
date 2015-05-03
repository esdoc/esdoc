---
layout: "default"
isPage: true
---

# Tutorial




## Target Source Code
This tutorial is going to generate a document based on the following JavaScript code.

```
my-project
  src
    MyClass.js
    MySuperClass.js
  package.json
  README.md
```

```javascript
MyClass
```

```javascript
MySuperClass
```

```json
package.json
```

```markdown
README.md
```



## Install ESDoc
Install ESDoc from npm.

```
npm install esdoc -g
esdoc -h
```



## Create Config File
Create ESDoc config file.

``my-project/esdoc.json``
```json
{
  "source": "./src",
  "destination": "./out/esdoc",
}
```

execute ESDoc and see output document.
```
esdoc -c ./esdoc.json
open ./out/esdoc/index.html
```

![](./image/tutorial1.png)

Here it kept to a minimum configuration.
[Config](./config.html) page describes full configuration.




## Write Document Tag
The document is not good, because the document tag is not exist.
So, write document tag(a.k.a JSDoc Tag)

``my-project/src/MyClass.js``
```javascript
MyClass
```

``my-project/src/MySuperClass.js``
```javascript
MySuperClass
```

execute ESDoc and see output document.
```
esdoc -c ./esdoc.json
open ./out/esdoc/index.html
```

![](./image/tutorial2.png)

Congratulation! The document is good!

ESDoc has some tags. [Tags](./tags.html) page describes full tags.




## Document Coverage
ESDoc measures document coverage.

See ``my-project/out/esdoc/source.html``

![](./image/tutorial-coverage1.png)

If you want to display document coverage badge in index page, write ``<span class="esdoc-coverage"></span>`` in README.md file.
```markdown
<span class="esdoc-coverage"></span>
...
```


## Generate Document From Test Code
ESDoc can generate document from test code.
(Now, support only [Mocha](http://mochajs.org/))

Write test code.

``my-project/test/MyClassTest.js``

```javascript
test
```

And add config.

``my-project/esdoc.json``

```json
{
  "source": "./src",
  "destination": "./out/esdoc",
  "test": {
    "type": "mocha",
    "source": "./test"
  }
}
```

execute ESDoc and see output document.

```
esdoc -c ./esdoc.json
open ./out/esdoc/index.html
```

![](../image/tutorial/generate-from-test1.png)

Write tag for test code
``my-project/test/MyClassTest.js``

```javascript
@testTarget {MyClass}
```

![](../image/tutorial/generate-from-test2.png)

----

## Appendix

### Code Style
ESDoc target at ES6 Class-base OOP and module
- Class-base OOP: Use class, extends, static, constructor, method, get and set syntax.
- module: Use import and export syntax.

### Process Target Identifier
ESDoc process only top level identifier.

```javascript
// this is processed.
class MyClass {
}

(function(){
  // this is not processed.
  class MyClass{
  }
})();
```

You can select identifier with ``access``, ``unexportIdentifier`` and ``undocumentIdentifier`` in config.
To see [Config](./config.html).
