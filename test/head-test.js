import * as lazy from '../source'

describe(`head()`, function () {
  const lst = lazy.list(1, 2, 3)
  it(`should extract the first element of a list`, function () {
    lazy.head(lst).should.equal(1)
  })
  it(`should throw an error if the list is empty`, function () {
    lazy.head.bind(null, lazy.emptyList).should.throw()
  })
})
