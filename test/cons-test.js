import * as lazy from '../source'

describe(`cons()`, function () {
  const lst = lazy.list(4, 5, 6)
  it(`should create a new list from a head and tail`, function () {
    lazy.cons(3, lst).isEq(lazy.list(3, 4, 5, 6))
    lazy.cons(1, lazy.emptyList).isEq(lazy.list(1)).should.be.true
  })
})
