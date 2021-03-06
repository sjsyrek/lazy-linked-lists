/**
 * lazy-linked-lists
 * Lazy and infinite linked lists for JavaScript.
 *
 * source/lib.js
 *
 * Core functions for lazy-linked-lists.
 * @license ISC
 */

import {List} from './list'

import {
  LT,
  GT,
  EQ
} from './ord'

import {
  EmptyListError,
  OutOfRangeError
} from './error'

export const emptyList = new List()

/**
 * Create a new `List` from a series of zero or more values.
 * @param {...*} as - Values to put into a new `List`
 * @returns {List} The new `List`
 * @kind function
 * @example
 * list(1,2,3); // => [1:2:3:[]]
 */
export const list = (...as) => as.length === 0 ? emptyList : new List(as.shift(), list(...as))

/**
 * Build a `List` from a range of values using lazy evaluation (i.e. each successive value is only
 * computed on demand, making infinite lists feasible). To supply your own function for determining
 * the increment, use `listRangeBy`.
 * @param {*} start - The starting value
 * @param {*} end - The end value
 * @returns {List} A `List` that will be evaluated lazily
 * @kind function
 */
export const listRange = (start, end) => {
  if (start === end) { return list(start) }
  if (start > end) { return listRangeBy(start, end, x => x - 1) }
  return listRangeBy(start, end, x => x + 1)
}

/**
 * Build a `List` from a range of values using lazy evaluation and incrementing it using a given
 * step function.
 * @param {*} start - The starting value
 * @param {*} end - The end value
 * @param {Function} step - The increment function
 * @returns {List} A `List` that will be evaluated lazily
 * @kind function
 */
export const listRangeBy = (start, end, step) => {
  if (start === end) { return list(start) }
  let x = start
  const xs = list(x)
  const listGenerator = function* () {
    x = step(x)
    while (start < end ? x < end : x > end) {
      yield list(x)
      x = step(x)
    }
  }
  const gen = listGenerator()
  const handler = {
    get: function (target, prop) {
      if (prop === `tail` && isEmpty(tail(target))) {
        const next = gen.next()
        if (next.done === false) { target[prop] = () => new Proxy(next.value, handler) }
      }
      return target[prop]
    }
  }
  const proxy = new Proxy(xs, handler)
  return proxy
}

/**
 * Append one `List` to another.
 * @param {List} xs - A `List`
 * @param {List} ys - A `List`
 * @returns {List} A new `List`, the result of appending `xs` to `ys`
 * @kind function
 * @example
 * const lst1 = list(1,2,3);
 * const lst2 = list(4,5,6);
 * listAppend(lst1, lst2);   // => [1:2:3:4:5:6:[]]
 */
export const listAppend = (xs, ys) => {
  if (isEmpty(xs)) { return ys }
  if (isEmpty(ys)) { return xs }
  return cons(head(xs), listAppend(tail(xs), ys))
}

/**
 * Create a new `List` from a head and tail.
 * @param {*} x - Any value, the head of the new list
 * @param {List} xs - A `List`, the tail of the new list
 * @returns {List} The new `List`, constructed from `x` and `xs`
 * @kind function
 * @example
 * const lst = list(4,5,6);
 * cons(3)(lst);            // => [3:4:5:6:[]]
 */
export const cons = (x, xs) => new List(x, xs)

/**
 * Extract the first element of a `List`.
 * @param {List} xs - A `List`
 * @returns {*} The head of the `List`
 * @kind function
 * @example
 * const lst = list(1,2,3);
 * head(lst);               // => 1
 */
export const head = xs => {
  if (isEmpty(xs)) { throw new EmptyListError(head) }
  return xs.head()
}

/**
 * Extract the last element of a `List`.
 * @param {List} xs - A `List`
 * @returns {*} The last element of the `List`
 * @kind function
 * @example
 * const lst = list(1,2,3);
 * last(lst);               // => 3
 */
