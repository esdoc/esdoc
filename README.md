<!--![Owner Status](https://img.shields.io/badge/owner-busy-red.svg)-->
[![Build Status](https://travis-ci.org/esdoc/esdoc.svg?branch=master)](https://travis-ci.org/esdoc/esdoc)
[![Coverage Status](https://codecov.io/gh/esdoc/esdoc/branch/master/graph/badge.svg)](https://codecov.io/gh/esdoc/esdoc)
[![Document](https://doc.esdoc.org/github.com/esdoc/esdoc/badge.svg?t=0)](https://doc.esdoc.org/github.com/esdoc/esdoc)
[![Manual](https://esdoc.org/manual-badge.svg?t=0)](https://doc.esdoc.org/github.com/esdoc/esdoc)

# ESDoc

ESDoc is a documentation generator for JavaScript.<br/>
Please <a href="https://try.esdoc.org">try it out</a>!

<img class="screen-shot" src="https://esdoc.org/manual/asset/image/top.png" width="500px" style="max-width: 500px; border: 1px solid rgba(0,0,0,0.1); box-shadow: 1px 1px 1px rgba(0,0,0,0.5);">

# Features
- Generates good documentation.
- Measures documentation coverage.
- Integrate test codes into documentation.
- Integrate manual into documentation.
- Parse ECMAScript proposals.
- [ESDoc Hosting Service](https://doc.esdoc.org)

# Users
- [ESDoc](https://doc.esdoc.org/github.com/esdoc/esdoc/) (self-hosting &#x1F604;)
- [RxJS](http://reactivex.io/rxjs/)
- [Sketch API](http://developer.sketchapp.com/reference/api/)

And [more](https://github.com/search?o=desc&q=esdoc+filename%3Apackage.json+-user%3Ah13i32maru+-user%3Aesdoc+-user%3Aes-doc&ref=searchresults&s=indexed&type=Code&utf8=%E2%9C%93).

# Quick Start
```sh
# install ESDoc from npm
npm install -g esdoc

# move to a your project directory
cd your-project/

# write a configuration file.
echo '{"source": "./src", "destination": "./doc"}' > .esdoc.json

# run ESDoc
esdoc

# see a documentation
open ./doc/index.html
```

# Document
please visit [esdoc.org](https://esdoc.org) to see more documentation.

# License
MIT

# Author
[Ryo Maruyama@h13i32maru](https://twitter.com/h13i32maru)
