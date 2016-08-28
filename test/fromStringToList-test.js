import * as lazy from '../source'

describe(`fromStringToList()`, function () {
  const str = lazy.list(`a`, `b`, `c`)
  it(`should convert a string into a list`, function () {
    lazy.fromStringToList(`abc`).isEq(str).should.be.true
  })
})
