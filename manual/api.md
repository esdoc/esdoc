# API
If you want to customize output, you can choose following way.

- [Style sheets and scripts](#style-sheets-and-scripts)
- [Plugin feature](#plugin-feature)
- [Publisher](#publisher)

## Style Sheets and Scripts
You can includes your style sheets and scripts into output documentation.
To see ``styles`` and ``scripts`` in [Config](config.html)

## Plugin Feature
You can modify data(config, code, parser, AST, tag and HTML) at hook points with plugins.

First, you set ``plugins`` property in config.

<p class="file-path">esdoc.json</p>
```json
{
  "source": "./src",
  "destination": "./doc",
  "plugins": [
    {"name": "./my-plugin.js"},
    {"name": "awesome-plugin-in-npm", "option": {"foo": 123}}
  ]
}
```

Second, you write plugin code.

<p class="file-path">my-plugin.js</p>
```javascript
exports.onStart = function(ev) {
  // take option
  ev.data.option;
};

exports.onHandleConfig = function(ev) {
  // modify config
  ev.data.config.title = ...;
};

exports.onHandleCode = function(ev) {
  // modify code
  ev.data.code = ...;
};

exports.onHandleCodeParser = function(ev) {
  // modify parser
  ev.data.parser = function(code){ ... };
};

exports.onHandleAST = function(ev) {
  // modify AST
  ev.data.ast = ...;
};

exports.onHandleTag = function(ev) {
  // modify tag
  ev.data.tag = ...;
};

exports.onHandleHTML = function(ev) {
  // modify HTML
  ev.data.html = ...;
};

exports.onComplete = function(ev) {
  // complete
};
```

FYI: [esdoc-es7-plugin](https://github.com/esdoc/esdoc-es7-plugin) and [esdoc-importpath-plugin](https://github.com/esdoc/esdoc-importpath-plugin)

## Publisher
This is useful for programmable operation ESDoc(e.g. making grunt plugin of ESDoc)

```javascript
import ESDoc from 'esdoc/out/src/ESDoc.js';
import publisher from 'esdoc/out/src/Publisher/publish.js';

const config = {source: './src', destination: './doc'};

ESDoc.generate(config, publisher);

# if you want to use own publisher
# function publisher(results, config) {
#  console.log(results);
# }
# ESDoc.generate(config, publisher);
```

## Internal Data
TODO: describe internal data.

