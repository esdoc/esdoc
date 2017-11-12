import assert from 'assert';
import fs from 'fs';
import path from 'path';

describe('config outputAST:', ()=>{
  it('does not generate AST', ()=>{
    const outDir = fs.readdirSync(path.resolve(__dirname, '../../out'));
    assert(outDir.includes('ast') === false)
  });
});