export const last = xs => {
  if (isEmpty(xs)) { throw new EmptyListError(last) }
  return isEmpty(tail(xs)) ? head(xs) : last(tail(xs))
}

/**
 * Extract the elements after the head of a `List`.
 * @param {List} xs - A `List`
 * @returns {List} The tail of the `List`
 * @kind function
 * @example
 * const lst = list(1,2,3);
 * tail(lst);               // => [2:3:[]]
 */
export const tail = xs => {
  if (isEmpty(xs)) { throw new EmptyListError(tail) }
  return xs.tail()
}

/**
 * Return all the elements of a `List` except the last one.
 * @param {List} xs - A `List`
 * @returns {List} A new `List`, without the original list's last element
 * @kind function
 * @example
 * const lst = list(1,2,3);
 * init(lst);               // => [1:2:[]]
 */
export const init = xs => {
  if (isEmpty(xs)) { throw new EmptyListError(init) }
  return isEmpty(tail(xs)) ? emptyList : cons(head(xs), init(tail(xs)))
}

/**
 * Return the length of a `List`.
 * @param {List} xs - A `List`
 * @returns {number} The length of the `List`
 * @kind function
 * @example
 * const lst = list(1,2,3);
 * length(lst);             // => 3
 */
export const length = xs => {
  const lenAcc = (xs, n) => isEmpty(xs) ? n : lenAcc(tail(xs), n + 1)
  return lenAcc(xs, 0)
}

/**
 * Determine whether a given object is a `List`.
 * @param {*} a - Any object
 * @returns {boolean} `true` if the object is a `List` and `false` otherwise
 * @kind function
 */
export const isList = a => a instanceof List

/**
 * Check whether a `List` is empty. Returns `true` if the `List` is empty or false if it is
 * non-empty.
 * @param {*} xs - A `List`
 * @returns {boolean} `true` if the `List` is empty, `false` if it is non-empty
 * @kind function
 * @example
 * isEmpty([]);              // => true
 * isEmpty([[]]);            // => false
 * isEmpty(emptyList);       // => true
 * isEmpty(list(emptyList)); // => false
 */
export const isEmpty = xs => xs === emptyList

/**
 * Convert an array into a `List`.
 * @param {Array.<*>} arr - An array to convert into a `List`
 * @returns {List} A new `List`, the converted array
 * @kind function
 * @example
 * const arr = [1,2,3];
 * fromArrayToList(arr); // => [1:2:3:[]]
 */
export const fromArrayToList = arr => list(...arr)

/**
 * Convert a `List` into an array.
 * @param {List} xs - A `List` to convert into an array
 * @returns {Array} A new array, the converted `List`
 * @kind function
 * @example
 * const lst = list(1,2,3);
 * fromListToArray(lst);    // => [1,2,3]
 */
export const fromListToArray = xs => isEmpty(xs) ? [] : [head(xs)].concat(fromListToArray(tail(xs)))
/**
 * Convert a `List` into a string.
 * @param {List} xs - A `List` to convert into a string
 * @returns {string} A new string, the converted `List`
 * @kind function
 * @example
 * const str = list('a','b','c');
 * fromListToString(str);         // => "abc"
 */
export const fromListToString = xs => fromListToArray(xs).join(``)

/**
 * Convert a string into a `List`.
 * @param {string} str - A string to convert into a `List`
 * @returns {List} A new `List`, the converted string
 * @kind function
 * @example
 * const str = `abc`;
 * fromStringToList(str); // => [abc]
 */
export const fromStringToList = str => fromArrayToList(str.split(``))

/**
 * Concatenate the elements in a `List` of lists.
 * @param {List} xss - A `List` of lists
 * @returns {List} The concatenated `List`
 * @kind function
 * @example
 * const lst1 = list(1,2,3);
 * const lst2 = list(4,5,6);
 * const lst3 = list(7,8,9);
 * const xss = list(lst1, lst2, lst3); // [[1:2:3:[]]:[4:5:6:[]]:[7:8:9:[]]:[]]
 * concat(xss);                        // => [1:2:3:4:5:6:7:8:9:[]]
 */
