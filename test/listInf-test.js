import * as lazy from '../';

describe(`listInf()`, function() {
  const lst = lazy.list(1,2,3);
  const inf = lazy.listInf(1);
  it(`should generate an infinite list`, function() {
    lazy.take(3, inf).should.eql(lst);
    lazy.index(inf, 1000).should.equal(1001);
  });
});
