/**
 * lazy-linked-lists
 * Lazy and infinite linked lists for JavaScript.
 *
 * test.js
 *
 * Unit tests.
 * @license ISC
 */

/* global describe, it */

import 'should';

import {
  LT,
  GT,
  EQ
} from '../source';

import {
  emptyList,
  list,
  listRange,
  listRangeBy,
  listAppend,
  cons,
  head,
  last,
  tail,
  init,
  length,
  isList,
  isEmpty,
  fromArrayToList,
  fromListToArray,
  fromListToString,
  fromStringToList,
  concat,
  index,
  filter,
  map,
  reverse,
  sort,
  sortBy,
  take,
  drop,
  takeWhile,
  dropWhile,
  listInf,
  listInfBy,
  iterate,
  repeat,
  replicate,
  cycle
} from '../source';

describe(`List data type`, function() {
  const lst1 = list(1,2,3);
  const lst2 = list(4,5,6);
  const lst3 = list();
  const lst4 = listRange(0, 10);
  const lst5 = listRangeBy(0, 50, x => x + 5);
  const lst6 = list(1,1,4,4,9,9,6,6,3,3,8,8,7,7,5,5,2,2,10,10);
  const lst7 = list(1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10);
  const lst8 = list(20,19,18,17,16,15,14,13,12,11,10,1,2,3,4,5,6,7,8,9);
  const sorted = list(1,2,3,4,5,6,7,8,9,10);
  const unsorted = list(10,9,8,7,6,5,4,3,2,1);
  const f = x => x * 10;
  const g = x => list(x * 10);
  const fs1 = list(f);
  const fs2 = list(f,f,f);
  const inf1 = listInf(1);
  const inf2 = listInfBy(1, x => x * 2);
  const inf3 = iterate(x => x * 2, 1);
  const inf4 = repeat(3);
  const str = list(`a`,`b`,`c`);
  const arr = [1,2,3];
  it(`should be an iterable`, function() {
    let i = 1;
    for (let value of lst1) {
      value.should.equal(i);
      i += 1;
    }
  });
  it(`should be equatable`, function() {
    lst1.isEq(lst1).should.be.true;
  });
  it(`should be comparable`, function() {
    emptyList.compare(emptyList).should.equal(EQ);
    emptyList.compare(lst1).should.equal(LT);
    lst1.compare(emptyList).should.equal(GT);
    lst1.compare(lst2).should.equal(LT);
    lst2.compare(lst1).should.equal(GT);
    lst1.compare(lst1).should.equal(EQ);
    lst1.isLessThan(lst2).should.be.true;
    lst2.isLessThan(lst1).should.be.false;
    lst1.isLessThanOrEqual(lst2).should.be.true;
    lst2.isLessThanOrEqual(lst1).should.be.false;
    lst1.isLessThanOrEqual(lst1).should.be.true;
    lst1.isGreaterThan(lst2).should.be.false;
    lst2.isGreaterThan(lst1).should.be.true;
    lst1.isGreaterThanOrEqual(lst2).should.be.false;
    lst2.isGreaterThanOrEqual(lst1).should.be.true;
    lst1.isGreaterThanOrEqual(lst1).should.be.false;
  });
  it(`should be a monoid`, function() {
    lst1.mempty().should.equal(emptyList);
    lst1.mappend(emptyList).should.eql(lst1);
    emptyList.mappend(lst1).should.eql(lst1);
    lst1.mappend(lst2).should.eql(list(1,2,3,4,5,6));
  });
  it(`should be foldable`, function() {
    lst1.foldr((x, y) => x * y, 1).should.equal(6);
    reverse(lst1).foldr((x, y) => x * y, 1).should.equal(6);
  });
  it(`should be traversable`, function() {
    lst1.traverse(g).should.eql(list(list(10,20,30)));
    emptyList.traverse(g).should.eql(list(emptyList));
  });
  it(`should be a functor`, function() {
    lst1.fmap(x => x * 10).should.eql(list(10,20,30));
  });
  it(`should be an applicative functor`, function() {
    lst1.pure(1).should.eql(list(1));
    lst1.pure(lst1).should.eql(list(lst1));
    fs1.ap(lst1).should.eql(list(10,20,30));
    fs2.ap(lst1).should.eql(list(10,20,30,10,20,30,10,20,30));
  });
  it(`should be a monad`, function() {
    lst1.flatMap(x => list(x * 10)).should.eql(list(10,20,30));
    lst1.then(lst2).should.eql(list(4,5,6,4,5,6,4,5,6));
  });
  it(`should return [Object List] when cast to a string`, function() {
    lst1.toString().should.equal(`[Object List]`);
  });
  it(`should return a list string, e.g. "[1:2:3:[]]", as its value`, function() {
    lst1.valueOf().should.equal(`[1:2:3:[]]`);
    str.valueOf().should.equal(`[abc]`);
  });
  it(`should return its type enclosed in brackets as a string`, function() {
    lst1.typeOf().should.equal(`[number]`);
    str.typeOf().should.equal(`[string]`);
    emptyList.typeOf().should.equal(`[]`);
  });
  describe(`emptyList`, function() {
    it(`should be an empty list`, function() {
      lst3.should.equal(emptyList);
      emptyList.should.equal(lst3);
    });
    it(`should return an empty list string, e.g. "[]", as its value if it's an empty list`, function() {
      emptyList.valueOf().should.equal(`[]`);
    });
  });
  describe(`list()`, function() {
    it(`should create a new list from a series of zero or more values`, function() {
      list(1,2,3).should.eql(lst1);
    });
  });
  describe(`listRange()`, function() {
    it(`should build a list from a range of values`, function() {
      lst4.should.eql(list(0,1,2,3,4,5,6,7,8,9,10));
    });
  });
  describe(`listRangeBy()`, function() {
    it(`should build a list from a range of values and using a custom step function`, function() {
      lst5.should.eql(list(0,5,10,15,20,25,30,35,40,45,50));
      listRangeBy(10, 0, x => x - 1).should.eql(list(10,9,8,7,6,5,4,3,2,1));
    });
    it(`should return a singleton list if the start and end values are the same`, function() {
      listRangeBy(1, 1).should.eql(list(1));
    });
  });
  describe(`listAppend()`, function() {
    it(`should append one list to another`, function() {
      listAppend(lst1, lst2).should.eql(list(1,2,3,4,5,6));
    });
  });
  describe(`cons()`, function() {
    it(`should create a new list from a head and tail`, function() {
      cons(3, lst2).should.eql(list(3,4,5,6));
    });
  });
  describe(`head()`, function() {
    it(`should extract the first element of a list`, function() {
      head(lst1).should.equal(1);
    });
    it(`should throw an error if the list is empty`, function() {
      head.bind(null, emptyList).should.throw();
    });
  });
  describe(`last()`, function() {
    it(`should extract the last element of a list`, function() {
      last(lst1).should.equal(3);
    });
    it(`should throw an error if the list is empty`, function() {
      last.bind(null, emptyList).should.throw();
    });
  });
  describe(`tail()`, function() {
    it(`should extract the elements after the head of a list`, function() {
      tail(lst1).should.eql(list(2,3));
    });
    it(`should throw an error if the list is empty`, function() {
      tail.bind(null, emptyList).should.throw();
    });
  });
  describe(`init()`, function() {
    it(`should return all the elements of a list except the last one`, function() {
      init(lst1).should.eql(list(1,2));
    });
    it(`should throw an error if the list is empty`, function() {
      init.bind(null, emptyList).should.throw();
    });
  });
  describe(`length()`, function() {
    it(`should return the length of a list`, function() {
      length(lst1).should.equal(3);
      length(lst4).should.equal(10);
    });
  });
  describe(`isList()`, function() {
    it(`should return true if the argument is a list`, function() {
      isList(lst1).should.be.true;
      isList(emptyList).should.be.true;
    });
    it(`should return false if the argument is not a list`, function() {
      isList(0).should.be.false;
    });
  });
  describe(`isEmpty()`, function() {
    it(`should return true if the argument is an empty list`, function() {
      isEmpty(emptyList).should.be.true;
    });
    it(`should return false if the argument list is not empty`, function() {
      isEmpty(lst1).should.be.false;
    });
  });
  describe(`fromArrayToList()`, function() {
    it(`should convert an array into a list`, function() {
      fromArrayToList(arr).should.eql(lst1);
    });
  });
  describe(`fromListToArray()`, function() {
    it(`should convert a list into an array`, function() {
      fromListToArray(lst1).should.eql(arr);
    });
  });
  describe(`fromListToString()`, function() {
    it(`should convert a list into a string`, function() {
      fromListToString(str).should.equal(`abc`);
    });
  });
  describe(`fromStringToList()`, function() {
    it(`should convert a string into a list`, function() {
      fromStringToList(`abc`).should.eql(str);
    });
  });
  describe(`concat()`, function() {
    const xss = list(lst1, lst2, lst3);
    it(`should concatenate the elements in a container of lists`, function() {
      concat(xss).should.eql(list(1,2,3,4,5,6));
    });
  });
  describe(`index()`, function() {
    it(`should return the value from a list at the specified index, starting at 0`, function() {
      index(lst1, 2).should.equal(3);
    });
    it(`should throw an error if the index value specified is less than 0`, function() {
      index.bind(null, lst1, -1).should.throw();
    });
    it(`should throw an error if the index value specified is greater than or equal to the length of the list`, function() {
      index.bind(null, lst1, 3).should.throw();
    });
  });
  describe(`filter()`, function() {
    it(`should return the list of elements in a list for which a function f returns true`, function() {
      filter(x => x % 10 === 0, lst5).should.eql(list(0,10,20,30,40,50));
    });
  });
  describe(`map()`, function() {
    it(`should map a function over a list and return the results in a new list`, function() {
      map(x => x * 3, lst1).should.eql(list(3,6,9));
    });
  });
  describe(`reverse()`, function() {
    it(`should `, function() {
      reverse(lst1).should.eql(list(3,2,1));
    });
  });
  describe(`sort()`, function() {
    it(`should sort a list using a merge sort algorithm`, function() {
      sort(sorted).should.eql(sorted);
      sort(unsorted).should.eql(sorted);
      sort(list(1)).should.eql(list(1));
      sort(list()).should.equal(emptyList);
      sort(lst6).should.eql(lst7);
      sort(lst8).should.eql(list(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,30));
    });
  });
  describe(`sortBy()`, function() {
    it(`should sort a list using a merge sort algorithm and a custom comparison function`, function() {
      sortBy((a, b) => a === b ? EQ : (a < b ? GT : LT), unsorted).should.eql(unsorted);
      sortBy((a, b) => a === b ? EQ : (a < b ? LT : GT), lst4).should.eql(sorted);
    });
  });
  describe(`take()`, function() {
    it(`should return the prefix of a list of a given length`, function() {
      take(2, lst1).should.eql(list(1,2));
    });
    it(`should return the empty list if the second argument is the empty list`, function() {
      take(2, list()).should.equal(emptyList);
    });
  });
  describe(`drop()`, function() {
    it(`should return the suffix of a list after discarding a specified number of values`, function() {
      drop(2, lst1).should.eql(list(3));
    });
    it(`should return the empty list if the second argument is the empty list`, function() {
      drop(2, list()).should.equal(emptyList);
    });
  });
  describe(`takeWhile()`, function() {
    it(`should return the longest prefix of a list of values that satisfy a predicate function`, function() {
      takeWhile(x => x < 3, sorted).should.eql(list(0,1,2));
    });
    it(`should return an empty list if the second argument is an empty list`, function() {
      takeWhile(x => x < 3, emptyList).should.equal(emptyList);
    });
  });
  describe(`dropWhile()`, function() {
    it(`should drop values from a list while a given predicate function returns true`, function() {
      dropWhile(x => x < 3, sorted).should.eql(list(3,4,5,6,7,8,9,10));
    });
    it(`should return an empty list if the second argument is an empty list`, function() {
      dropWhile(x => x < 3, emptyList).should.equal(emptyList);
    });
  });
  describe(`listInf()`, function() {
    it(`should generate an infinite list`, function() {
      take(3, inf1).should.eql(list(1,2,3));
      index(inf1, 1000).should.equal(1001);
    });
  });
  describe(`listInfBy()`, function() {
    it(`should generate an infinite list using a given step function`, function() {
      take(3, inf2).should.eql(list(1,2,4));
      index(inf2, 10).should.equal(1024);
    });
  });
  describe(`iterate()`, function() {
    it(`should return an infinite list of repeated applications of a function to a value`, function() {
      take(10, inf3).should.eql(list(1,2,4,8,16,32,64,128,256,512));
      index(inf3, 10).should.equal(1024);
    });
  });
  describe(`repeat()`, function() {
    it(`should build an infinite list of identical values`, function() {
      take(10, inf4).should.eql(list(3,3,3,3,3,3,3,3,3,3));
      index(inf4, 100).should.equal(3);
    });
  });
  describe(`replicate()`, function() {
    it(`should return a list of a specified length in which every value is the same`, function() {
      replicate(10, 3).should.eql(list(3,3,3,3,3,3,3,3,3,3));
    });
  });
  describe(`cycle()`, function() {
    it(`should return the infinite repetition of a list`, function() {
      const c = cycle(lst1);
      take(9, c).should.eql(list(1,2,3,1,2,3,1,2,3));
      index(c, 100).should.equal(2);
    });
    it(`should throw an error if the list is empty`, function() {
      cycle.bind(null, emptyList).should.throw();
    });
  });
});