export const concat = xss => {
  if (isEmpty(xss)) { return emptyList }
  const x = head(xss)
  const xs = tail(xss)
  return listAppend(x, concat(xs))
}

/**
 * Return the value from a `List` at the specified index, starting at 0.
 * @param {List} as - The `List` to index into
 * @param {number} n - The index to return
 * @returns {*} The value at the specified index
 * @kind function
 * @example
 * const lst = list(1,2,3,4,5);
 * index(lst, 3));              // => 4
 */
export const index = (as, n) => {
  if (n < 0 || isEmpty(as)) { throw new OutOfRangeError(head) }
  const x = head(as)
  const xs = tail(as)
  if (n === 0) { return x }
  return index(xs, n - 1)
}

/**
 * Return the `List` of elements in a `List` for which a function `f` returns `true`.
 * @param {Function} f - The filter function. Must return a `boolean`
 * @param {List} as - The `List` to filter
 * @returns {List} The filtered `List`
 * @kind function
 * @example
 * const lst = listRange(1,50);
 * const f = x => and(odd(x), greaterThan(x, 10));
 * filter(f, lst); // => [11:13:15:17:19:21:23:25:27:29:31:33:35:37:39:41:43:45:47:49:[]]
 */
export const filter = (f, as) => {
  if (isEmpty(as)) { return emptyList }
  const x = head(as)
  const xs = tail(as)
  if (f(x) === true) { return cons(x, filter(f, xs)) }
  return filter(f, xs)
}

/**
 * Map a function over a `List` and put the results into a new `List`.
 * @param {Function} f - The function to map
 * @param {List} as - The `List` to map over
 * @returns {List} A `List` of results
 * @kind function
 * @example
 * const lst = list(1,2,3,4,5);
 * const f = x => x * 3;
 * map(f, lst));                 // => [3:6:9:12:15:[]]
 */
export const map = (f, as) => {
  if (isEmpty(as)) { return emptyList }
  const x = f(head(as))
  const xs = tail(as)
  return cons(x, map(f, xs))
}

/**
 * Reverse the elements of a `List` and return them in a new list.
 * @param {List} xs - A `List`
 * @returns {List} The reversed `List`
 * @kind function
 * @example
 * const lst = list(1,2,3,4,5);
 * reverse(lst);                // => [5:4:3:2:1:[]]
 */
export const reverse = xs => {
  const r = (xs, a) => isEmpty(xs) ? a : r(tail(xs), cons(head(xs), a))
  return r(xs, emptyList)
}

/**
 * Sort a list using regular value comparison. Use `sortBy` to supply your own comparison
 * function. Uses a merge sort algorithm.
 * @param {List} xs - The `List` to sort
 * @returns {List} - The sorted `List` (the original list is unmodified)
 * @kind function
 * @example
 * const lst1 = list(20,19,18,17,16,15,14,13,12,11,10,1,2,3,4,5,6,7,8,9);
 * sort(lst1); // => [1:2:3:4:5:6:7:8:9:10:11:12:13:14:15:16:17:18:19:20:[]]
 * const f = x => x + 1;
 * const lst2 = reverse(listRange(1, 11, f)); // [10:9:8:7:6:5:4:3:2:1:[]]
 * sort(lst2);                           // => [1:2:3:4:5:6:7:8:9:10:[]]
 */
export const sort = xs => sortBy((a, b) => a === b ? EQ : (a < b ? LT : GT), xs)

/**
 * Sort a list using a comparison function of your choice. Uses a merge sort algorithm.
 * @param {Function} cmp - The comparison function—must return an `Ordering`
 * @param {List} as - The `List` to sort
 * @returns {List} The sorted `List` (the original list is unmodified)
 * @kind function
 */
