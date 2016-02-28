# Config

ESDoc config file.

- [Minimum Config](#minimum-config)
- [Integrate Test Codes Config](#integrate-test-codes-config)
- [Integrate Manual Config](#integrate-manual-config)
- [Use ES7 Config](#use-es7-config)
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
  "source": "./src"
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
    "overview": "./manual/overview.md",
    "installation": "./manual/installation.md",
    "usage": "./manual/usage.md",
    "example": "./manual/example.md",
    "faq": "./manual/faq.md",
    "changelog": "./CHANGELOG.md"
  }
}
```

## Use ES7 Config
```sh
npm install esdoc-es7-plugin
```

```json
{
  "source": "./src",
  "destination": "./doc",
  "plugins": [
    {"name": "esdoc-es7-plugin"}
  ]
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
    "overview": "./manual/overview.md",
    "installation": "./manual/installation.md",
    "usage": "./manual/usage.md",
    "tutorial": "./manual/tutorial.md",
    "configuration": "./manual/configuration.md",
    "example": "./manual/example.md",
    "faq": "./manual/faq.md",
    "changelog": "./CHANGELOG.md"
  },
  "lint": true,
  "badge": "badge-flat-square"
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
| ``manual.overview`` | - | null | if specify markdown file path, show overview. |
| ``manual.installation`` | - | null | if specify markdown file path, show installation. |
| ``manual.usage`` | - | null | if specify markdown file path, show usage. |
| ``manual.tutorial`` | - | null | if specify markdown file path, show tutorial. |
| ``manual.configuration`` | - | null | if specify markdown file path, show configuration. |
| ``manual.example`` | - | null | if specify markdown file path, show example. |
| ``manual.faq`` | - | null | if specify markdown file path, show FAQ. |
| ``manual.changelog`` | - | null | if specify markdown file path, show changelog. |
| ``lint`` | - | true | If specified, execute documentation lint. |
| ``badge`` | - | 'badge' | If 'badge-flat-square' specified, use flat-square layout. |

Note: A file path in config is based on current directory.
