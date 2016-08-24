import * as lazy from '../source';

describe(`replicate()`, function() {
  it(`should return a list of a specified length in which every value is the same`, function() {
    lazy.replicate(10, 3).should.eql(lazy.list(3,3,3,3,3,3,3,3,3,3));
  });
});
