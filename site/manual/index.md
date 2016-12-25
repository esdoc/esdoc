ESDoc is a documentation generator for JavaScript.

<img class="screen-shot" src="./manual/asset/image/top.png" width="400px">

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

# License
MIT

# Author
[Ryo Maruyama@h13i32maru](https://twitter.com/h13i32maru)

