/**
 * @test {TestTarget1}
 */
describe('describe/', ()=>{
  /**
   * @test {TestTarget2}
   */
  it('describe/it', ()=>{});

  /**
   * @test {TestTarget3}
   */
  describe('describe/describe/', ()=>{
    /**
     * @test {TestTarget4}
     */
    it('describe/describe/it', ()=>{});
  });

  /**
   * @test {TestTarget5}
   */
  context('describe/context/', ()=>{
    /**
     * @test {TestTarget6}
     */
    it('describe/context/it', ()=>{});
  });
});

/**
 * @test {TestTarget7}
 */
suite('suite/', ()=>{
  /**
   * @test {TestTarget8}
   */
  test('suite/test', ()=>{});

  /**
   * @test {TestTarget9}
   */
  suite('suite/suite/', ()=>{
    /**
     * @test {TestTarget10}
     */
    test('suite/suite/test', ()=>{});
  })
});
