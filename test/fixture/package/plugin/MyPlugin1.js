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
};

exports.onHandleCode = function(ev) {
  callInfo.handlerNames.onHandleCode = ['MyPlugin1'];
  ev.data.code = '/** this is class */ export default class MyClass_ModifiedCode {}';
};

exports.onHandleCodeParser = function(ev) {
  callInfo.handlerNames.onHandleCodeParser = ['MyPlugin1'];
  originalParser = ev.data.parser;
  ev.data.parser = parser;
};

exports.onHandleAST = function(ev) {
  callInfo.handlerNames.onHandleAST = ['MyPlugin1'];
  ev.data.ast.program.body[0].declaration.id.name += '_ModifiedAST';
};

exports.onHandleTag = function(ev) {
  callInfo.handlerNames.onHandleTag = ['MyPlugin1'];
  ev.data.tag[1].name += '_ModifiedTag';
};

exports.onPublish = function(ev) {
  callInfo.handlerNames.onPublish = ['MyPlugin1'];
  ev.data.writeFile('index.html', '<html><head><meta charset="utf=8"/></head><body>content was made by MyPlugin1.onPublish</body></html>');
};

exports.onHandleContent = function(ev) {
  callInfo.handlerNames.onHandleContent = ['MyPlugin1'];
  ev.data.content = ev.data.content.replace('MyPlugin1', 'MyPlugin1(modified)');
};

exports.onHandleHTML = function(ev) {
  callInfo.handlerNames.onHandleHTML = ['MyPlugin1'];
  ev.data.html = ev.data.html.replace(
    '</head>',
    `<meta name="x-from-plugin" content="fileName:${ev.data.fileName}" />\n</head>`
  );
};

exports.onComplete = function(ev) {
  callInfo.handlerNames.onComplete = ['MyPlugin1'];
};
