import * as lazy from '../';

describe(`fromArrayToList()`, function() {
  const lst = lazy.list(1,2,3);
  const arr = [1,2,3];
  it(`should convert an array into a list`, function() {
    lazy.fromArrayToList(arr).should.eql(lst);
  });
});
