import * as lazy from '../source'

describe(`index()`, function () {
  const lst = lazy.list(1, 2, 3)
  it(`should return the value from a list at the specified index, starting at 0`, function () {
    lazy.index(lst, 2).should.equal(3)
  })
  it(`should throw an error if the index value specified is less than 0`, function () {
    lazy.index.bind(null, lst, -1).should.throw()
  })
  it(`should throw an error if the index value specified is greater than or equal to the length of the list`, function () {
    lazy.index.bind(null, lst, 3).should.throw()
  })
})
