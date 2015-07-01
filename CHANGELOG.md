# Changelog

## Next
- **Feat**
  - Support instance export([957d61a](https://github.com/h13i32maru/esdoc/commit/957d61a8febb4fe3dda4d65bae8dc1cbc210250c))
    - ``export default new Foo()``
  - Support anonymous class/function export ([#13](https://github.com/h13i32maru/esdoc/issues/13))
    - ``export default class{}`` and ``export default function(){}``
  - Show a detail log when ESDoc could not process a input code ([#14](https://github.com/h13i32maru/esdoc/issues/14))
- **Fix**
  - Broken @desc when it has html code ([issue 12](https://github.com/h13i32maru/esdoc/issues/12))
  - Crash complex ``ExportDefaultDeclaration`` and ``ExportNamedDeclaration``([957d61a](https://github.com/h13i32maru/esdoc/commit/957d61a8febb4fe3dda4d65bae8dc1cbc210250c))
  - Crash when a class extends unexported class ([bf87643](https://github.com/h13i32maru/esdoc/commit/bf876430c49937932b2ba07602363b6927f211cc))

## 0.1.2
- **Breaking Changes**
  - drop `esdoc ./path/to/dir` implementation ([b4d2121](https://github.com/h13i32maru/esdoc/commit/b4d21219221b8307a155fdee85e2ed5fed9c4429))
- **Fix**
  - Fail parsing of React JSX syntax ([#3](https://github.com/h13i32maru/esdoc/pull/3)). Thank you [@koba04](https://github.com/koba04)
  - Home link does not work as expected ([97f47cf](https://github.com/h13i32maru/esdoc/commit/97f47cf8a8e90cdd6066417fbe9ce835e8a370c8))
  - Separated export is not shown in document ([6159c3a](https://github.com/h13i32maru/esdoc/commit/6159c3ad28f5c0736d2a2c22f39c94e2e1b6de61))
  - Crash when a class extends nested super class. ([2d634d0](https://github.com/h13i32maru/esdoc/commit/2d634d06f7a9475e92fae5c0773dfae579b5b314))
  - Web font loading protocol ([5ba8d82](https://github.com/h13i32maru/esdoc/commit/5ba8d82684d84a498e5285c929bbfcccc5ca6013))

## 0.1.1
- **Feat**
  - Support Windows ([edd09cb](https://github.com/h13i32maru/esdoc/commit/edd09cbdf5f4032aa59a5e6e59ab62727475a61a) , [2d34d46](https://github.com/h13i32maru/esdoc/commit/2d34d464f4584820450041bff2e64888b08b5aad))

## 0.1.0
- First release
