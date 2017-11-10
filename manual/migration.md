# Migration to V1.0.0
esdoc2 v1.0 adopts plugin architecture. So, almost all features are provided as plugins.<br/>
Please change your config to load plugins.

## Using esdoc2-standard-plugin
Main features of esdoc2 were carved out to [esdoc2-standard-plugin](https://github.com/esdoc2/esdoc2-plugins/tree/master/esdoc2-standard-plugin)

Please use the plugin with the following config.

`npm install esdoc2-standard-plugin`

```json
{
  "source": "./src",
  "destination": "./docs",
  "plugins": [{"name": "esdoc2-standard-plugin"}]
}
```

The full config description is [here](./config.html#full-config).<br/>
Especially [integration test codes](./config.html#integrate-test-codes-config) and [integration manual](./config.html#integrate-manual-config) were big changed.

## Using Other Plugins
The following features were carved out to each plugins. If you want to use the features, please use the plugins.

- `config.includeSource` => [esdoc2-exclude-source-plugin](https://github.com/esdoc2/esdoc2-plugins/tree/master/esdoc2-exclude-source-plugin)
- `config.styles` => [esdoc2-inject-style-plugin](https://github.com/esdoc2/esdoc2-plugins/blob/master/esdoc2-inject-style-plugin)
- `config.scripts` => [esdoc2-inject-script-plugin](https://github.com/esdoc2/esdoc2-plugins/blob/master/esdoc2-inject-script-plugin)
- `config.experimentalProposal` => [esdoc2-ecmascript-proposal-plugin](https://github.com/esdoc2/esdoc2-plugins/tree/master/esdoc2-ecmascript-proposal-plugin)
- Parsing JSX => [esdoc2-jsx-plugin](https://github.com/esdoc2/esdoc2-plugins/tree/master/esdoc2-jsx-plugin)
