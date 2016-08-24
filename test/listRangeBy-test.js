import * as lazy from '../';

describe(`listRangeBy()`, function() {
  const lst1 = lazy.listRangeBy(0, 50, x => x + 5);
  const lst2 = lazy.listRangeBy(10, 0, x => x - 1);
  it(`should build a list from a range of values`, function() {
    lst1.should.eql(lazy.list(0,5,10,15,20,25,30,35,40,45,50));
    lst2.should.eql(lazy.list(10,9,8,7,6,5,4,3,2,1));
  });
  it(`should return a singleton list if the start and end values are the same`, function() {
    lazy.listRangeBy(1, 1).should.eql(lazy.list(1));
  });
});
