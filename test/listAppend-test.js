import * as lazy from '../';

describe(`listAppend()`, function() {
  const lst1 = lazy.list(1,2,3);
  const lst2 = lazy.list(4,5,6);
  it(`should append one list to another`, function() {
    lazy.listAppend(lst1, lst2).should.eql(lazy.list(1,2,3,4,5,6));
  });
});
