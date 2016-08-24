import * as lazy from '../';

describe(`sort()`, function() {
  const lst1 = lazy.list(1,2,3,4,5,6,7,8,9,10);
  const lst2 = lazy.list(10,9,8,7,6,5,4,3,2,1);
  const lst3 = lazy.list(1,1,4,4,9,9,6,6,3,3,8,8,7,7,5,5,2,2,10,10);
  const lst4 = lazy.list(1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10);
  const lst5 = lazy.list(20,19,18,17,16,15,14,13,12,11,10,1,2,3,4,5,6,7,8,9);
  const lst6 = lazy.list(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,30);
  it(`should sort a list using a merge sort algorithm`, function() {
    lazy.sort(lst1).should.eql(lst1);
    lazy.sort(lst2).should.eql(lst1);
    lazy.sort(lazy.list(1)).should.eql(lazy.list(1));
    lazy.sort(lazy.list()).should.equal(lazy.emptyList);
    lazy.sort(lst3).should.eql(lst4);
    lazy.sort(lst5).should.eql(lst6);
  });
});
