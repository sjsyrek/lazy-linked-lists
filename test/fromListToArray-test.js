import * as lazy from '../source'

describe(`fromListToArray()`, function () {
  const lst = lazy.list(1, 2, 3)
  const arr = [1, 2, 3]
  it(`should convert a list into an array`, function () {
    lazy.fromListToArray(lst).should.eql(arr)
  })
})
