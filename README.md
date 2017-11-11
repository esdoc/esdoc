<!--![Owner Status](https://img.shields.io/badge/owner-busy-red.svg)-->
[![Build Status](https://travis-ci.org/esdoc2/esdoc2.svg?branch=master)](https://travis-ci.org/esdoc2/esdoc2)
[![Coverage Status](https://codecov.io/gh/esdoc2/esdoc2/branch/master/graph/badge.svg)](https://codecov.io/gh/esdoc2/esdoc2)
[![Document](https://doc.esdoc2.org/github.com/esdoc2/esdoc2/badge.svg?t=0)](https://doc.esdoc2.org/github.com/esdoc2/esdoc2)

# esdoc2

esdoc2 is a documentation generator for JavaScript.<br/>
Please <a href="https://try.esdoc2.org">try it out</a>!

<img class="screen-shot" src="https://raw.githubusercontent.com/esdoc2/esdoc2/master/manual/asset/image/top.png" width="500px" style="max-width: 500px; border: 1px solid rgba(0,0,0,0.1); box-shadow: 1px 1px 1px rgba(0,0,0,0.5);">

# Features
- Generates good documentation.
- Measures documentation coverage.
- Integrate test codes into documentation.
- Integrate manual into documentation.
- Parse ECMAScript proposals.
- [esdoc2 Hosting Service](https://doc.esdoc2.org)

# Users
- [esdoc2](https://doc.esdoc2.org/github.com/esdoc2/esdoc2/) (self-hosting &#x1F604;)
- [RxJS](http://reactivex.io/rxjs/)
- [Sketch API](http://developer.sketchapp.com/reference/api/)

And [more](https://github.com/search?o=desc&q=esdoc2+filename%3Apackage.json+-user%3Ah13i32maru+-user%3Aesdoc+-user%3Aes-doc&ref=searchresults&s=indexed&type=Code&utf8=%E2%9C%93).

# Quick Start
```sh
# Move to a your project directory.
cd your-project/

# Install esdoc2 and standard plugin.
npm install esdoc2 esdoc2-standard-plugin

# Create a configuration file.
echo '{
  "source": "./src",
  "destination": "./docs",
  "plugins": [{"name": "esdoc2-standard-plugin"}]
}' > .esdoc2.json

# Run esdoc2.
./node_modules/.bin/esdoc2

# View a documentation
open ./docs/index.html
```

# Document
please visit [esdoc2.org](https://esdoc2.org) to see more documentation.

# License
MIT

# Author
[Ryo Maruyama@h13i32maru](https://twitter.com/h13i32maru)
