const fs = require('fs-extra');
const path = require('path');
const childProcess = require('child_process');

function rm(path) {
  fs.removeSync(path);
}

function mkdir(path) {
  fs.mkdirs(path);
}

function exec(cmd) {
  cmd = cmd.replace(/\//g, path.sep);
  childProcess.execSync(cmd, {stdio: 'inherit'});
}

function chmod(path, mode) {
  fs.chmodSync(path, mode);
}

function cp(src, dst) {
  fs.copySync(src, dst);
}

function cd(dst) {
  process.chdir(dst);
}

module.exports.rm = rm;
module.exports.mkdir = mkdir;
module.exports.exec = exec;
module.exports.chmod = chmod;
module.exports.cp = cp;
module.exports.cd = cd;
