import * as lazy from '../source'

describe(`isList()`, function () {
  const lst = lazy.list(1, 2, 3)
  it(`should return true if the argument is a list`, function () {
    lazy.isList(lst).should.be.true
    lazy.isList(lazy.emptyList).should.be.true
  })
  it(`should return false if the argument is not a list`, function () {
    lazy.isList(0).should.be.false
  })
})
