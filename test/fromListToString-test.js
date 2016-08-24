import * as lazy from '../source';

describe(`fromListToString()`, function() {
  const str = lazy.list(`a`,`b`,`c`);
  it(`should convert a list into a string`, function() {
    lazy.fromListToString(str).should.equal(`abc`);
  });
});
