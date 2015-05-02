import fs from 'fs-extra';
import path from 'path';
import espree from 'espree';

export default class ESParser {
  static parse(filePath) {
    let code = fs.readFileSync(filePath, {encode: 'utf8'}).toString();

    if (code.charAt(0) === '#') {
      code = code.replace(/^#!/, '//');
    }

    let option = {
      comments: true,
      attachComment: true,
      loc: true,
      ecmaFeatures: {
        arrowFunctions: true,
        blockBindings: true,
        destructuring: true,
        regexYFlag: true,
        regexUFlag: true,
        templateStrings: true,
        binaryLiterals: true,
        octalLiterals: true,
        unicodeCodePointEscapes: true,
        defaultParams: true,
        restParams: true,
        forOf: true,
        objectLiteralComputedProperties: true,
        objectLiteralShorthandMethods: true,
        objectLiteralShorthandProperties: true,
        objectLiteralDuplicateProperties: true,
        generators: true,
        spread: true,
        classes: true,
        modules: true,
        jsx: true,
        globalReturn: true
      }
    };

    let ast = espree.parse(code, option);

    return ast;
  }
}
