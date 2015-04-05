require('espower-loader')({
  // directory where match starts with
  cwd: process.cwd(),
  // glob pattern using minimatch module
  pattern: 'test/src/**/*.js'
});
