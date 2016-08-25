/**
 * lazy-linked-lists
 * Lazy and infinite linked lists for JavaScript.
 *
 * source/error.js
 *
 * Errors.
 * @license ISC
 */

export class EmptyListError extends Error {
  constructor(message) {
    super(message);
    this.name = 'EmptyListError';
  }
}
export class OutOfRangeError extends Error {
  constructor(message) {
    super(message);
    this.name = 'OutOfRangeError';
  }
}
