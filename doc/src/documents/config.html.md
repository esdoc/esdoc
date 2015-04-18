---
layout: "default"
isPage: true
---

# Config

ESDoc config file.

```json
{
  "source": "./path/to/src",
  "destination": "./path/to/esdoc",
  "pattern": "\\.js$",
  "access": ["public", "protected", "private"],
  "onlyExported": true,
  "importPathPrefix": "",
  "readme": "./path/to/README.md",
  "package": "./path/to/package.json",
  "styles": ["./path/to/style.css"],
  "scripts": ["./path/to/script.js"]
}
```

- ``source`` (required)
  - directory path of JavaScript source codes.
  - path is based on current directory.
- ``destination`` (required)
  - output directory path.
  - path is based on current directory.
- ``pattern``
  - process only files that are matched with the regexp.
  - default: ``\\.js$``
- ``access``
  - process only symbols(class, method, function, etc...) that are have the access(public, protected and private).
  - default: ``["public", "protected"]``
- ``onlyExported``
  - process only symbols that are exported(ES6 export syntax).
  - e.g. ``export MyClass {...}`` is exported, ``MyClass{}`` is not exported.
  - default: ``true``
- ``importPathPrefix``
  - display symbol's import path with the prefix.
  - e.g. if ``MyClass`` in ``src/foo/MyClass.js``, import path is ``import MyClass from 'src/foo/MyClass.js'``. but specified the prefix with ``importPathPrefix: "out"``, import path is ``import MyClass from 'out/src/foo/MyClass.js'``.
  - default: ``""``
- ``readme``
  - includes README.md into out put document.
  - path is based on current directory.
  - default: ``./README.md``
- ``package``
  - use info(version, url, etc...) in package.json(npm)
  - path is based on current directory.
  - default: ``./package.json``
- ``styles``
  - includes styles into out put document.
  - path is based on current directory.
  - default: ``null``
- ``scripts``
  - includes scripts into out put document.
  - path is based on current directory.
  - default: ``null``
  
