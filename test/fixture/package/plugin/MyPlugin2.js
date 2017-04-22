const callInfo = require('./MyPlugin1.js').callInfo;

exports.onStart = function(ev) {
  callInfo.handlerNames.onStart.push('MyPlugin2');
};

exports.onHandleConfig = function(ev) {
  callInfo.handlerNames.onHandleConfig.push('MyPlugin2');
};

exports.onHandleCode = function(ev) {
  callInfo.handlerNames.onHandleCode.push('MyPlugin2');
};

exports.onHandleCodeParser = function(ev) {
  callInfo.handlerNames.onHandleCodeParser.push('MyPlugin2');
};

exports.onHandleAST = function(ev) {
  callInfo.handlerNames.onHandleAST.push('MyPlugin2');
};

exports.onHandleDocs = function(ev) {
  callInfo.handlerNames.onHandleDocs.push('MyPlugin2');
};

exports.onPublish = function(ev) {
  callInfo.handlerNames.onPublish.push('MyPlugin2');
};

exports.onHandleContent = function(ev) {
  callInfo.handlerNames.onHandleContent.push('MyPlugin2');
};

exports.onComplete = function(ev) {
  callInfo.handlerNames.onComplete.push('MyPlugin2');
};
