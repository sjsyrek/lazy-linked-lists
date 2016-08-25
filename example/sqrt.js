/**
 * lazy-linked-lists
 * Lazy and infinite linked lists for JavaScript.
 *
 * example/sqrt.js
 *
 * Examples of usage for lazy-linked-lists.
 * @license ISC
 */

import * as lazy from '../source'

/**
 * Compute the square root of a number using infinite lists with the Newton-Raphson method.
 * Adapted from "Why Functional Programming Matters" by John Hughes.
 * @param {number} a0 - initial estimate
 * @param {number} eps - tolerance
 * @param {number} n - number
 * @returns {number} The square root of `n`
 * @kind function
 * @example
 * sqrt(1,0,2);           // => 1.414213562373095
 * sqrt(1,0,144);         // => 12
 * relativeSqrt(1,0,144); // optimized version for very small and very large numbers
 */
export const sqrt = (a0, eps, n) => within(eps, lazy.iterate(next.bind(null, n), a0))

export const relativeSqrt = (a0, eps, n) => relative(eps, lazy.iterate(next.bind(null, n), a0))

const next = (n, x) => (x + n / x) / 2

const within = (eps, rest) => {
  let a = lazy.index(rest, 0)
  let b = lazy.index(rest, 1)
  return Math.abs(a - b) <= eps ? b : within(eps, lazy.drop(1, rest))
}

const relative = (eps, rest) => {
  let a = lazy.index(rest, 0)
  let b = lazy.index(rest, 1)
  return Math.abs(a - b) <= eps * Math.abs(b) ? b : relative(eps, lazy.drop(1, rest))
}
