import * as lazy from '../source'

describe(`filter()`, function () {
  const lst = lazy.listRangeBy(0, 50, x => x + 5)
  const f = x => x % 10 === 0
  it(`should return the list of elements in a list for which a function f returns true`, function () {
    lazy.filter(f, lst).isEq(lazy.list(0, 10, 20, 30, 40, 50)).should.be.true
  })
})
