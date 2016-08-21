## Lazy and infinite linked lists for JavaScript

### An open source npm package written in ES2015 and transpiled with Babel

[![License](https://img.shields.io/badge/license-ISC-blue.svg)](https://github.com/sjsyrek/lazy-linked-lists/blob/master/LICENSE.txt)
[![Build Status](https://travis-ci.org/sjsyrek/lazy-linked-lists.svg?branch=master)](https://travis-ci.org/sjsyrek/lazy-linked-lists)
[![Test Coverage](https://codeclimate.com/github/sjsyrek/lazy-linked-lists/badges/coverage.svg)](https://codeclimate.com/github/sjsyrek/lazy-linked-lists/coverage)
[![Downloads](https://img.shields.io/npm/dt/lazy-linked-lists.svg?maxAge=2592000)](https://www.npmjs.com/package/lazy-linked-lists)

[![NPM](https://nodei.co/npm/lazy-linked-lists.png?downloads=true)](https://nodei.co/npm/lazy-linked-lists/)

> A spectre is haunting ECMAScript—the spectre of tail call optimization.
> — Karl Marxdown

## About

This library is adapted from [maryamyriameliamurphies.js](https://github.com/sjsyrek/maryamyriameliamurphies.js) with several modifications. It includes functions for creating both eagerly and lazily-evaluated linked list data structures, including infinite lists, and a core subset of functions for working with them. Unlike **maryamyriameliamurphies.js**, however, **lazy-linked-lists** does not implement function currying, partial application, or type checking. It does, however, implement most of the standard [Haskell](https://www.haskell.org) type classes as instance methods, and it also implements the [ES2015 iteration protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols), so you can use them in `for...of` loops.

Note that as of this writing, most implementations of the ES2015 standard do not yet support [proper tail calls](http://www.2ality.com/2015/06/tail-call-optimization.html). But support is on its way! The newest versions of node and Safari have already rolled it out, and other vendors are surely not far behind. See the top line of this [compatibility chart](https://kangax.github.io/compat-table/es6/) to track the progress of the feature that will make recursively defined, fully-functional, high octane linked lists in JavaScript a reality. Until that fateful day, however, you may be limited to lists of only 10,000 elements or so.

For further details, see the [maryamyriameliamurphies.js documentation](http://sjsyrek.github.io/maryamyriameliamurphies.js/).

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
const lst = listRangeBy(0, 100, x => x + 10);
lst.valueOf(); // => '[0:10:20:30:40:50:60:70:80:90:100:[]]'
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
