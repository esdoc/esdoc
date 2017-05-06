const callInfo = {handlerNames: {}};
exports.callInfo = callInfo;

exports.onStart = function(ev) {
  callInfo.handlerNames.onStart = true;
};

exports.onHandleConfig = function(ev) {
  callInfo.handlerNames.onHandleConfig = true;
};

exports.onHandleCode = function(ev) {
  callInfo.handlerNames.onHandleCode = true;
};

exports.onHandleCodeParser = function(ev) {
  callInfo.handlerNames.onHandleCodeParser = true;
};

exports.onHandleAST = function(ev) {
  callInfo.handlerNames.onHandleAST = true;
};

exports.onHandleDocs = function(ev) {
  callInfo.handlerNames.onHandleDocs = true;
};

exports.onPublish = function(ev) {
  callInfo.handlerNames.onPublish = true;
};

exports.onHandleContent = function(ev) {
  callInfo.handlerNames.onHandleContent = true;
};

exports.onComplete = function(ev) {
  callInfo.handlerNames.onComplete = true;
};
