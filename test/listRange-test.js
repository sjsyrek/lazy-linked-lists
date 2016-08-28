import * as lazy from '../source'

describe(`listRange()`, function () {
  const lst1 = lazy.listRange(0, 10)
  const lst2 = lazy.listRange(10, 0)
  const lst3 = lazy.list(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
  const lst4 = lazy.list(10, 9, 8, 7, 6, 5, 4, 3, 2, 1)
  it(`should build a list from a range of values`, function () {
    lst1.isEq(lst3).should.be.true
    lst2.isEq(lst4).should.be.true
  })
  it(`should return a singleton list if the start and end values are the same`, function () {
    lazy.listRange(1, 1).isEq(lazy.list(1)).should.be.true
  })
})
