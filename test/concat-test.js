import * as lazy from '../';

describe(`concat()`, function() {
  const lst1 = lazy.list(1,2,3);
  const lst2 = lazy.list(4,5,6);
  const lst3 = lazy.list();
  const xss = lazy.list(lst1, lst2, lst3);
  it(`should concatenate (flatten) the elements in a list of lists`, function() {
    lazy.concat(xss).should.eql(lazy.list(1,2,3,4,5,6));
  });
});
