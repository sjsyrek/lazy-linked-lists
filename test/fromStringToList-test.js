import * as lazy from '../source';

describe(`fromStringToList()`, function() {
  const lst = lazy.list(1,2,3);
  const str = lazy.list(`a`,`b`,`c`);
  it(`should convert a string into a list`, function() {
    lazy.fromStringToList(`abc`).should.eql(str);
  });
});
