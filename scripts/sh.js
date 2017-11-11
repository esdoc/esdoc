const { removeSync, mkdirs, chmodSync, copySync } = require('fs-extra');
const execSync = command => {
  const path = require('path');
  const childProcess = require('child_process');

  childProcess.execSync(command.replace(/\//g, path.sep), {stdio: 'inherit'});
}

module.exports = (...commands) => commands.forEach(execSync)
module.exports.rm = removeSync;
module.exports.mkdir = mkdirs;
module.exports.chmod = chmodSync;
module.exports.cp = copySync;
module.exports.cd = process.chdir;
module.exports.exec = execSync;

