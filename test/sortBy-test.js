import * as lazy from '../source';

describe(`sort()`, function() {
  const LT = lazy.LT, GT = lazy.GT, EQ = lazy.EQ;
  const lst1 = lazy.list(1,2,3,4,5,6,7,8,9,10);
  const lst2 = lazy.list(10,9,8,7,6,5,4,3,2,1);
  const lst3 = lazy.listRange(0, 10);
  it(`should sort a list using a merge sort algorithm and a custom comparison function`, function() {
    lazy.sortBy((a, b) => a === b ? EQ : (a < b ? GT : LT), lst2).should.eql(lst2);
    lazy.sortBy((a, b) => a === b ? EQ : (a < b ? LT : GT), lst3).should.eql(lst1);
  });
});
