import * as lazy from '../source'

describe(`repeat()`, function () {
  const inf = lazy.repeat(3)
  const lst = lazy.list(3, 3, 3, 3, 3, 3, 3, 3, 3, 3)
  it(`should build an infinite list of identical values`, function () {
    lazy.take(10, inf).isEq(lst).should.be.true
    lazy.index(inf, 100).should.equal(3)
  })
})
