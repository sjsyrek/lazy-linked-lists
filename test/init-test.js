import * as lazy from '../';

describe(`init()`, function() {
  const lst = lazy.list(1,2,3);
  it(`should return all the elements of a list except the last one`, function() {
    lazy.init(lst).should.eql(lazy.list(1,2));
  });
  it(`should throw an error if the list is empty`, function() {
    lazy.init.bind(null, lazy.emptyList).should.throw();
  });
});
