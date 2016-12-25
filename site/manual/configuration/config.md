# Config

ESDoc config example files.

- [Minimum Config](#minimum-config)
- [Integrate Test Codes Config](#integrate-test-codes-config)
- [Integrate Manual Config](#integrate-manual-config)
- [Use ECMAScript Proposal](#use-ecmascript-proposal)
- [Full Config](#full-config)

## Minimum Config
```json
{
  "source": "./path/to/src",
  "destination": "./path/to/esdoc"
}
```

## Integrate Test Codes Config
```json
{
  "source": "./src",
  "destination": "./doc",
  "test": {
    "type": "mocha",
    "source": "./test"
  }
}
```

And if use ``@test``, more better integration.

```javascript
/** @test {MyClass} */
describe('MyClass has foo bar feature', ()=>{

  /** @test {MyClass#baz} */
  it('MyClass#baz returns magic value', ()=>{
    assert(true);
  });
});
```

## Integrate Manual Config
```json
{
  "source": "./src",
  "destination": "./doc",
  "manual": {
    "overview": ["./manual/overview.md"],
    "design": ["./manual/design.md"],
    "installation": ["./manual/installation.md"],
    "usage": ["./manual/usage.md"],
    "tutorial": ["./manual/tutorial.md"],
    "configuration": ["./manual/configuration.md"],
    "example": ["./manual/example.md"],
    "advanced": ["./manual/advanced.md"],
    "faq": ["./manual/faq.md"],
    "changelog": ["./CHANGELOG.md"]
  }
}
```

## Use ECMAScript Proposal
```json
{
  "source": "./src",
  "destination": "./doc",
  "experimentalProposal": {
    "classProperties": true,
    "objectRestSpread": true,
    "decorators": true,
    "doExpressions": true,
    "functionBind": true,
    "asyncGenerators": true,
    "exportExtensions": true,
    "dynamicImport": true
  }
}
```

## Full Config
```json
{
  "source": "./path/to/src",
  "destination": "./path/to/esdoc",
  "includes": ["\\.(js|es6)$"],
  "excludes": ["\\.config\\.(js|es6)$"],
  "access": ["public", "protected"],
  "autoPrivate": true,
  "unexportIdentifier": false,
  "undocumentIdentifier": true,
  "builtinExternal": true,
  "index": "./README.md",
  "package": "./package.json",
  "coverage": true,
  "includeSource": true,
  "test": {
    "type": "mocha",
    "source": "./test/src",
    "includes": ["Test\\.(js|es6)$"],
    "excludes": ["\\.config\\.(js|es6)$"]
  },
  "title": "My Software Name",
  "styles": ["./path/to/style.css"],
  "scripts": ["./path/to/script.js"],
  "plugins": [
    {"name": "plugin-name-or-file-path", "option": null}
  ],
  "manual": {
    "globalIndex": true,
    "index": "./manual/index.md",
    "asset": "./manual/asset",
    "overview": ["./manual/overview.md"],
    "design": ["./manual/design.md"],
    "installation": ["./manual/installation.md"],
    "usage": ["./manual/usage.md"],
    "tutorial": ["./manual/tutorial.md"],
    "configuration": ["./manual/configuration.md"],
    "example": ["./manual/example.md"],
    "advanced": ["./manual/advanced.md"],
    "faq": ["./manual/faq.md"],
    "changelog": ["./CHANGELOG.md"]
  },
  "lint": true,
  "experimentalProposal": {
    "classProperties": true,
    "objectRestSpread": true,
    "decorators": true,
    "doExpressions": true,
    "functionBind": true,
    "asyncGenerators": true,
    "exportExtensions": true,
    "dynamicImport": true
  }
}
```

| Name  | Required | Default | Description |
| ----- | -------- | ------- | ----------- |
| ``source``  | true | - | JavaScript source codes directory path. |
| ``destination`` | true | - | Output directory path. |
| ``includes`` | - | <code>["\\\\.(js&#124;es6)$"]</code> | Process files that are matched with the regexp at any one. |
| ``excludes`` | - | <code>["\\\\.config\\\\.(js&#124;es6)$"]</code> | Not process files that are matched with the regexp at any one. |
| ``access`` | - | ``["public", "protected"]`` | Process only identifiers(class, method, etc...) that are have the access(public, protected and private). |
| ``autoPrivate`` | - | ``true`` | Deal with identifiers beginning with "_" as a private. <br> e.g. ``this._foo`` is private. but ``/** @public */ this._foo`` is public.|
| ``unexportIdentifier`` | - | ``false`` | If true, also process unexported Identifiers. <br> e.g. ``export class MyClass`` is exported, ``class MyClass`` is not exported. |
| ``undocumentIdentifier`` | - | ``true`` | If true, also process undocument Identifiers. <br> e.g. ``/** @foo bar */ class MyClass`` is document identifier, ``class MyClass`` is undocument identifier. |
| ``builtinExternal`` | - | ``true`` | If true, use built-in external tag. The built-in external has number, string, boolean, Promise, Map, etc... |
| ``index`` | - | ``./README.md``| Includes file into index page of document |
| ``package`` | - | ``./package.json`` | Use package.json info. |
| ``coverage`` | - | ``true`` | If true, output document coverage. |
| ``includeSource`` | - | ``true`` | If true, output includes source codes. |
| ``test`` | - | ``null`` | If specified, generate document from test code. |
| ``test.type`` | true | - | Test code type. Now only support "mocha". |
| ``test.source`` | true | - | Test codes directory path. |
| ``test.includes`` | - | <code>["(spec&#124;Spec&#124;test&#124;Test)\\\\.(js&#124;es6)$"]</code> | Process files that are matched with the regexp at any one. |
| ``test.excludes`` | - | <code>["\\\\.config\\\\.(js&#124;es6)$"]</code> | Not process files that are matched with the regexp at any one. |
| ``title`` | - | "" | Use title for output. |
| ``styles`` | - | ``null`` | Includes styles into output document. |
| ``scripts`` | - | ``null`` | Includes scripts into output document. |
| ``plugins`` | - | ``null`` | If specified, use each plugins. To see [Plugin Feature](./api.html#plugin-feature) for more information. |
| ``plugins[].name`` | true | - | Plugin module name(e.g. ``your-awesome-plugin``) or plugin file path(e.g. ``./your-awesome-plugin.js``). |
| ``plugins[].option`` | - | null | If specified, the plugin get the option. |
| ``manual`` | - | null | If specified, generate manual from markdown. |
| ``manual.globalIndex`` | - | false | If specify true, ESDoc generates global index using the manual. In other words, it means to replace `config.index` to `config.manual.index` |
| ``manual.index`` | - | null | If specify markdown file, show manual index using the file. |
| ``manual.asset`` | - | null | if specify asset(image) directory path, include the directory into manual. |
| ``manual.badge`` | - | true | if specify true, show manual coverage badge. |
| ``manual.overview`` | - | null | If specify markdown files, show overview. |
| ``manual.design`` | - | null | If specify markdown files, show design. |
| ``manual.installation`` | - | null | If specify markdown files, show installation. |
| ``manual.usage`` | - | null | If specify markdown files, show usage. |
| ``manual.tutorial`` | - | null | If specify markdown files, show tutorial. |
| ``manual.configuration`` | - | null | If specify markdown files, show configuration. |
| ``manual.example`` | - | null | If specify markdown files, show example. |
| ``manual.advanced`` | - | null | If specify markdown files, show advanced. |
| ``manual.faq`` | - | null | If specify markdown files, show FAQ. |
| ``manual.changelog`` | - | null | If specify markdown files, show changelog. |
| ``lint`` | - | true | If specified, execute documentation lint. |
| ``experimentalProposal`` | - | null | Enable ECMAScript experimental proposal features |
| ``experimentalProposal.classProperties`` | - | false | If specify true, enable [Class Properties](http://babeljs.io/docs/plugins/transform-class-properties/)(Babel). |
| ``experimentalProposal.objectRestSpread`` | - | false | If specify true, enable [Object Rest/Spread](http://babeljs.io/docs/plugins/transform-object-rest-spread/)(Babel). |
| ``experimentalProposal.decorators`` | - | false | If specify true, enable [Decorators](http://babeljs.io/docs/plugins/transform-decorators/)(Babel). |
| ``experimentalProposal.doExpressions`` | - | false | If specify true, enable [Do Expressions](http://babeljs.io/docs/plugins/transform-do-expressions/)(Babel). |
| ``experimentalProposal.functionBind`` | - | false | If specify true, enable [Function Bind](http://babeljs.io/docs/plugins/transform-function-bind/)(Babel). |
| ``experimentalProposal.asyncGenerators`` | - | false | If specify true, enable [Async Generators](http://babeljs.io/docs/plugins/transform-async-generator-functions/)(Babel). |
| ``experimentalProposal.exportExtensions`` | - | false | If specify true, enable [Export Extensions](http://babeljs.io/docs/plugins/transform-export-extensions/)(Babel). |
| ``experimentalProposal.dynamicImport`` | - | false | If specify true, enable [Dynamic Import](http://babeljs.io/docs/plugins/syntax-dynamic-import/)(Babel). |


Note: A file path in config is based on current directory.
