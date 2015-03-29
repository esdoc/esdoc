import assert from 'assert';
import esquery from 'esquery';
import Logger from '../Util/Logger.js';
import Doc2Value from './Doc2Value.js';

let TAG = 'AbstractDoc';

export default class AbstractDoc {
  constructor(ast, node, pathResolver, commentTags = []){
    this._ast = ast;
    this._node = node;
    this._pathResolver = pathResolver;
    this._commentTags = commentTags;
    this._tags = [];
    this._cache = {};

    this._push('@kind', this.kind);
    this._push('@name', this.name);
    this._push('@memberof', this.memberof);
    this._push('@longname', this.longname);
    this._push('@static', this.static);
    this._push('@export', this.export);
    this._push('@importPath', this.import);
    this._push('@importStyle', this.importname);
  }

  get value() {
    let doc2value = new Doc2Value(this._commentTags, this._tags);
    return doc2value.value;
  }

  get variation() {
    
  }

  get kind() {
    return null;
  }

  get name() {
    return this._node.id.name;
  }

  get static() {
    if ('static' in this._cache) return this._cache.static;

    let node = this._node;
    let isStatic = true;

    switch (node.type) {
      case 'ClassDeclaration':
        break;
      case 'MethodDefinition':
        assert(node.parent.type === 'ClassBody');
        isStatic = node.static;
        break;
      case 'ExpressionStatement':
        let parent;

        parent = node.parent;
        while (parent) {
          if (parent.type === 'MethodDefinition') {
            isStatic = parent.static;
            break;
          }
          parent = parent.parent;
        }
        break;
      case 'Program': break;
      case 'FunctionDeclaration': break;
      case 'VariableDeclaration': break;
      case 'Typedef':  break;
      case 'External': break;
      default:
        Logger.w(TAG, `unknown node type. type = "${node.type}"`);
    }

    this._cache.static = isStatic;

    return isStatic;
  }

  get memberof() {
    if ('memberof' in this._cache) return this._cache.memberof;

    let node = this._node;
    let memberof = null;
    let parent = node.parent;

    // todo: support nested class.
    switch (node.type) {
      case 'ClassDeclaration':
        memberof = this._pathResolver.filePath;
        break;
      case 'MethodDefinition':
        //assert(parent.type === 'ClassBody');
        //while (parent) {
        //  if (parent.type === 'ClassDeclaration') {
        //    memberof = `${this._pathResolver.filePath}~${parent.id.name}`;
        //    break;
        //  }
        //  parent = parent.parent;
        //}
        //assert(memberof);
        //break;
      case 'ExpressionStatement':
        //while (parent) {
        //  if (parent.type === 'ClassDeclaration') {
        //    memberof = `${this._pathResolver.filePath}~${parent.id.name}`;
        //    break;
        //  }
        //  parent = parent.parent;
        //}
        //assert(memberof);
        //break;
      case 'Typedef':
      case 'External':
        memberof = this._pathResolver.filePath;
        while (parent) {
          if (parent.type === 'ClassDeclaration') {
            memberof = `${this._pathResolver.filePath}~${parent.id.name}`;
            break;
          }
          parent = parent.parent;
        }
        break;
      default:
        memberof = this._pathResolver.filePath;
        Logger.w(`unknown node type. type = "${node.type}"`);
    }

    this._cache.memberof = memberof;

    return memberof;
  }

  get longname() {
    if ('longname' in this._cache) return this._cache.longname;

    let name = this.name;
    let memberof = this.memberof;

    if (!name) {
      this._cache.longname = null;
      return null;
    }

    if (!memberof) {
      this._cache.longname = name;
      return name;
    }

    let longname;
    if (memberof.includes('~')) {
      if (this.static) {
        longname = `${memberof}.${name}`;
      } else {
        longname = `${memberof}#${name}`;
      }
    } else {
      longname = `${memberof}~${name}`;
    }

    this._cache.longname = longname;

    return longname;
  }

  get export() {
    let parent = this._node.parent;
    while (parent) {
      if (parent.type === 'ExportDefaultDeclaration') {
        return true;
      } else if (parent.type === 'ExportNamedDeclaration') {
        return true;
      }

      parent = parent.parent;
    }

    return false;
  }

  get import() {
    return this._pathResolver.importPath;
  }

  get importname() {
    let parent = this._node.parent;
    let node;
    while (parent) {
      if (parent.type === 'ExportDefaultDeclaration') {
        return this.name;
      } else if (parent.type === 'ExportNamedDeclaration') {
        return `{${this.name}}`
      }

      parent = parent.parent;
    }

    return null;
  }

  _push(tagName, tagValue) {
    if (tagName.charAt(0) !== '@') throw new Error(`tagName must be started with "@". tagName = ${tagName}`);
    this._tags.push({tagName, tagValue});
  }

  _resolveLongname(name) {
    let importPath = this._findPathInImportDeclaration(this._ast, name);
    if (importPath) {
      let resolvedPath = this._pathResolver.resolve(importPath);
      let longname = `${resolvedPath}~${name}`;
      return longname;
    }

    return name;
  }

  _findPathInImportDeclaration(ast, name) {
    let nodes = esquery(ast, 'ImportDeclaration');
    for (let node of nodes) {
      for (let spec of node.specifiers) {
        let localName = spec.local.name;
        if (localName === name) {
          return node.source.value;
        }
      }
    }

    return null;
  }

  _flattenMemberExpression(node) {
    let results = [];
    let target = node;

    while(target) {
      if (target.type === 'ThisExpression') {
        results.push('this');
        break;
      } else if (target.type === 'Identifier') {
        results.push(target.name);
        break;
      } else {
        results.push(target.property.name);
        target = target.object;
      }
    }

    return results.reverse().join('.');
  }
}