export const sortBy = (cmp, as) => {
  const sequences = as => {
    if (isEmpty(as)) { return list(as) }
    let xs = tail(as)
    if (isEmpty(xs)) { return list(as) }
    const a = head(as)
    const b = head(xs)
    xs = tail(xs)
    if (cmp(a, b) === GT) { return descending(b, list(a), xs) }
    return ascending(b, cons.bind(null, a), xs)
  }
  const descending = (a, as, bbs) => {
    if (isEmpty(bbs)) { return cons(cons(a, as), sequences(bbs)) }
    const b = head(bbs)
    const bs = tail(bbs)
    if (cmp(a, b) === GT) { return descending(b, cons(a, as), bs) }
    return cons(cons(a, as), sequences(bbs))
  }
  const ascending = (a, as, bbs) => {
    if (isEmpty(bbs)) { return cons(as(list(a)), sequences(bbs)) }
    const b = head(bbs)
    const bs = tail(bbs)
    const ys = ys => as(cons(a, ys))
    if (cmp(a, b) !== GT) { return ascending(b, ys, bs) }
    return cons(as(list(a)), sequences(bbs))
  }
  const mergeAll = xs => {
    if (isEmpty(tail(xs))) { return head(xs) }
    return mergeAll(mergePairs(xs))
  }
  const mergePairs = as => {
    if (isEmpty(as)) { return as }
    let xs = tail(as)
    if (isEmpty(xs)) { return as }
    const a = head(as)
    const b = head(xs)
    xs = tail(xs)
    return cons(merge(a, b), mergePairs(xs))
  }
  const merge = (as, bs) => {
    if (isEmpty(as)) { return bs }
    if (isEmpty(bs)) { return as }
    const a = head(as)
    const as1 = tail(as)
    const b = head(bs)
    const bs1 = tail(bs)
    if (cmp(a, b) === GT) { return cons(b, merge(as, bs1)) }
    return cons(a, merge(as1, bs))
  }
  return mergeAll(sequences(as))
}

/**
 * Return the prefix of a `List` of a given length.
 * @param {number} n - The length of the prefix to take
 * @param {List} as - The `List` to take from
 * @returns {List} A new `List`, the desired prefix of the original list
 * @kind function
 * @example
 * const lst = list(1,2,3);
 * take(2, lst);            // => [1:2:[]]
 */
export const take = (n, as) => {
  if (n <= 0) { return emptyList }
  if (isEmpty(as)) { return emptyList }
  const x = head(as)
  const xs = tail(as)
  return cons(x, take(n - 1, xs))
}

/**
 * Return the suffix of a `List` after discarding a specified number of values.
 * @param {number} n - The number of values to drop
 * @param {List} as - The `List` to drop values from
 * @returns {List} A new `List`, the desired suffix of the original list
 * @kind function
 * @example
 * const lst = list(1,2,3);
 * drop(2, lst);            // => [3:[]]
 */
export const drop = (n, as) => {
  if (n <= 0) { return as }
  if (isEmpty(as)) { return emptyList }
  const xs = tail(as)
  return drop(n - 1, xs)
}

/**
 * Return the longest prefix (possibly empty) of a `List` of values that satisfy a predicate
 * function.
 * @param {Function} p - The predicate function (should return `boolean`)
 * @param {List} as - The `List` to take from
 * @returns {List} The `List` of values that satisfy the predicate function
 * @kind function
 * @example
 * const lst = list(1,2,3,4,1,2,3,4);
 * const f = x => x < 3;
 * takeWhile(f, lst);                 // => [1:2:[]]
 */
export const takeWhile = (p, as) => {
  if (isEmpty(as)) { return emptyList }
  const x = head(as)
  const xs = tail(as)
  const test = p(x)
  if (test === true) { return cons(x, takeWhile(p, xs)) }
  return emptyList
}

