# Migration to V1.0.0
ESDoc v1.0 adopts plugin architecture. So, almost all features are provided as plugins.<br/>
Please change your config to load plugins.

## Using esdoc-standard-plugin
Main features of ESDoc were carved out to [esdoc-standard-plugin](https://github.com/esdoc/esdoc-plugins/tree/master/esdoc-standard-plugin)

Please use the plugin with the following config.

`npm install esdoc-standard-plugin`

```json
{
  "source": "./src",
  "destination": "./docs",
  "plugins": [{"name": "esdoc-standard-plugin"}]
}
```

The full config description is [here](./config.html#full-config).<br/>
Especially [integration test codes](./config.html#integrate-test-codes-config) and [integration manual](./config.html#integrate-manual-config) were big changed.

## Using Other Plugins
The following features were carved out to each plugins. If you want to use the features, please use the plugins.

- `config.includeSource` => [esdoc-exclude-source-plugin](https://github.com/esdoc/esdoc-plugins/tree/master/esdoc-exclude-source-plugin)
- `config.styles` => [esdoc-inject-style-plugin](https://github.com/esdoc/esdoc-plugins/blob/master/esdoc-inject-style-plugin)
- `config.scripts` => [esdoc-inject-script-plugin](https://github.com/esdoc/esdoc-plugins/blob/master/esdoc-inject-script-plugin)
- `config.experimentalProposal` => [esdoc-ecmascript-proposal-plugin](https://github.com/esdoc/esdoc-plugins/tree/master/esdoc-ecmascript-proposal-plugin)
- Parsing JSX => [esdoc-jsx-plugin](https://github.com/esdoc/esdoc-plugins/tree/master/esdoc-jsx-plugin)
