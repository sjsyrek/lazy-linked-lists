import * as lazy from '../source';

describe(`tail()`, function() {
  const lst = lazy.list(1,2,3);
  it(`should extract the elements after the head of a list`, function() {
    lazy.tail(lst).should.eql(lazy.list(2,3));
  });
  it(`should throw an error if the list is empty`, function() {
    lazy.tail.bind(null, lazy.emptyList).should.throw();
  });
});
