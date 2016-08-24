import * as lazy from '../';

describe(`map()`, function() {
  const lst1 = lazy.list(1,2,3);
  const f = x => x * 3;
  it(`should map a function over a list and return the results in a new list`, function() {
    lazy.map(f, lst1).should.eql(lazy.list(3,6,9));
  });
});
