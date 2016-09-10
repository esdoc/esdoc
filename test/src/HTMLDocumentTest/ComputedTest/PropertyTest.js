import {readDoc, assert, find} from './../../util.js';

/** @test {MemberDoc#@_name} */
describe('TestComputedProperty:', ()=> {
  const doc = readDoc('class/src/Computed/Property.js~TestComputedProperty.html');

  describe('in summary:', ()=>{
    it('has computed properties.', ()=> {
      find(doc, '[data-ice="memberSummary"]', (doc)=>{
        assert.includes(doc, `[href="class/src/Computed/Property.js~TestComputedProperty.html#instance-member-['foo']"]`,             `['foo']`);
        assert.includes(doc, `[href="class/src/Computed/Property.js~TestComputedProperty.html#instance-member-[Symbol.iterator]"]`,  `[Symbol.iterator]`);
        assert.includes(doc, '[href="class/src/Computed/Property.js~TestComputedProperty.html#instance-member-[`${ foo }`]"]',       '[`${ foo }`]');
        assert.includes(doc, `[href="class/src/Computed/Property.js~TestComputedProperty.html#instance-member-[foo + bar]"]`,        `[foo + bar]`);
        assert.includes(doc, `[href="class/src/Computed/Property.js~TestComputedProperty.html#instance-member-[foo()]"]`,            `[foo()]`);
        assert.includes(doc, `[href="class/src/Computed/Property.js~TestComputedProperty.html#instance-member-[foo.bar()]"]`,        `[foo.bar()]`);
        assert.includes(doc, `[href="class/src/Computed/Property.js~TestComputedProperty.html#instance-member-[foo.bar.baz]"]`,      `[foo.bar.baz]`);
        assert.includes(doc, `[href="class/src/Computed/Property.js~TestComputedProperty.html#instance-member-[foo.bar]"]`,          `[foo.bar]`);
        assert.includes(doc, `[href="class/src/Computed/Property.js~TestComputedProperty.html#instance-member-[foo.p + bar]"]`,      `[foo.p + bar]`);
        assert.includes(doc, `[href="class/src/Computed/Property.js~TestComputedProperty.html#instance-member-[foo]"]`,              `[foo]`);
      });
    });
  });

  describe('in detail:', ()=>{
    it('has computed properties.', ()=>{
      assert.includes(doc, `[id="instance-member-['foo']"] [data-ice="name"]`,            `['foo']`);
      assert.includes(doc, `[id="instance-member-[Symbol.iterator]"] [data-ice="name"]`,  `[Symbol.iterator]`);
      assert.includes(doc, '[id="instance-member-[`${ foo }`]"] [data-ice="name"]',       '[`${ foo }`]');
      assert.includes(doc, `[id="instance-member-[foo + bar]"] [data-ice="name"]`,        `[foo + bar]`);
      assert.includes(doc, `[id="instance-member-[foo()]"] [data-ice="name"]`,            `[foo()]`);
      assert.includes(doc, `[id="instance-member-[foo.bar()]"] [data-ice="name"]`,        `[foo.bar()]`);
      assert.includes(doc, `[id="instance-member-[foo.bar.baz]"] [data-ice="name"]`,      `[foo.bar.baz]`);
      assert.includes(doc, `[id="instance-member-[foo.bar]"] [data-ice="name"]`,          `[foo.bar]`);
      assert.includes(doc, `[id="instance-member-[foo.p + bar]"] [data-ice="name"]`,      `[foo.p + bar]`);
      assert.includes(doc, `[id="instance-member-[foo]"] [data-ice="name"]`,              `[foo]`);
    });
  });
});
