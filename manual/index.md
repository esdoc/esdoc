esdoc2 is a good documentation generator for JavaScript.

<img class="screen-shot no-border" src="./manual/asset/image/top.png" width="400px">

# Features
- Generates good documentation.
- Measures documentation coverage.
- Integrate test codes into documentation.
- Integrate manual into documentation.
- Parse ECMAScript proposals.
- Add custom features by [plugin architecture](https://github.com/esdoc2/esdoc2-plugins)
- [esdoc2 Hosting Service](https://doc.esdoc2.org)

# Users
- [esdoc2](https://doc.esdoc2.org/github.com/esdoc2/esdoc2/) (self-hosting &#x1F604;)
- [RxJS](http://reactivex.io/rxjs/)
- [Sketch API](http://developer.sketchapp.com/reference/api/)

And [more](https://github.com/search?o=desc&q=esdoc2+filename%3Apackage.json+-user%3Ah13i32maru+-user%3Aesdoc+-user%3Aes-doc&ref=searchresults&s=indexed&type=Code&utf8=%E2%9C%93).

# Quick Start
```sh
# move to a your project directory
cd your-project/

# install esdoc2 and standard plugin
npm install esdoc2 esdoc2-standard-plugin

# write a configuration file.
echo '{
  "source": "./src",
  "destination": "./docs",
  "plugins": [{"name": "esdoc2-standard-plugin"}]
}' > .esdoc2.json

# run esdoc2
./node_modules/.bin/esdoc2

# see a documentation
open ./docs/index.html
```

# License
MIT

# Author
[Ryo Maruyama@h13i32maru](https://twitter.com/h13i32maru)

