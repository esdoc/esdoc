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
    const ast = ESParser.parse({experimentalProposal: {asyncGenerators: true}}, './test/fixture/syntax/AsyncGenerators.js');
    assert(ast.program.sourceType === 'module');
  });

  it('can parse "export extensions"', ()=>{
    const ast = ESParser.parse({experimentalProposal: {exportExtensions: true}}, './test/fixture/syntax/ExportExtensions.js');
    assert(ast.program.sourceType === 'module');
  });

  it('can parse "dynamic import"', ()=>{
    const ast = ESParser.parse({experimentalProposal: {dynamicImport: true}}, './test/fixture/syntax/DynamicImport.js');
    assert(ast.program.sourceType === 'module');
  });
  
  it('can parse "flow"', ()=>{
    const ast = ESParser.parse({parserPlugins: ['flow']}, './test/fixture/syntax/Flow.js');
    assert(ast.program.sourceType === 'module');
  });
});
