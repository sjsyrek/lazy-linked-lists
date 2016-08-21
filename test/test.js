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
} from './ord';

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
} from './lib';
