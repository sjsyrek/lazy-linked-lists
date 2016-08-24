import * as lazy from '../';

describe(`drop()`, function() {
  const lst = lazy.list(1,2,3);
  it(`should return the suffix of a list after discarding a specified number of values`, function() {
    lazy.drop(2, lst).should.eql(lazy.list(3));
  });
  it(`should return the empty list if the second argument is the empty list`, function() {
    lazy.drop(2, lazy.list()).should.equal(lazy.emptyList);
  });
});
