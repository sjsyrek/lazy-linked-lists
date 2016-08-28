import * as lazy from '../source'

describe(`listRangeBy()`, function () {
  const lst1 = lazy.listRangeBy(0, 50, x => x + 5)
  const lst2 = lazy.listRangeBy(10, 0, x => x - 1)
  const lst3 = lazy.list(0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50)
  const lst4 = lazy.list(10, 9, 8, 7, 6, 5, 4, 3, 2, 1)
  it(`should build a list from a range of values`, function () {
    lst1.isEq(lst3).should.be.true
    lst2.isEq(lst4).should.be.true
  })
  it(`should return a singleton list if the start and end values are the same`, function () {
    lazy.listRangeBy(1, 1).isEq(lazy.list(1)).should.be.true
  })
})
