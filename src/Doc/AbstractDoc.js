import Logger from '../Util/Logger.js';
import assert from 'assert';
import esquery from 'esquery';

export default class AbstractDoc {
  constructor(ast, node, pathResolver){
    this._ast = ast;
    this._node = node;
    this._pathResolver = pathResolver;
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

  get tags() {
    return JSON.parse(JSON.stringify(this._tags));
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
      default:
        Logger.w(`unknown node type. type = "${node.type}"`);
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
        break;
      case 'MethodDefinition':
        assert(parent.type === 'ClassBody');
        while (parent) {
          if (parent.type === 'ClassDeclaration') {
            memberof = parent.id.name;
            break;
          }
          parent = parent.parent;
        }
        assert(memberof);
        break;
      case 'ExpressionStatement':
        while (parent) {
          if (parent.type === 'ClassDeclaration') {
            memberof = parent.id.name;
            break;
          }
          parent = parent.parent;
        }
        assert(memberof);
        break;
      default:
        while (parent) {
          if (parent.type === 'ClassDeclaration') {
            memberof = parent.id.name;
            break;
          }
          parent = parent.parent;
        }
        Logger.w(`unknown node type. type = "${node.type}"`);
    }

    this._cache.memberof = memberof;

    return memberof;
  }

  get longname() {
    if ('longname' in this._cache) return this._cache.longname;

    let name = this.name;
    let memberof = this.memberof;

    let longname;
    if (memberof) {
      if (this.static) {
        longname = `${memberof}.${name}`;
      } else {
        longname = `${memberof}#${name}`;
      }
    } else {
      longname = name;
    }

    longname = `${this._pathResolver.filePath}~${longname}`;

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
}
