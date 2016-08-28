import * as lazy from '../source'

describe(`replicate()`, function () {
  const lst = lazy.list(3, 3, 3, 3, 3, 3, 3, 3, 3, 3)
  it(`should return a list of a specified length in which every value is the same`, function () {
    lazy.replicate(10, 3).isEq(lst).should.be.true
  })
})
