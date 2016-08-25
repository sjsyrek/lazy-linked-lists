import * as lazy from '../source'

describe(`isEmpty()`, function () {
  const lst = lazy.list(1, 2, 3)
  it(`should return true if the argument is an empty list`, function () {
    lazy.isEmpty(lazy.emptyList).should.be.true
  })
  it(`should return false if the argument list is not empty`, function () {
    lazy.isEmpty(lst).should.be.false
  })
})
