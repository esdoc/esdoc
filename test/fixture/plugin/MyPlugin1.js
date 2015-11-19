var callInfo = {handlerNames: {}, usedParser: false};
exports.callInfo = callInfo;

var originalParser;
function parser(code) {
  callInfo.usedParser = true;
  return originalParser(code);
}

exports.onStart = function(ev) {
  callInfo.handlerNames.onStart = ['MyPlugin1'];
  callInfo.option = ev.data.option;
};

exports.onHandleConfig = function(ev) {
  callInfo.handlerNames.onHandleConfig = ['MyPlugin1'];
  ev.data.config.title = 'Modified Config';
};

exports.onHandleCode = function(ev) {
  callInfo.handlerNames.onHandleCode = ['MyPlugin1'];
  ev.data.code = 'export default class MyClass_ModifiedCode {}';
};

exports.onHandleCodeParser = function(ev) {
  callInfo.handlerNames.onHandleCodeParser = ['MyPlugin1'];
  originalParser = ev.data.parser;
  ev.data.parser = parser;
};

exports.onHandleAST = function(ev) {
  callInfo.handlerNames.onHandleAST = ['MyPlugin1'];
  ev.data.ast.body[0].declaration.id.name += '_ModifiedAST';
};

exports.onHandleTag = function(ev) {
  callInfo.handlerNames.onHandleTag = ['MyPlugin1'];
  ev.data.tag[1].name += '_ModifiedTag';
};

exports.onHandleHTML = function(ev) {
  callInfo.handlerNames.onHandleHTML = ['MyPlugin1'];
  ev.data.html = ev.data.html.replace('MyClass_ModifiedCode_ModifiedAST_ModifiedTag', 'MyClass_ModifiedCode_ModifiedAST_ModifiedTag_ModifiedHTML');
  // insert ev.data.fileName into <head />
  ev.data.html = ev.data.html.replace(
    '</head>',
    '<meta name="x-from-plugin" content="fileName:' + ev.data.fileName + '" />\n</head>'
  );
};

exports.onComplete = function(ev) {
  callInfo.handlerNames.onComplete = ['MyPlugin1'];
};
