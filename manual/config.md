# Config

Introduce config files of ESDoc with esdoc-standard-plugin.

- [Minimum Config](#minimum-config)
- [Integrate Test Codes Config](#integrate-test-codes-config)
- [Integrate Manual Config](#integrate-manual-config)
- [Full Config](#full-config)

## Minimum Config
```json
{
  "source": "./src",
  "destination": "./docs",
  "plugins": [{"name": "esdoc-standard-plugin"}]
}
```

## Integrate Test Codes Config
```json
{
  "source": "./src",
  "destination": "./docs",
  "plugins": [
  {
    "name": "esdoc-standard-plugin",
    "option": {
      "test": {
        "source": "./test/",
        "interfaces": ["describe", "it", "context", "suite", "test"],
        "includes": ["(spec|Spec|test|Test)\\.js$"],
        "excludes": ["\\.config\\.js$"]
      }
    }
  }]
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
  "destination": "./docs",
  "plugins": [
  {
    "name": "esdoc-standard-plugin",
    "option": {
      "manual": {
        "index": "./manual/index.md",
        "asset": "./manual/asset",
        "files": [
          "./manual/overview.md",
          "./manual/installation.md",
          "./manual/usage.md",
          "./manual/tutorial.md",
          "./manual/configuration.md",
          "./manual/example.md",
          "./CHANGELOG.md"
        ]
      }
    }
  }]
}
```

## Full Config
```json
{
  "source": "./src",
  "destination": "./docs",
  "includes": ["\\.js$"],
  "excludes": ["\\.config\\.js$"],
  "plugins": [
  {
    "name": "esdoc-standard-plugin",
    "option": {
      "lint": {"enable": true},
      "coverage": {"enable": true},
      "accessor": {"access": ["public", "protected", "package", "private"], "autoPrivate": true},
      "undocumentIdentifier": {"enable": true},
      "unexportedIdentifier": {"enable": false},
      "typeInference": {"enable": true},
      "brand": {
        "logo": "./logo.png",
        "title": "My Library",
        "description": "this is awesome library",
        "repository": "https://github.com/foo/bar",
        "site": "http://my-library.org",
        "author": "https://twitter.com/foo",
        "image": "http://my-library.org/logo.png"
      },
      "manual": {
        "index": "./manual/index.md",
        "globalIndex": true,
        "asset": "./manual/asset",
        "files": [
          "./manual/overview.md"
        ]
      },
      "test": {
        "source": "./test/",
        "interfaces": ["describe", "it", "context", "suite", "test"],
        "includes": ["(spec|Spec|test|Test)\\.js$"],
        "excludes": ["\\.config\\.js$"]
      }
    }
  }] 
}
```

**ESDoc Config**

| Name  | Required | Default | Description |
| ----- | -------- | ------- | ----------- |
| ``source``  | true | - | JavaScript source codes directory path. |
| ``destination`` | true | - | Output directory path. |
| ``includes`` | - | `["\\.js$"]` | Process files that are matched with the regexp at any one. |
| ``excludes`` | - | `["\\.config\\.js$"]` | Not process files that are matched with the regexp at any one. |
| ``index`` | - | ``./README.md``| Includes file into index page of document |
| ``package`` | - | ``./package.json`` | Use package.json info. |
| ``plugins`` | - | ``null`` | If specified, use each plugins. To see [Plugin Feature](./api.html#plugin-feature) for more information. |
| ``plugins[].name`` | true | - | Plugin module name(e.g. ``your-awesome-plugin``) or plugin file path(e.g. ``./your-awesome-plugin.js``). |
| ``plugins[].option`` | - | null | If specified, the plugin get the option. |

<br/>
**`esdoc-standard-plugin` Option**

| Name  | Required | Default | Description |
| ----- | -------- | ------- | ----------- |
| `lint.enable` | - | `true` | If specified, execute documentation lint. |
| ``coverage.enable`` | - | ``true`` | If true, output document coverage. |
| ``accessor.access`` | - | ``["public", "protected", "package", "private"]`` | Process only identifiers(class, method, etc...) that are have the access(public, protected, package, and private). |
| ``accessor.autoPrivate`` | - | ``true`` | Deal with identifiers beginning with "_" as a private. <br> e.g. ``this._foo`` is private. but ``/** @public */ this._foo`` is public.|
| ``undocumentIdentifier.enable`` | - | ``true`` | If true, also process undocument Identifiers. <br> e.g. ``/** @foo bar */ class MyClass`` is document identifier, ``class MyClass`` is undocument identifier. |
| ``unexportedIdentifier.enable`` | - | ``false`` | If true, also process unexported Identifiers. <br> e.g. ``export class MyClass`` is exported, ``class MyClass`` is not exported. |
| `typeInference.true` | - | `true` | If true, infer type of variable, return value. |
| `brand.logo` | - | - | aaa |
| `brand.title` | - | - | Use title for output. |
| `brand.description` | - | - | If specified, write meta tag, og tag and twitter card. |
| `brand.repository` | - | - | If specified, write URL in header navigation.  |
| `brand.site` | - | - | If specified, write og tag and twitter card.|
| `brand.author` | - | - | If specified, write og tag and twitter card. |
| `brand.image` | - | - | If specified, write og tag and twitter card. |
| ``manual.globalIndex`` | - | false | If specify true, ESDoc generates global index using the manual. In other words, it means to replace `config.index` to `config.manual.index` |
| ``manual.index`` | - | null | If specify markdown file, show manual index using the file. |
| ``manual.asset`` | - | null | if specify asset(image) directory path, include the directory into manual. |
| ``manual.files`` | - | null | If specify markdown files, include manual into output. |
| ``test.source`` | true | - | Test codes directory path. |
| ``test.interfaces`` | | `["describe", "it", "context", "suite", "test"]` | Test code interfaces. |
| ``test.includes`` | - | <code>["(spec&#124;Spec&#124;test&#124;Test)\\\\.js$"]</code> | Process files that are matched with the regexp at any one. |
| ``test.excludes`` | - | `["\\.config\\.js$"]` | Not process files that are matched with the regexp at any one. |

Note: A file path in config is based on current directory.
