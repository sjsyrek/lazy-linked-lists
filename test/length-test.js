import * as lazy from '../source';

describe(`length()`, function() {
  const lst1 = lazy.list(1,2,3);
  const lst2 = lazy.listRange(0,10);
  it(`should return the length of a list`, function() {
    lazy.length(lst1).should.equal(3);
    lazy.length(lst2).should.equal(10);
  });
});
