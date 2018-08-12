import assert from 'assert';
import {find} from '../../util';

describe('test/Emits/Emits:', ()=>{
  it('has emits from method', ()=>{
    const doc = find('longname', 'src/Emits/Emits.js~TestEmitsClass#methodEmits');
    assert.deepEqual(doc.emits, [
      {
        types: ["Event"],
        name: "foo",
        description: "emits event when foo."
      },
      {
        types: ["Event"],
        name: "bar",
        description: "emits event when bar."
      }
    ]);
  });

  it('has emits from function', ()=>{
    const doc = find('longname', 'src/Emits/Emits.js~testEmitsFunction');
    assert.deepEqual(doc.emits, [
      {
        types: ["Event"],
        name: "fizz",
        description: ""
      },
    ]);
  });

  it('has emits from class', ()=>{
    const doc = find('longname', 'src/Emits/Emits.js~TestEmitsClass');
    assert.deepEqual(doc.emits, [
      {
        types: ["InputEvent"],
        name: "input",
        description: "",
      },
      {
        types: ["MouseEvent"],
        name: "click",
        description: "emits class event when click.",
      },
      {
        types: ["CustomEvent"],
        name: "foobar",
        description: "emits class event when foobar.",
      },
    ]);
  });
});
