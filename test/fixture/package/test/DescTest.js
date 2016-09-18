/** @test {TestDescClass} */
describe('Use describe style mocha interface', ()=>{
  /** @test {TestDescClass#constructor} */
  it('Use it style mocha interface', ()=>{
  });

  /** @test {TestDescClass#p1} */
  describe('Nested describe', ()=>{
    /** @test {testDescVariable} */
    it('Nested it in describe', ()=>{
    });
  });

  /** @test {TestDescClass#method1} */
  context('Use context style mocha interface', ()=>{
    /** @test {testDescFunction} */
    it('Nested it in context', ()=>{
    });
  });
});

/** @test {TestDescClass} */
suite('Use suite style mocha interface', ()=>{
  /** @test {TestDescClass#constructor} */
  test('Use test style mocha interface', ()=>{
  });

  /** @test {TestDescClass#p1} */
  suite('Nested suite', ()=>{
    /** @test {TestDescClass#method1} */
    test('Nested test', ()=>{
    });
  })
});
