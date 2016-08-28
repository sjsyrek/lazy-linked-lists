import * as lazy from '../source'

describe(`iterate()`, function () {
  const inf = lazy.iterate(x => x * 2, 1)
  const lst = lazy.list(1, 2, 4, 8, 16, 32, 64, 128, 256, 512)
  it(`should return an infinite list of repeated applications of a function to a value`, function () {
    lazy.take(10, inf).isEq(lst).should.be.true
    lazy.index(inf, 10).should.equal(1024)
  })
})
