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
  - Directory path of JavaScript source codes.
  - Path is based on current directory.
- ``destination`` (required)
  - Output directory path.
  - Path is based on current directory.
- ``pattern``
  - Process only files that are matched with the regexp.
  - Default: ``\\.js$``
- ``access``
  - Process only symbols(class, method, function, etc...) that are have the access(public, protected and private).
  - Default: ``["public", "protected"]``
- ``onlyExported``
  - Process only symbols that are exported(ES6 export syntax).
  - e.g. ``export MyClass {...}`` is exported, ``MyClass{}`` is not exported.
  - Default: ``true``
- ``importPathPrefix``
  - Display symbol's import path with the prefix.
  - e.g. if ``MyClass`` in ``src/foo/MyClass.js``, import path is ``import MyClass from 'src/foo/MyClass.js'``. but specified the prefix with ``importPathPrefix: "out"``, import path is ``import MyClass from 'out/src/foo/MyClass.js'``.
  - Default: ``""``
- ``readme``
  - Includes README.md into out put document.
  - path is based on current directory.
  - default: ``./README.md``
- ``package``
  - Use info(version, url, etc...) in package.json(npm)
  - Path is based on current directory.
  - default: ``./package.json``
- ``styles``
  - Includes styles into out put document.
  - Path is based on current directory.
  - Default: ``null``
- ``scripts``
  - Includes scripts into out put document.
  - Path is based on current directory.
  - Default: ``null``
  
