module.exports = {
  plugins: [
    '@babel/plugin-transform-modules-commonjs',
  ],
  presets: [
    [
      '@babel/preset-env',
      {targets: {node: 'current'}},
    ],
  ],
  env: {coverage: {plugins: ['istanbul']}},
};
