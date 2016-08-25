import * as lazy from '../source'

describe(`list()`, function () {
  const lst = lazy.list(1, 2, 3)
  it(`should create a new list from a series of zero or more values`, function () {
    lazy.list(1, 2, 3).should.eql(lst)
  })
})
