import * as lazy from '../';

describe(`take()`, function() {
  const lst = lazy.list(1,2,3);
  it(`should return the prefix of a list of a given length`, function() {
    lazy.take(2, lst).should.eql(lazy.list(1,2));
  });
  it(`should return the empty list if the second argument is the empty list`, function() {
    lazy.take(2, lazy.list()).should.equal(lazy.emptyList);
  });
});
