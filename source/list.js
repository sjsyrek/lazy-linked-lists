/**
 * lazy-linked-lists
 * Lazy and infinite linked lists for JavaScript.
 *
 * list.js
 *
 * List data type.
 * @license ISC
 */

import {
  LT,
  GT,
  EQ
} from './ord';

import {
  emptyList,
  list,
  cons,
  head,
  tail,
  listAppend,
  isEmpty,
  fromListToArray,
  fromListToString,
  map,
  concat
} from './lib';

/**
 * A data constructor for a `List`.
 * @alias module:list.List
 * @kind class
 * @extends Type
 * @private
 */
export class List {
  /**
   * Create a new `List`.
   * @param {*} head - The value to put at the head of the `List`
   * @param {List} tail - The tail of the `List`, which is also a `List` (possibly the empty list)
   * @private
   */
  constructor(x, xs) {
    this.head = null;
    this.tail = null;
    this.head = () => x;
    this.tail = () => xs;
  }
  [Symbol.iterator]() {
    const listIterator = function* (xs) {
      do {
        yield head(xs);
        xs = tail(xs);
      } while (xs !== emptyList);
    };
    const gen = listIterator(this);
    return {
      next() { return gen.next(); }
    };
  }
  /**
   * Determine whether the `List` on which it is called is exactly equal to another `List`.
   * @param {List} ys - The other `List` on which to perform the equality check
   * @returns {boolean} `true` if this `List` === `ys` and `false` otherwise
   */
  isEq(ys) { return fromListToArray(this).every((x, i) => x === fromListToArray(ys)[i]) }
  /**
   * Compare the `List` on which it is called to another `List` to determine its relative "ordering"
   * (less than, greater than, or equal).
   * @param {List} ys - The other `List` to compare
   * @returns {Symbol} `LT`, `GT`, or `EQ`, the ordering of this `List` as compared to `ys`
   */
  compare(ys) {
    if (isEmpty(this) && isEmpty(ys)) { return EQ; }
    if (isEmpty(this) && isEmpty(ys) === false) { return LT; }
    if (isEmpty(this) === false && isEmpty(ys)) { return GT; }
    if (this.head() === head(ys)) { return this.tail().compare(tail(ys)); }
    return this.head() < head(ys) ? LT : GT;
  }
  /**
   * Determine whether the `List` on which it is called is less than another `List`.
   * @param {List} ys - The other `List` to compare
   * @returns {boolean} `true` if this `List` < `ys` and `false` otherwise
   */
  isLessThan(ys) { return this.compare(ys) === LT; }
  /**
   * Determine whether the `List` on which it is called is less than or equal to another `List`.
   * @param {List} ys - The other `List` to compare
   * @returns {boolean} `true` if this `List` <= `ys` and `false` otherwise
   */
  isLessThanOrEqual(ys) { return this.compare(ys) !== GT; }
  /**
   * Determine whether the `List` on which it is called is greater than another `List`.
   * @param {List} ys - The other `List` to compare
   * @returns {boolean} `true` if this `List` > `ys` and `false` otherwise
   */
  isGreaterThan(ys) { return this.compare(ys) === GT; }
  /**
   * Determine whether the `List` on which it is called is greater than or equal to another `List`.
   * @param {List} ys - The other `List` to compare
   * @returns {boolean} `true` if this `List` >= `ys` and `false` otherwise
   */
  isGreaterThanOrEqual(ys) { return this.compare(ys) !== LT; }
  /**
   * Return the monoidal identity of a `List`, which is the empty list.
   * @returns {List} The empty list
   */
  mempty() { return emptyList; }
  /**
   * Perform an associative operation on the `List` on which it is called and another `List`. This
   * is a monoidal operation, which for this data type is equivalent to `listAppend`.
   * @param {List} ys - The other `List`
   * @returns {List} A new `List`, the result of the associative operation
   */
  mappend(ys) { return listAppend(this, ys); }
  /**
   * Apply a function to each value of the `List` on which it is called and accumulate the result.
   * @param {Function} f - The function to fold over the `List`
   * @param {*} acc - The starting accumulator value
   * @returns {*} The result of folding `f` over the `List`
   */
  foldr(f, acc) {
    if (isEmpty(this)) { return acc; }
    const x = this.head();
    const xs = this.tail();
    return f(x, xs.foldr(f, acc));
  }
  /**
   * Map each element of a `List` to a function, evaluate the functions from left to right, and
   * collect the results.
   * @param {Function} f - The function to map over the `List`
   * @returns {*} The result of the traversal
   */
  traverse(f) {
    return isEmpty(this) ? this.pure(emptyList) : this.head().fmap(cons).ap(this.tail().traverse(f));
  }
  /**
   * Map a function over each element of a `List`, and return the results in a new `List`.
   * @param {Function} f - The function to map over the `List`
   * @returns {List} A new `List`, the result of the mapping
   */
  fmap(f) { return map(f, this); }
  /**
   * Lift a value into the context of a `List`.
   * @param {*} a - The value to lift into a `List`
   * @returns {List} The lifted value
   */
  pure(a) { return list(a); }
  /**
   * Apply the `List` of functions on which it is called to a `List` of values, and return the
   * results in a new `List`.
   * @param {List} ys - The `List` of values
   * @returns {List} A new `List`, the result of the applications
   */
  ap(ys) { return isEmpty(this) ? emptyList : listAppend(this.head().fmap(ys), this.tail().ap(ys)); }
  /**
   * Perform a monadic "bind" operation. Apply a function that returns a `List` to the values of the
   * `List` on which it is called and flatten the result to produce a new `List`.
   * @param {Function} f - The function to apply to the values of this `List`
   * @returns {List} A new `List`, the result of the monadic operation
   */
  flatMap(f) { return concat(map(f, this)); }
  /**
   * Perform a monadic chaining operation from one `List` to another, discarding the value of the
   * `List` on which it is called.
   * @param {List} ys - The function to chain
   * @returns {List} A new `List`, the result of the chaining operation
   */
  then(ys) {
    const c = (a, b) => (b, a);
    const id = a => a;
    return this.fmap(c.bind(null, id)).ap(ys);
  }
  toString() { return `[Object List]`; }
  typeOf() { return `[${isEmpty(this) ? '' : typeof this.head()}]`; }
  valueOf() {
    if (this === emptyList) { return `[]`; }
    const value = xs => isEmpty(xs) ? `[]` : `${head(xs)}:${value(tail(xs))}`;
    return `[${typeof this === `[string]` ? fromListToString(this) : value(this)}]`;
  }
}
