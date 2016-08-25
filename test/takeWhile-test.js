import * as lazy from '../source'

describe(`takeWhile()`, function () {
  const lst = lazy.list(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
  const f = x => x < 3
  it(`should return the longest prefix of a list of values that satisfy a predicate function`, function () {
    lazy.takeWhile(f, lst).should.eql(lazy.list(0, 1, 2))
  })
  it(`should return an empty list if the second argument is an empty list`, function () {
    lazy.takeWhile(f, lazy.emptyList).should.equal(lazy.emptyList)
  })
})
