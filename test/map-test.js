import * as lazy from '../source'

describe(`map()`, function () {
  const lst1 = lazy.list(1, 2, 3)
  const lst2 = lazy.list(3, 6, 9)
  const f = x => x * 3
  it(`should map a function over a list and return the results in a new list`, function () {
    lazy.map(f, lst1).isEq(lst2).should.be.true
  })
})
