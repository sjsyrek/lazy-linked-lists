import * as lazy from '../';

describe(`repeat()`, function() {
  const inf = lazy.repeat(3);
  it(`should build an infinite list of identical values`, function() {
    lazy.take(10, inf).should.eql(lazy.list(3,3,3,3,3,3,3,3,3,3));
    lazy.index(inf, 100).should.equal(3);
  });
});
