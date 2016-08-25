import * as lazy from '../source'

describe(`iterate()`, function () {
  const inf = lazy.iterate(x => x * 2, 1)
  it(`should return an infinite list of repeated applications of a function to a value`, function () {
    lazy.take(10, inf).should.eql(lazy.list(1, 2, 4, 8, 16, 32, 64, 128, 256, 512))
    lazy.index(inf, 10).should.equal(1024)
  })
})
