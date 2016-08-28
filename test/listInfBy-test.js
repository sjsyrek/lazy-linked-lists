import * as lazy from '../source'

describe(`listInfBy()`, function () {
  const inf = lazy.listInfBy(1, x => x * 2)
  it(`should generate an infinite list`, function () {
    lazy.take(3, inf).isEq(lazy.list(1, 2, 4)).should.be.true
    lazy.index(inf, 10).should.equal(1024)
  })
})
