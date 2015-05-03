---
layout: "default"
isPage: true
---

# Tutorial




## Target Source Code
This tutorial is going to generate a document based on the following JavaScript code.

```
my-project/
├── README.md
├── package.json
└── src
    ├── MyClass.js
    └── MySuperClass.js
```

```javascript
import MySuperClass from './MySuperClass.js';

export default class MyClass extends MySuperClass {
  constructor(name = 'anonymous') {
    super();
    this._name = name;
  }

  sayMyName() {
    return `My name is ${this._name}`;
  }
}
```

```javascript
export default class MySuperClass {
  constructor() {
  }

  sayHello(){
    return 'Hello!';
  }
}
```

```markdown
# My Project
this is My Project README
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

```javascript
import MySuperClass from './MySuperClass.js';

/**
 * this is MyClass description.
 */
export default class MyClass extends MySuperClass {
  /**
   * this is MyClass constructor description.
   * @param {string} [name="anonymous"] - this is name description.
   */
  constructor(name = 'anonymous') {
    super();
    this._name = name;
  }

  /**
   * this is sayMyName description
   * @returns {string} this is return description.
   */
  sayMyName() {
    return `My name is ${this._name}`;
  }
}
```

```javascript
/**
 * this is MySuperClass description.
 */
export default class MySuperClass {
  /**
   * this is MySuperClass constructor description.
   */
  constructor() {
  }

  /**
   * this is sayHello description.
   * @returns {string} this is return description.
   */
  sayHello(){
    return 'Hello!';
  }
}
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
# My Project
this is My Project README
```


## Generate Document From Test Code
ESDoc can generate document from test code.
(Now, support only [Mocha](http://mochajs.org/))

Write test code.

``my-project/test/MyClassTest.js``

```javascript
import assert from 'assert';
import MyClass from '../src/MyClass.js';

describe('MyClass is super useful class.', ()=>{
  it('say my name', ()=>{
    let foo = new MyClass('Alice');
    assert.equal(foo.sayMyName(), 'My name is Alice');
  })
});
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
import assert from 'assert';
import MyClass from '../src/MyClass.js';

/** @testTarget {MyClass} */
describe('MyClass is super useful class.', ()=>{

  /** @testTarget {MyClass#sayMyName} */
  it('say my name', ()=>{
    let foo = new MyClass('Alice');
    assert.equal(foo.sayMyName(), 'My name is Alice');
  })
});
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
