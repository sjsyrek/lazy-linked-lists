import * as lazy from '../';

describe(`dropWhile()`, function() {
  const lst = lazy.list(1,2,3,4,5,6,7,8,9,10);
  const f = x => x < 3;
  it(`should drop values from a list while a given predicate function returns true`, function() {
    lazy.dropWhile(f, lst).should.eql(lazy.list(3,4,5,6,7,8,9,10));
  });
  it(`should return an empty list if the second argument is an empty list`, function() {
    lazy.dropWhile(f, lazy.emptyList).should.equal(lazy.emptyList);
  });
});