/**
 * Drop values from a `List` while a given predicate function returns `true` for each value.
 * @param {Function} p - The predicate function (should return `boolean`)
 * @param {List} as - The `List` to drop values from
 * @returns {List} The `List` of values that do not satisfy the predicate function
 * @kind function
 * @example
 * const lst = list(1,2,3,4,5,1,2,3);
 * const f = x => x < 3;
 * dropWhile(f, lst);                 // => [3:4:5:1:2:3:[]]
 */
export const dropWhile = (p, as) => {
  if (isEmpty(as)) { return emptyList }
  const x = head(as)
  const xs = tail(as)
  const test = p(x)
  if (test === true) { return dropWhile(p, xs) }
  return as
}

/**
 * Generate an infinite `List`. Use `listInfBy` to supply your own step function.
 * @param {*} start - The value with which to start the `List`
 * @returns {List} An infinite `List` of consecutive values, incremented from `start`
 * @kind function
 */
export const listInf = start => listInfBy(start, x => x + 1)

/**
 * Generate an infinite `List`, incremented using a given step function.
 * @param {*} start - The value with which to start the `List`
 * @param {Function} step - A unary step function
 * @returns {List} An infinite `List` of consecutive values, incremented from `start`
 * @kind function
 */
export const listInfBy = (start, step) => listRangeBy(start, Infinity, step)

/**
 * Return an infinite `List` of repeated applications of a function to a value.
 * @param {Function} f - The function to apply
 * @param {*} x - The value to apply the function to
 * @returns {List} An infinite `List` of repeated applications of `f` to `x`
 * @kind function
 * @example
 * const f = x => x * 2;
 * const lst = iterate(f, 1);
 * take(10, lst);             // => [1:2:4:8:16:32:64:128:256:512:[]]
 * index(lst, 10);            // => 1024
 */
export const iterate = (f, x) => listInfBy(x, x => f(x))

/**
 * Build an infinite `List` of identical values.
 * @param {*} a - The value to repeat
 * @returns {List} The infinite `List` of repeated values
 * @kind function
 * @example
 * const lst = repeat(3);
 * take(10, lst);         // => [3:3:3:3:3:3:3:3:3:3:[]]
 * index(lst, 100);       // => 3
 */
export const repeat = a => cons(a, listInfBy(a, a => a))

/**
 * Return a `List` of a specified length in which every value is the same.
 * @param {number} n - The length of the `List`
 * @param {*} x - The value to replicate
 * @returns {List} The `List` of values
 * @kind function
 * @example
 * replicate(10, 3); // => [3:3:3:3:3:3:3:3:3:3:[]]
 */
export const replicate = (n, x) => take(n, repeat(x))

/**
 * Return the infinite repetition of a `List` (i.e. the "identity" of infinite lists).
 * @param {List} as - A finite `List`
 * @returns {List} A circular `List`, the original `List` infinitely repeated
 * @kind function
 * @example
 * const lst = list(1,2,3);
 * const c = cycle(lst);
 * take(9, c);              // => [1:2:3:1:2:3:1:2:3:[]]
 * index(c, 100);           // => 2
 */
export const cycle = as => {
  if (isEmpty(as)) { throw new EmptyListError(cycle) }
  let x = head(as)
  let xs = tail(as)
  const c = list(x)
  /* eslint no-constant-condition: ["error", { "checkLoops": false }] */
  const listGenerator = function* () {
    do {
      x = isEmpty(xs) ? head(as) : head(xs)
      xs = isEmpty(xs) ? tail(as) : tail(xs)
      yield list(x)
    } while (true)
  }
  const gen = listGenerator()
  const handler = {
    get: function (target, prop) {
      if (prop === `tail` && isEmpty(tail(target))) {
        const next = gen.next()
        target[prop] = () => new Proxy(next.value, handler)
      }
      return target[prop]
    }
  }
  const proxy = new Proxy(c, handler)
  return proxy
}
