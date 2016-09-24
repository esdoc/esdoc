import path from 'path';
import fs from 'fs-extra';
import DocBuilder from './DocBuilder.js';
import ASTNodeContainer from '../../Util/ASTNodeContainer.js';

/** @ignore */
export const _results = [];

/**
 * Lint Output Builder class.
 */
export default class LintDocBuilder extends DocBuilder {
  /**
   * execute building output.
   */
  exec() {
    const results = [];
    const docs = this._find({kind: ['method', 'function']});
    for (let doc of docs) {
      if (doc.undocument) continue;

      const node = ASTNodeContainer.getNode(doc.__docId__);
      const codeParams = this._getParamsFromNode(node);
      const docParams = this._getParamsFromDoc(doc);
      if (this._match(codeParams, docParams)) continue;

      results.push({node, doc, codeParams, docParams});
    }

    _results.push(...results);

    this._showResult(results);
  }

  /**
   * get variable names of method argument.
   * @param {ASTNode} node - target node.
   * @returns {string[]} variable names.
   * @private
   */
  _getParamsFromNode(node) {
    let params;
    switch (node.type) {
      case 'FunctionExpression':
      case 'FunctionDeclaration':
        params = node.params || [];
        break;
      case 'ClassMethod':
        params = node.params || [];
        break;
      default:
        throw new Error(`unknown node type. type = ${node.type}`);
    }

    const result = [];
    for (let param of params) {
      switch (param.type) {
        case 'Identifier':
          result.push(param.name);
          break;
        case 'AssignmentPattern':
          if (param.left.type === 'Identifier') {
            result.push(param.left.name);
          } else if (param.left.type === 'ObjectPattern') {
            result.push('*');
          }
          break;
        case 'RestElement':
          result.push(param.argument.name);
          break;
        case 'ObjectPattern':
          result.push('*');
          break;
        case 'ArrayPattern':
          result.push('*');
          break;
      }
    }

    return result;
  }

  /**
   * get variable names of method argument.
   * @param {DocObject} doc - target doc object.
   * @returns {string[]} variable names.
   * @private
   */
  _getParamsFromDoc(doc) {
    const params = doc.params || [];
    return params.map(v => v.name).filter(v => !v.includes('.')).filter(v => !v.includes('['));
  }

  _match(codeParams, docParams) {
    if (codeParams.length !== docParams.length) return false;

    for (let i = 0; i < codeParams.length; i++) {
      if (codeParams[i] === '*') {
        // nothing
      } else if (codeParams[i] !== docParams[i]) {
        return false;
      }
    }

    return true;
  }

  /**
   * show invalid lint code.
   * @param {Object[]} results - target results.
   * @param {DocObject} results[].doc
   * @param {ASTNode} results[].node
   * @param {string[]} results[].codeParams
   * @param {string[]} results[].docParams
   * @private
   */
  _showResult(results) {
    const sourceDir = path.dirname(path.resolve(this._config.source));
    for (let result of results) {
      const doc = result.doc;
      const node = result.node;
      const filePath = doc.longname.split('~')[0];
      const name = doc.longname.split('~')[1];
      const absFilePath = path.resolve(sourceDir, filePath);
      const comment = node.leadingComments[node.leadingComments.length - 1];
      const startLineNumber = comment.loc.start.line;
      const endLineNumber = node.loc.start.line;
      const lines = fs.readFileSync(absFilePath).toString().split('\n');
      const targetLines = [];

      for (let i = startLineNumber - 1; i < endLineNumber; i++) {
        targetLines.push(`${i}| ` + lines[i]);
      }

      console.log(`[33mwarning: signature mismatch: ${name} ${filePath}#${startLineNumber}[32m`);
      console.log(targetLines.join('\n'));
      console.log('[0m');
    }
  }
}
