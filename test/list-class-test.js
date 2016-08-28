import * as lazy from '../source'

const LT = lazy.LT
const GT = lazy.GT
const EQ = lazy.EQ

describe(`List`, function () {
  describe(`#[Symbol.iterator]()`, function () {
    const lst = lazy.list(1, 2, 3)
    it(`should be an iterable`, function () {
      let i = 1
      for (let value of lst) {
        value.should.equal(i)
        i += 1
      }
    })
  })
  describe(`#isEq()`, function () {
    const lst1 = lazy.list(1, 2, 3)
    const lst2 = lazy.list(4, 5, 6)
    it(`should compare two lists for equality`, function () {
      lst1.isEq(lst1).should.be.true
      lst1.isEq(lst2).should.be.false
    })
  })
  describe(`#compare()`, function () {
    const lst1 = lazy.list(1, 2, 3)
    const lst2 = lazy.list(4, 5, 6)
    it(`should compare two lists and return an ordering value`, function () {
      lazy.emptyList.compare(lazy.emptyList).should.equal(EQ)
      lazy.emptyList.compare(lst1).should.equal(LT)
      lst1.compare(lazy.emptyList).should.equal(GT)
      lst1.compare(lst2).should.equal(LT)
      lst2.compare(lst1).should.equal(GT)
      lst1.compare(lst1).should.equal(EQ)
    })
  })
  describe(`#isLessThan()`, function () {
    const lst1 = lazy.list(1, 2, 3)
    const lst2 = lazy.list(4, 5, 6)
    it(`should return true if the first list is less than the second`, function () {
      lst1.isLessThan(lst2).should.be.true
    })
    it(`should return false if the first list is not less than the second`, function () {
      lst1.isLessThan(lst1).should.be.false
      lst2.isLessThan(lst1).should.be.false
    })
  })
  describe(`#isLessThanOrEqual()`, function () {
    const lst1 = lazy.list(1, 2, 3)
    const lst2 = lazy.list(4, 5, 6)
    it(`should return true if the first list is less than or equal to the second`, function () {
      lst1.isLessThanOrEqual(lst2).should.be.true
      lst1.isLessThanOrEqual(lst1).should.be.true
    })
    it(`should return false if the first list is not less than or equal to the second`, function () {
      lst2.isLessThanOrEqual(lst1).should.be.false
    })
  })
  describe(`#isGreaterThan()`, function () {
    const lst1 = lazy.list(1, 2, 3)
    const lst2 = lazy.list(4, 5, 6)
    it(`should return true if the first list is greater than the second`, function () {
      lst2.isGreaterThan(lst1).should.be.true
    })
    it(`should return false if the first list is not greater than the second`, function () {
      lst1.isGreaterThan(lst2).should.be.false
      lst2.isGreaterThan(lst2).should.be.false
    })
  })
  describe(`#isGreaterThanOrEqual()`, function () {
    const lst1 = lazy.list(1, 2, 3)
    const lst2 = lazy.list(4, 5, 6)
    it(`should return true if the first list is greater than or equal to the second`, function () {
      lst2.isGreaterThanOrEqual(lst1).should.be.true
      lst2.isGreaterThanOrEqual(lst2).should.be.true
    })
    it(`should return false if the first list is not greater than or equal to the second`, function () {
      lst1.isGreaterThanOrEqual(lst2).should.be.false
    })
  })
  describe(`#mempty()`, function () {
    const lst1 = lazy.list(1, 2, 3)
    it(`should return an empty list (the identity of a list)`, function () {
      lst1.mempty().should.equal(lazy.emptyList)
      lazy.emptyList.mempty().should.equal(lazy.emptyList)
    })
  })
  describe(`#mappend()`, function () {
    const lst1 = lazy.list(1, 2, 3)
    const lst2 = lazy.list(4, 5, 6)
    it(`should append the first list to the second, satisfying the monoid laws`, function () {
      lst1.mappend(lazy.emptyList).isEq(lst1).should.be.true
      lazy.emptyList.mappend(lst1).isEq(lst1).should.be.true
      lst1.mappend(lst2).isEq(lazy.list(1, 2, 3, 4, 5, 6)).should.be.true
    })
  })
  describe(`#foldr()`, function () {
    const lst = lazy.list(1, 2, 3)
    const f = (x, y) => x * y
    it(`should fold a function over a list and accumulate the value that results`, function () {
      lst.foldr(f, 1).should.equal(6)
      lazy.reverse(lst).foldr(f, 1).should.equal(6)
    })
  })
  describe(`#traverse()`, function () {
    const lst = lazy.list(1, 2, 3)
    const f = x => lazy.list(x * 10)
    it(`should map a function that returns a list over a list and collect the results`, function () {
      lst.traverse(f).isEq(lazy.list(10, 20, 30)).should.be.true
      lazy.emptyList.traverse(f).isEq(lazy.list(lazy.emptyList)).should.be.true
    })
  })
  describe(`#fmap()`, function () {
    const lst = lazy.list(1, 2, 3)
    const f = x => x * 10
    it(`should map a function over a list and return a new list containing the results`, function () {
      lst.fmap(f).isEq(lazy.list(10, 20, 30)).should.be.true
    })
  })
  describe(`#pure()`, function () {
    const lst = lazy.list(1, 2, 3)
    it(`should return a new list containing the argument value`, function () {
      lst.pure(1).isEq(lazy.list(1)).should.be.true
      lst.pure(lst).isEq(lazy.list(lst)).should.be.true
      lazy.emptyList.pure(lazy.emptyList).isEq(lazy.list(lazy.list())).should.be.true
    })
  })
  describe(`#ap()`, function () {
    const lst = lazy.list(1, 2, 3)
    const f = x => x * 10
    const fs1 = lazy.list(f)
    const fs2 = lazy.list(f, f, f)
    it(`should sequentially apply the function(s) contained in a list to another list of values and collect the results in a new list`, function () {
      fs1.ap(lst).isEq(lazy.list(10, 20, 30)).should.be.true
      fs1.ap(lazy.emptyList).isEq(lazy.emptyList).should.be.true
      fs2.ap(lst).isEq(lazy.list(10, 20, 30, 10, 20, 30, 10, 20, 30)).should.be.true
    })
  })
  describe(`#flatMap()`, function () {
    const lst = lazy.list(1, 2, 3)
    const f = x => lazy.list(x * 10)
    it(`should map a function that returns a list over a list, collect the results, and flatten the list`, function () {
      lst.flatMap(f).isEq(lazy.list(10, 20, 30)).should.be.true
    })
  })
  describe(`#then()`, function () {
    const lst1 = lazy.list(1, 2, 3)
    const lst2 = lazy.list(4, 5, 6)
    const f = x => x * 10
    const fs = lazy.list(f)
    it(`should sequentially apply the elements of one list to another but ignore the values of the first list`, function () {
      lst1.then(lst2).isEq(lazy.list(4, 5, 6, 4, 5, 6, 4, 5, 6)).should.be.true
      lst1.then(lazy.emptyList).should.equal(lazy.emptyList)
      fs.then(lst1).isEq(lazy.list(1, 2, 3, 1, 2, 3, 1, 2, 3)).should.be.true
    })
  })
  describe(`#toString()`, function () {
    const lst = lazy.list(1, 2, 3)
    it(`should return '[Object List]' when cast to a string`, function () {
      lst.toString().should.equal(`[Object List]`)
      lazy.emptyList.toString().should.equal(`[Object List]`)
    })
  })
  describe(`#valueOf()`, function () {
    const lst = lazy.list(1, 2, 3)
    const str = lazy.list(`a`, `b`, `c`)
    it(`should return a list string, e.g. '[1:2:3:[]]', as its value`, function () {
      lst.valueOf().should.equal(`[1:2:3:[]]`)
      str.valueOf().should.equal(`[abc]`)
      lazy.emptyList.valueOf().should.equal(`[]`)
    })
  })
  describe(`#typeOf()`, function () {
    const lst = lazy.list(1, 2, 3)
    const str = lazy.list(`a`, `b`, `c`)
    it(`should return its type enclosed in brackets as a string`, function () {
      lst.typeOf().should.equal(`[number]`)
      str.typeOf().should.equal(`[string]`)
      lazy.emptyList.typeOf().should.equal(`[]`)
    })
  })
})
