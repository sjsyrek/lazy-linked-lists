import * as lazy from '../source'

describe(`init()`, function () {
  const lst = lazy.list(1, 2, 3)
  it(`should return all the elements of a list except the last one`, function () {
    lazy.init(lst).isEq(lazy.list(1, 2)).should.be.true
  })
  it(`should throw an error if the list is empty`, function () {
    lazy.init.bind(null, lazy.emptyList).should.throw()
  })
})
