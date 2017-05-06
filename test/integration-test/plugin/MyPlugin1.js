const callInfo = {handlerNames: {}, usedParser: false};
exports.callInfo = callInfo;

let originalParser;
function parser(code) {
  callInfo.usedParser = true;
  return originalParser(code);
}

exports.onStart = function(ev) {
  callInfo.handlerNames.onStart = true;
  callInfo.option = ev.data.option;
};

exports.onHandleConfig = function(ev) {
  callInfo.handlerNames.onHandleConfig = true;
};

exports.onHandleCode = function(ev) {
  callInfo.handlerNames.onHandleCode = true;

  if (ev.data.filePath.includes('EmptyForPlugin.js')) {
    ev.data.code = 'export class EmptyForPlugin {}';
  }
};

exports.onHandleCodeParser = function(ev) {
  callInfo.handlerNames.onHandleCodeParser = true;
  originalParser = ev.data.parser;
  ev.data.parser = parser;
};

exports.onHandleAST = function(ev) {
  callInfo.handlerNames.onHandleAST = true;

  if (ev.data.filePath.includes('EmptyForPlugin.js')) {
    ev.data.ast.program.body[0].declaration.id.name += '_Modified1';
  }
};

exports.onHandleDocs = function(ev) {
  callInfo.handlerNames.onHandleDocs = true;

  const doc = ev.data.docs.find((doc) => doc.name === 'EmptyForPlugin_Modified1');
  doc.longname += '_Modified2';
  doc.name += '_Modified2';
};

exports.onPublish = function(ev) {
  callInfo.handlerNames.onPublish = true;

  const docs = JSON.parse(ev.data.readFile('index.json'));
  const doc = docs.find(doc => doc.name === 'EmptyForPlugin_Modified1_Modified2');
  ev.data.writeFile('index.md', `${doc.name}\n made by MyPlugin1`);
};

exports.onHandleContent = function(ev) {
  callInfo.handlerNames.onHandleContent = true;
  ev.data.content = ev.data.content.replace('MyPlugin1', 'MyPlugin1_Modified');
};

exports.onComplete = function(ev) {
  callInfo.handlerNames.onComplete = true;
};
