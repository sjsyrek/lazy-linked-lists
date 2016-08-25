## Lazy and infinite linked lists for JavaScript

### An open source npm package written in ES2015 and transpiled with Babel

[![license](https://img.shields.io/badge/license-ISC-blue.svg)](https://github.com/sjsyrek/lazy-linked-lists/blob/master/LICENSE.txt)
[![build status](https://travis-ci.org/sjsyrek/lazy-linked-lists.svg?branch=master)](https://travis-ci.org/sjsyrek/lazy-linked-lists)
[![test coverage](https://codeclimate.com/github/sjsyrek/lazy-linked-lists/badges/coverage.svg)](https://codeclimate.com/github/sjsyrek/lazy-linked-lists/coverage)
[![bitHound score](https://www.bithound.io/github/sjsyrek/lazy-linked-lists/badges/score.svg)](https://www.bithound.io/github/sjsyrek/lazy-linked-lists)
[![dependencies status](https://david-dm.org/sjsyrek/lazy-linked-lists.svg)](https://david-dm.org/sjsyrek/lazy-linked-lists)
[![devDependencies status](https://david-dm.org/sjsyrek/lazy-linked-lists/dev-status.svg)](https://david-dm.org/sjsyrek/lazy-linked-lists?type=dev)
[![dependency status](https://dependencyci.com/github/sjsyrek/lazy-linked-lists/badge)](https://dependencyci.com/github/sjsyrek/lazy-linked-lists)
[![style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![CII Best Practices](https://bestpractices.coreinfrastructure.org/projects/334/badge)](https://bestpractices.coreinfrastructure.org/projects/334)

[![NPM](https://nodei.co/npm/lazy-linked-lists.png?downloads=true)](https://nodei.co/npm/lazy-linked-lists/)

> A spectre is haunting ECMAScript—the spectre of tail call optimization.
> — Karl Marxdown

## About

This library is adapted from [maryamyriameliamurphies.js](https://github.com/sjsyrek/maryamyriameliamurphies.js) with several modifications. It includes functions for creating both eagerly and lazily-evaluated linked list data structures, including infinite lists, and a core subset of functions for working with them. Unlike **maryamyriameliamurphies.js**, however, **lazy-linked-lists** does not implement function currying, partial application, or type checking. It does, however, implement most of the standard [Haskell](https://www.haskell.org) type classes as instance methods, and it also implements the [ES2015 iteration protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols), so you can use them in `for...of` loops or otherwise as regular iterators.

The lazy lists provided by this library are implemented using the new `Proxy` API in ES2015. Briefly, the lists returned from most of the list constructors are actually hidden behind proxy objects that trap references to their "tail" property, so that list elements, produced by an ES2015 generator function, are only evaluated on demand. Obviously, if you request the entire tail (by, for example, calling the `length()` function on a list), then the entire tail will be evaluated. You will want to avoid doing that with infinite lists.

Note that as of this writing, most implementations of the ES2015 standard do not yet support [proper tail calls](http://www.2ality.com/2015/06/tail-call-optimization.html). But support is on its way! The newest versions of node and Safari have already rolled it out, and other vendors are surely not far behind. See the top line of this [compatibility chart](https://kangax.github.io/compat-table/es6/) to track the progress of the feature that will make recursively defined, fully-functional, high octane linked lists in JavaScript a reality. Until that fateful day, however, you may be limited to lists of only 10,000 elements or so.

For further details, see the [documentation](http://sjsyrek.github.io/maryamyriameliamurphies.js/) for **maryamyriameliamurphies.js**.

##### [Try it now with Tonic](https://tonicdev.com/npm/lazy-linked-lists)

## Examples

Linked list, eagerly evaluated:
```js
const lst = list(1,2,3,4,5,6,7,8,9,10);
lst.valueOf(); // => '[1:2:3:4:5:6:7:8:9:10:[]]'
```

Linked list, lazily evaluated:
```js
const lst = listRange(1, 10);
lst.valueOf(); // => '[1:2:3:4:5:6:7:8:9:10:[]]'
```

Linked list, lazily evaluated with a user-defined step function:
```js
const lst1 = listRangeBy(0, 100, x => x + 10);
const lst2 = listRangeBy(10, 0, x => x - 1);
lst1.valueOf(); // => '[0:10:20:30:40:50:60:70:80:90:100:[]]'
lst2.valueOf(); // => '[10:9:8:7:6:5:4:3:2:1:[]]'
```

Iterating over a linked list:
```js
const lst = listRange(1, 5);
for (let value of lst) { console.log(value); }
// 1
// 2
// 3
// 4
// 5
```

Infinite list:
```js
const lst = listInf(1);
take(10, lst).valueOf(); // => '[1:2:3:4:5:6:7:8:9:10:[]]'
lst.valueOf(); // => RangeError: Maximum call stack size exceeded
```

Infinite list with a user-defined step function:
```js
const lst = listInfBy(0, x => x + 10);
take(11, lst).valueOf(); // => '[0:10:20:30:40:50:60:70:80:90:100:[]]'
```

Haskell-style type class action:
```js
const lst1 = list(1,2,3);
const lst2 = list(3,2,1);

// Eq
lst1.isEq(list(1,2,3)); // => true
lst1.isEq(lst2); // => false

// Ord
lst1.compare(lst2); // => Symbol()
lst1.compare(lst2) === LT; // => true
lst1.isLessThan(lst2); // => true
lst1.isGreaterThan(lst2); // => false

// Monoid
lst1.mappend(lst1.mempty()); // => '[1:2:3:[]]'
lst1.mappend(lst2); // => '[1:2:3:4:5:6:[]]'

// Foldable
lst1.foldr((x,y) => x * y, 1); // => 6

// Traversable
lst1.traverse(x => list(x * 10)); // => '[[10:20:30:[]]:[]]'

// Functor
lst1.fmap(x => x * 10); // => '[10:20:30:[]]'

// Applicative
const f = x => x * 10;
const fs1 = list(f);
const fs2 = list(f,f,f);
fs1.ap(lst1); // => '[10:20:30:[]]'
fs2.ap(lst1); // => '[10:20:30:10:20:30:10:20:30:[]]'

// Monad
lst1.flatMap(x => list(x * 10)); // => '[10:20:30:[]]'
lst1.then(lst2); // => '[4:5:6:4:5:6:4:5:6:[]]'
const stringify = x => list(`${x}`);
lst1.flatMap(x => list(x, x * 10, x * x)).flatMap(stringify); // => '[110122043309]'
```

Other fun stuff:
```js
const lst1 = listInfBy(0, x => x + 2);
const lst2 = take(10, lst1);
const lst3 = reverse(lst2);
const lst4 = sort(lst3);
lst3.valueOf(); // => '[18:16:14:12:10:8:6:4:2:0:[]]'
lst4.valueOf(); // => '[0:2:4:6:8:10:12:14:16:18:[]]'

const lst5 = iterate(x => x * 2, 1);
const lst6 = take(10, lst5);
lst6.valueOf(); // => '[1:2:4:8:16:32:64:128:256:512:[]]'
index(lst6, 10); // => Error: *** Exception: index: range error
index(lst5, 10); // => 1024

const lst7 = repeat(3);
const lst8 = take(10, lst7);
lst8.valueOf(); // => '[3:3:3:3:3:3:3:3:3:3:[]]'
index(lst7, 100); // => 3

const lst9 = replicate(10, 3);
lst9.valueOf(); // => [3:3:3:3:3:3:3:3:3:3:[]]

const lst10 = list(1,2,3);
const lst11 = cycle(lst10);
const lst12 = take(9, lst11);
lst12.valueOf(); // => [1:2:3:1:2:3:1:2:3:[]]
index(lst11, 99); // => 1
index(lst11, 100); // => 2
index(lst11, 101); // => 3
```

See also the files in the example directory.

### How to install and use

- [Install with npm](https://www.npmjs.com/package/lazy-linked-lists) `npm install --save-dev lazy-linked-lists`. _Do not_ install this package globally.
- If you're transpiling >=ES2015 code with [Babel](http://babeljs.io), put `import * as lazy from 'lazy-linked-lists';` at the top of your script files.
- Or, to pollute your namespace, import functions individually: `import {listRange, listRangeBy} from 'lazy-linked-lists';`.
- Or, if you aren't transpiling (or you're old school), use node's require syntax: `const lazy = require('lazy-linked-lists');`.

### How to develop

- [Fork this repo](https://help.github.com/articles/fork-a-repo/) and [clone it locally](https://help.github.com/articles/cloning-a-repository/).
- `npm install` to download the dependencies.
- `npm run compile` to run Babel on ES2015 code in `./source` and output transpiled ES5 code to `./distribution`.
- `npm run lint` to run ESlint to check the source code for errors.
- `npm test` to run Mocha on the test code in `./test`.
- `npm run cover` to run nyc on the source code and generate testing coverage reports.
- `npm run clean` to delete all files in `./distribution`.

#### See also

* [lazy.js](https://github.com/dtao/lazy.js)
* [node-lazy](https://github.com/pkrumins/node-lazy)
* [lazy-list](https://github.com/luochen1990/lazy-list)
* [js-list-lazy](https://github.com/dankogai/js-list-lazy)
* [fantasy-land](https://github.com/fantasyland/fantasy-land)
* [js-algebraic](https://github.com/tel/js-algebraic)
