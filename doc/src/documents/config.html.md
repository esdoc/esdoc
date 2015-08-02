---
layout: "default"
isPage: true
---

# Config

ESDoc config file.

minimum config
```json
{
  "source": "./path/to/src",
  "destination": "./path/to/esdoc"
}
```

full config
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
  "importPathPrefix": "",
  "index": "./README.md",
  "package": "./package.json",
  "coverage": true,
  "test": {
    "type": "mocha",
    "source": "./test/src",
    "includes": ["Test\\.(js|es6)$"],
    "excludes": ["\\.config\\.(js|es6)$"]
  }
  "title": "My Software Name",
  "styles": ["./path/to/style.css"],
  "scripts": ["./path/to/script.js"],
  "plugins": [
    {"name": "plugin-name-or-file-path", "option": null}
  ]
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
| ``importPathPrefix`` | - | ``""`` | Display identifier's import path with the prefix. <br> e.g. if ``MyClass`` in ``src/foo/MyClass.js``, import path is ``import MyClass from 'src/foo/MyClass.js'``. <br> but specified the prefix with ``importPathPrefix: "out"``, import path is ``import MyClass from 'out/src/foo/MyClass.js'``. |
| ``index`` | - | ``./README.md``| Includes file into index page of document |
| ``package`` | - | ``./package.json`` | Use package.json info. |
| ``coverage`` | - | ``true`` | If true, output document coverage. |
| ``test`` | - | ``null`` | If specified, Generate document from test code. |
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

Note: A file path in config is based on current directory.
