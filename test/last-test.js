import * as lazy from '../';

describe(`last()`, function() {
  const lst = lazy.list(1,2,3);
  it(`should extract the last element of a list`, function() {
    lazy.last(lst).should.equal(3);
  });
  it(`should throw an error if the list is empty`, function() {
    lazy.last.bind(null, lazy.emptyList).should.throw();
  });
});
