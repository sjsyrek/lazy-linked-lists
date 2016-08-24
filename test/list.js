/**
 * lazy-linked-lists
 * Lazy and infinite linked lists for JavaScript.
 *
 * list.js
 *
 * Unit tests for the List class.
 * @license ISC
 */

/* global describe, it */

import 'should';
import * as lazy from '../';

describe(`List`, function() {
  describe(`#[Symbol.iterator]()`, function() {
    const lst = lazy.list(1,2,3);
    it(`should be an iterable`, function() {
      let i = 1;
      for (let value of lst) {
        value.should.equal(i);
        i += 1;
      }
    });
  });
  describe(`#isEq()`, function() {
    const lst1 = lazy.list(1,2,3);
    const lst2 = lazy.list(4,5,6);
    it(`should compare two lists for equality`, function() {
      lst1.isEq(lst1).should.be.true;
      lst1.isEq(lst2).should.be.false;
    });
  });
  describe(`#compare()`, function() {
    const LT = lazy.LT, GT = lazy.GT, EQ = lazy.EQ;
    const lst1 = lazy.list(1,2,3);
    const lst2 = lazy.list(4,5,6);
    it(`should compare two lists and return an ordering value`, function() {
      lazy.emptyList.compare(lazy.emptyList).should.equal(EQ);
      lazy.emptyList.compare(lst1).should.equal(LT);
      lst1.compare(lazy.emptyList).should.equal(GT);
      lst1.compare(lst2).should.equal(LT);
      lst2.compare(lst1).should.equal(GT);
      lst1.compare(lst1).should.equal(EQ);
    });
  });
  describe(`#isLessThan()`, function() {
    const lst1 = lazy.list(1,2,3);
    const lst2 = lazy.list(4,5,6);
    it(`should return true if the first list is less than the second`, function() {
      lst1.isLessThan(lst2).should.be.true;
    });
    it(`should return false if the first list is not less than the second`, function() {
      lst1.isLessThan(lst1).should.be.false;
      lst2.isLessThan(lst1).should.be.false;
    });
  });
  describe(`#isLessThanOrEqual()`, function() {
    const lst1 = lazy.list(1,2,3);
    const lst2 = lazy.list(4,5,6);
    it(`should return true if the first list is less than or equal to the second`, function() {
      lst1.isLessThanOrEqual(lst2).should.be.true;
      lst1.isLessThanOrEqual(lst1).should.be.true;
    });
    it(`should return false if the first list is not less than or equal to the second`, function() {
      lst2.isLessThanOrEqual(lst1).should.be.false;
    });
  });
  describe(`#isGreaterThan()`, function() {
    const lst1 = lazy.list(1,2,3);
    const lst2 = lazy.list(4,5,6);
    it(`should return true if the first list is greater than the second`, function() {
      lst2.isGreaterThan(lst1).should.be.true;
    });
    it(`should return false if the first list is not greater than the second`, function() {
      lst1.isGreaterThan(lst2).should.be.false;
      lst2.isGreaterThan(lst2).should.be.false;
    });
  });
  describe(`#isGreaterThanOrEqual()`, function() {
    const lst1 = lazy.list(1,2,3);
    const lst2 = lazy.list(4,5,6);
    it(`should return true if the first list is greater than or equal to the second`, function() {
      lst2.isGreaterThanOrEqual(lst1).should.be.true;
      lst2.isGreaterThanOrEqual(lst2).should.be.true;
    });
    it(`should return false if the first list is not greater than or equal to the second`, function() {
      lst1.isGreaterThanOrEqual(lst2).should.be.false;
    });
  });
  describe(`#mempty()`, function() {
    const lst1 = lazy.list(1,2,3);
    it(`should return an empty list (the identity of a list)`, function() {
      lst1.mempty().should.equal(lazy.emptyList);
      lazy.emptyList.mempty().should.equal(lazy.emptyList);
    });
  });
  describe(`#mappend()`, function() {
    const lst1 = lazy.list(1,2,3);
    const lst2 = lazy.list(4,5,6);
    it(`should append the first list to the second, satisfying the monoid laws`, function() {
      lst1.mappend(lazy.emptyList).should.eql(lst1);
      lazy.emptyList.mappend(lst1).should.eql(lst1);
      lst1.mappend(lst2).should.eql(lazy.list(1,2,3,4,5,6));
    });
  });
  describe(`#foldr()`, function() {
    const lst = lazy.list(1,2,3);
    const f = (x, y) => x * y;
    it(`should fold a function over a list and accumulate the value that results`, function() {
      lst.foldr(f, 1).should.equal(6);
      lazy.reverse(lst).foldr(f, 1).should.equal(6);
    });
  });
  describe(`#traverse()`, function() {
    const lst = lazy.list(1,2,3);
    const f = x => lazy.list(x * 10);
    it(`should map a function that returns a list over a list and collect the results`, function() {
      lst.traverse(f).should.eql(lazy.list(lazy.list(10,20,30)));
      lazy.emptyList.traverse(f).should.eql(lazy.list(lazy.emptyList));
    });
  });
  describe(`#fmap()`, function() {
    const lst = lazy.list(1,2,3);
    const f = x => x * 10;
    it(`should map a function over a list and return a new list containing the results`, function() {
      lst.fmap(f).should.eql(lazy.list(10,20,30));
    });
  });
  describe(`#pure()`, function() {
    const lst = lazy.list(1,2,3);
    it(`should return a new list containing the argument value`, function() {
      lst.pure(1).should.eql(lazy.list(1));
      lst.pure(lst).should.eql(lazy.list(lst));
      lazy.emptyList.pure(lazy.emptyList).should.eql(lazy.list(lazy.list()));
    });
  });
  describe(`#ap()`, function() {
    const lst = lazy.list(1,2,3);
    const f = x => x * 10;
    const fs1 = lazy.list(f);
    const fs2 = lazy.list(f,f,f);
    it(`should sequentially apply the function(s) contained in a list to another list of values and collect the results in a new list`, function() {
      fs1.ap(lst).should.eql(lazy.list(10,20,30));
      fs1.ap(lazy.emptyList).should.equal(lazy.emptyList);
      fs2.ap(lst).should.eql(lazy.list(10,20,30,10,20,30,10,20,30));
    });
  });
  describe(`#flatMap()`, function() {
    const lst = lazy.list(1,2,3);
    const f = x => lazy.list(x * 10);
    it(`should map a function that returns a list over a list, collect the results, and flatten the list`, function() {
      lst.flatMap(f).should.eql(lazy.list(10,20,30));
      lazy.emptyList.flatMap(f).should.equal(lazy.emptyList);
    });
  });
  describe(`#then()`, function() {
    const lst1 = lazy.list(1,2,3);
    const lst2 = lazy.list(4,5,6);
    const f = x => x * 10;
    const fs = lazy.list(f);
    it(`should sequentially apply the elements of one list to another but ignore the values of the first list`, function() {
      lst1.then(lst2).should.eql(lazy.list(4,5,6,4,5,6,4,5,6));
      lst1.then(lazy.emptyList).should.equal(lazy.emptyList);
      fs.then(lst1).should.eql(lazy.list(1,2,3,1,2,3,1,2,3));
    });
  });
  describe(`#toString()`, function() {
    const lst = lazy.list(1,2,3);
    it(`should return '[Object List]' when cast to a string`, function() {
      lst.toString().should.equal(`[Object List]`);
      lazy.emptyList.toString().should.equal(`[Object List]`);
    });
  });
  describe(`#valueOf()`, function() {
    const lst = lazy.list(1,2,3);
    const str = lazy.list(`a`,`b`,`c`);
    it(`should return a list string, e.g. '[1:2:3:[]]', as its value`, function() {
      lst.valueOf().should.equal(`[1:2:3:[]]`);
      str.valueOf().should.equal(`[abc]`);
      lazy.emptyList.valueOf().should.equal(`[]`);
    });
  });
  describe(`#typeOf()`, function() {
    const lst = lazy.list(1,2,3);
    const str = lazy.list(`a`,`b`,`c`);
    it(`should return its type enclosed in brackets as a string`, function() {
      lst.typeOf().should.equal(`[number]`);
      str.typeOf().should.equal(`[string]`);
      lazy.emptyList.typeOf().should.equal(`[]`);
    });
  });
});
