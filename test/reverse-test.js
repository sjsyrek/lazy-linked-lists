import * as lazy from '../source';

describe(`reverse()`, function() {
  const lst1 = lazy.list(1,2,3);
  const lst2 = lazy.list(3,2,1);
  it(`should reverse a list`, function() {
    lazy.reverse(lst1).should.eql(lst2);
  });
});
