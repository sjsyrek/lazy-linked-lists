/**
 * lazy-linked-lists
 * Lazy and infinite linked lists for JavaScript.
 *
 * list.js
 *
 * Unit tests for the List class.
 * @license ISC
 */

/* global describe,context, it, beforeEach */

import {
  LT,
  GT,
  EQ
} from '../source';

import {
  emptyList,
  list,
  reverse
} from '../source';

describe(`List`, function() {
  beforeEach(function() {
    let lst1 = list(1,2,3);
    let lst2 = list(4,5,6);
    let f = x => x * 10;
    let fs1 = list(f);
    let fs2 = list(f,f,f);
    let str = list(`a`,`b`,`c`);
  });
  context(`#[Symbol.iterator]()`, function() {
    it(`should be an iterable`, function() {
      let i = 1;
      for (let value of lst1) {
        value.should.equal(i);
        i += 1;
      }
    });
  });
  context(`#isEq()`, function() {
    it(`should compare two lists for equality`, function() {
      lst1.isEq(lst1).should.be.true;
      lst1.isEq(lst2).should.be.false;
    });
  });
  context(`#compare()`, function() {
    it(`should compare two lists and return an ordering value`, function() {
      emptyList.compare(emptyList).should.equal(EQ);
      emptyList.compare(lst1).should.equal(LT);
      lst1.compare(emptyList).should.equal(GT);
      lst1.compare(lst2).should.equal(LT);
      lst2.compare(lst1).should.equal(GT);
      lst1.compare(lst1).should.equal(EQ);
    });
  });
  context(`#isLessThan()`, function() {
    it(`should return true if the first list is less than the second`, function() {
      lst1.isLessThan(lst2).should.be.true;
    });
    it(`should return false if the first list is not less than the second`, function() {
      lst1.isLessThan(lst1).should.be.false;
      lst2.isLessThan(lst1).should.be.false;
    });
  });
  context(`#isLessThanOrEqual()`, function() {
    it(`should return true if the first list is less than or equal to the second`, function() {
      lst1.isLessThanOrEqual(lst2).should.be.true;
      lst1.isLessThanOrEqual(lst1).should.be.true;
    });
    it(`should return false if the first list is not less than or equal to the second`, function() {
      lst2.isLessThanOrEqual(lst1).should.be.false;
    });
  });
  context(`#isGreaterThan()`, function() {
    it(`should return true if the first list is greater than the second`, function() {
      lst2.isGreaterThan(lst1).should.be.true;
    });
    it(`should return false if the first list is not greater than the second`, function() {
      lst1.isGreaterThan(lst2).should.be.false;
      lst2.isGreaterThan(lst2).should.be.false;
    });
  });
  context(`#isGreaterThanOrEqual()`, function() {
    it(`should return true if the first list is greater than or equal to the second`, function() {
      lst2.isGreaterThanOrEqual(lst1).should.be.true;
      lst2.isGreaterThanOrEqual(lst2).should.be.true;
    });
    it(`should return false if the first list is not greater than or equal to the second`, function() {
      lst1.isGreaterThanOrEqual(lst2).should.be.false;
    });
  });
  context(`#mempty()`, function() {
    it(`should return an empty list (the identity of a list)`, function() {
      lst1.mempty().should.equal(emptyList);
      emptyList.mempty().should.equal(emptyList);
    });
  });
  context(`#mappend()`, function() {
    it(`should append the first list to the second, satisfying the monoid laws`, function() {
      lst1.mappend(emptyList).should.eql(lst1);
      emptyList.mappend(lst1).should.eql(lst1);
      lst1.mappend(lst2).should.eql(list(1,2,3,4,5,6));
    });
  });
  context(`#foldr()`, function() {
    let g = (x, y) => x * y;
    it(`should fold a function over a list and accumulate the value that results`, function() {
      lst1.foldr(g, 1).should.equal(6);
      reverse(lst1).foldr(f, 1).should.equal(6);
    });
  });
  context(`#traverse()`, function() {
    let g = x => list(x * 10);
    it(`should map a function that returns a list over a list and collect the results`, function() {
      lst1.traverse(f).should.eql(list(list(10,20,30)));
      emptyList.traverse(f).should.eql(list(emptyList));
    });
  });
  context(`#fmap()`, function() {
    it(`should map a function over a list and return a new list containing the results`, function() {
      lst1.fmap(f).should.eql(list(10,20,30));
    });
  });
  context(`#pure()`, function() {
    it(`should return a new list containing the argument value`, function() {
      lst1.pure(1).should.eql(list(1));
      lst1.pure(lst1).should.eql(list(lst1));
      emptyList.pure(emptyList).should.eql(list(list()));
    });
  });
  context(`#ap()`, function() {
    it(`should sequentially apply the function(s) contained in a list to another list of values and collect the results in a new list`, function() {
      fs1.ap(lst1).should.eql(list(10,20,30));
      fs1.ap(emptyList).should.equal(emptyList);
      fs2.ap(lst1).should.eql(list(10,20,30,10,20,30,10,20,30));
    });
  });
  context(`#flatMap()`, function() {
    it(`should map a function that returns a list over a list, collect the results, and flatten the list`, function() {
      lst1.flatMap(f).should.eql(list(10,20,30));
      emptyList.flatMap(f).should.equal(emptyList);
    });
  });
  context(`#then()`, function() {
    it(`should sequentially apply the elements of one list to another but ignore the values of the first list`, function() {
      lst1.then(lst2).should.eql(list(4,5,6,4,5,6,4,5,6));
      lst1.then(emptyList).should.equal(emptyList);
      fs1.then(lst1).should.eql(list(1,2,3,1,2,3,1,2,3));
    });
  });
  context(`#toString()`, function() {
    it(`should return '[Object List]' when cast to a string`, function() {
      lst1.toString().should.equal(`[Object List]`);
      emptyList.toString().should.equal(`[Object List]`);
    });
  });
  context(`#valueOf()`, function() {
    it(`should return a list string, e.g. '[1:2:3:[]]', as its value`, function() {
      lst1.valueOf().should.equal(`[1:2:3:[]]`);
      str.valueOf().should.equal(`[abc]`);
      emptyList.valueOf().should.equal(`[]`);
    });
  });
  context(`#typeOf()`, function() {
    it(`should return its type enclosed in brackets as a string`, function() {
      lst1.typeOf().should.equal(`[number]`);
      str.typeOf().should.equal(`[string]`);
      emptyList.typeOf().should.equal(`[]`);
    });
  });
});
