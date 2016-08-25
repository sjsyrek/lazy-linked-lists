import * as lazy from '../source'

describe(`cycle()`, function () {
  const lst = lazy.list(1, 2, 3)
  const cyc = lazy.cycle(lst)
  it(`should return the infinite repetition of a list`, function () {
    lazy.take(9, cyc).should.eql(lazy.list(1, 2, 3, 1, 2, 3, 1, 2, 3))
    lazy.index(cyc, 100).should.equal(2)
  })
  it(`should throw an error if the list is empty`, function () {
    lazy.cycle.bind(null, lazy.emptyList).should.throw()
  })
})
