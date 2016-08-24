import * as lazy from '../source';

describe(`emptyList`, function() {
  const lst = lazy.list();
  it(`should be an empty list`, function() {
    lst.should.equal(lazy.emptyList);
    lazy.emptyList.should.equal(lst);
    lazy.length(lazy.emptyList).should.equal(0);
  });
});
