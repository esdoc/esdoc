# API

You can modify data(config, code, parser, AST, doc and content) at hook points with plugins.

## Plugin API

First, you set ``plugins`` property in config.
- specify directly JavaScript file (e.g. `./my-plugin.js`)
- specify npm module name (e.g. `esdoc-foo-plugin`), before you need to install the module.

```json
{
  "source": "./src",
  "destination": "./docs",
  "plugins": [
    {"name": "./MyPlugin.js"},
    {"name": "esdoc-foo-plugin", "option": {"foo": 123}}
  ]
}
```

Second, you write plugin code.

<div class="file-path">MyPlugin.js</div>

```javascript
class MyPlugin {
  onStart(ev) {
    console.log(ev.data);
  }
  
  onHandlePlugins(ev) {
    // modify plugins
    ev.data.plugins = ...; 
  }
  
  onHandleConfig(ev) {
    // modify config
    ev.data.config.title = ...;
  }
  
  onHandleCode(ev) {
    // modify code
    ev.data.code = ...;
  }
  
  onHandleCodeParser(ev) {
    // modify parser
    ev.data.parser = function(code){ ... };
  }
  
  onHandleAST(ev) {
    // modify AST
    ev.data.ast = ...;
  }
  
  onHandleDocs(ev) {
    // modify docs
    ev.data.docs = ...;
  };
  
  onPublish(ev) {
    // write content to output dir
    ev.data.writeFile(filePath, content);
    
    // copy file to output dir
    ev.data.copyFile(src, dest);
    
    // copy dir to output dir
    ev.data.copyDir(src, dest);
    
    // read file from output dir
    ev.data.readFile(filePath);
  };
  
  onHandleContent(ev) {
    // modify content
    ev.data.content = ...;
  };
  
  onComplete(ev) {
    // complete
  };
}

// exports plugin
module.exports = new MyPlugin();
```

Note: [esdoc/esdoc-plugins](https://github.com/esdoc/esdoc-plugins) is helpful for writing plugins.

## Data Format
TODO: describe data format.

