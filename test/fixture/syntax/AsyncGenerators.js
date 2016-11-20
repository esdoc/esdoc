export default class Foo {
  async *method() {
    const stream = [ Promise.resolve(4), Promise.resolve(9), Promise.resolve(12) ];
    let total = 0;
    for await (const val of stream) {
      total += await val;
      yield total;
    }
  }
}
