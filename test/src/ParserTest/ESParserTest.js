import assert from 'assert';
import ESParser from '../../../src/Parser/ESParser.js';

/** @test {ESParser} */
describe('ESParser', ()=>{
  it('can parse "do expressions"', ()=>{
    const ast = ESParser.parse({experimentalProposal: {doExpressions: true}}, './test/fixture/syntax/DoExpressions.js');
    assert(ast.program.sourceType === 'module');
  });

  it('can parse "function bind"', ()=>{
    const ast = ESParser.parse({experimentalProposal: {functionBind: true}}, './test/fixture/syntax/FunctionBind.js');
    assert(ast.program.sourceType === 'module');
  });

  it('can parse "function sent"', ()=>{
    const ast = ESParser.parse({experimentalProposal: {functionSent: true}}, './test/fixture/syntax/FunctionSent.js');
    assert(ast.program.sourceType === 'module');
  });

  it('can parse "async generators"', ()=>{
    const ast = ESParser.parse({experimentalProposal: {asyncGenerators: false}}, './test/fixture/syntax/AsyncGenerators.js');
    assert(ast.program.sourceType === 'module');
  });
});
