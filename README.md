# `@cubux/readonly-map`

[![NPM latest](https://img.shields.io/npm/v/@cubux/readonly-map.svg)](https://www.npmjs.com/package/@cubux/readonly-map)

A bunch of helper functions to work with read-only maps. Works internally with
native maps without any kind of magic.

```ts
import { remove, updateDefault, updateDefaultDeep } from '@cubux/readonly-map';

const input: ReadonlyMap<string, number> = new Map([['x', 10], ['y', 20]]);

console.log(updateDefault(input, 'z', 30, (v) => v + 1));
// => Map(3) { 'x' => 10, 'y' => 20, 'z' => 31 }

console.log(remove(input, 'x'));
// => Map(1) { 'y' => 20 }

const nested: ReadonlyMap<string, ReadonlyMap<number, number>> = new Map([
  ['x', new Map([
    [10, 23],
    [20, 42],
  ])],
]);

updateDefaultDeep(nested, ['x', 20], 0, (v) => v + 1);
// => Map(1) {
//      'x' => Map(2) { 10 => 23, 20 => 43 },
//    }
updateDefaultDeep(nested, ['y', 30], 0, (v) => v + 1);
// => Map(2) {
//      'x' => Map(2) { 10 => 23, 20 => 42 },
//      'y' => Map(1) { 30 => 1 },
//    }
```

Alternative usage:

```ts
import * as RoMap from '@cubux/readonly-map';

const input: ReadonlyMap<string, number> = new Map([['x', 10], ['y', 20]]);

console.log(RoMap.remove(input, 'x'));
// => Map(1) { 'y' => 20 }
```

## Use Cases

### State management

```tsx
import { FC, useState, ChangeEvent } from 'react';
import { remove, set } from '@cubux/readonly-map';

const TodoList: FC = () => {
  const [values, setValues] = useState<ReadonlyMap<string, number>>(() => new Map());

  const handleChangeItem = (
    key: string,
    { target: { value } }: ChangeEvent<HTMLInputElement>,
  ) =>
    setValues(prev => value ? set(prev, key, value) : remove(prev, key));

  ...
};
```

## Install

```sh
npm i @cubux/readonly-map
```

## API

### `every()`

```ts
every(
  map:       ReadonlyMap<K, V>,
  predicate: (value: V, key: K, map: ReadonlyMap<K, V>) => unknown,
): boolean
```

Tests whether all elements in the map pass the test implemented by the
provided function. Works similar to `Array.prototype.every()`.

```ts
const input: ReadonlyMap<string, number> = new Map([['x', 10], ['y', 20]]);

every(input, (v) => v % 10 === 0);
// => true

every(input, (v) => v % 20 === 0);
// => false

every(input, (_, k) => k === k.toLowerCase());
// => true
```

See also `map()`, `some()`.

### `filter()`

```ts
filter(
  map:       ReadonlyMap<K, V>,
  predicate: (value: V, key: K, map: ReadonlyMap<K, V>) => unknown,
): ReadonlyMap<K, V>
```

Creates a new map with all elements that pass the test implemented by the
provided function. Works similar to `Array.prototype.filter()`.

- Will return input `map` if nothing changed (t.i. all elements passed the
  test).

```ts
const input: ReadonlyMap<string, number> = new Map([
  ['x', 10],
  ['y', 20],
  ['Z', 42],
]);

filter(input, (v, k) => v % 20 === 0 || k === k.toUpperCase());
// => Map(2) { 'y' => 20, 'Z' => 42 }
```

See also `map()`.

### `find()`

```ts
find(
  map:       ReadonlyMap<K, V>,
  predicate: (value: V, key: K, map: ReadonlyMap<K, V>) => unknown,
): V | undefined
```

Returns the value of the first element in the provided map that satisfies
the provided testing function. If no elements satisfy the testing function,
`undefined` is returned. Works similar to `Array.prototype.find()`.

```ts
const input: ReadonlyMap<string, number> = new Map([['x', 10], ['y', 20]]);

find(input, (v) => v % 20 === 0);
// => 20

find(input, (v) => v % 10 === 0);
// => 10

find(input, (v) => !v);
// => undefined

find(input, (_, k) => k === k.toUpperCase());
// => undefined
```

See also `findKey()`, `includes()`, `some()`.

### `findKey()`

```ts
findKey(
  map:       ReadonlyMap<K, V>,
  predicate: (value: V, key: K, map: ReadonlyMap<K, V>) => unknown,
): K | undefined
```

Returns the key of the first element in the provided map that satisfies
the provided testing function. If no elements satisfy the testing function,
`undefined` is returned. Works similar to `Array.prototype.findIndex()`.

```ts
const input: ReadonlyMap<string, number> = new Map([['x', 10], ['y', 20]]);

findKey(input, (v) => v % 20 === 0);
// => 'y'

findKey(input, (v) => v % 10 === 0);
// => 'x'

findKey(input, (v) => !v);
// => undefined

findKey(input, (_, k) => k === k.toUpperCase());
// => undefined
```

See also `find()`.

### `getOr()`

```ts
getOr(
  map:          ReadonlyMap<K, V>,
  key:          K,
  defaultValue: D
): V | D
```

Get a value of the given key in the map. If map has no given key a
`defaultValue` is returned.

```ts
const input: ReadonlyMap<string, number | undefined> = new Map([
  ['x', 10],
  ['y', undefined],
]);

getOr(input, 'x');
// => 10

getOr(input, 'y', null);
// => undefined

getOr(input, 'z', null);
// => null
```

See also `getDeep()`.

### `getDeep()`

```ts
getDeep(
  map:          MapDeep<KS, V>,
  path:         KS,
  defaultValue: D,
): V | D
```

Returns a value from the given nested maps structure referenced with given
keys path. If map has no final element in the given path a `defaultValue` is
returned.

- An empty path `[]` cause an error since function was designed for nested
  maps with fixed depth.

```ts
const input: ReadonlyMap<string, ReadonlyMap<string, number>> = new Map([
  ['x', new Map([
    ['a', 10],
    ['b', 20],
  ])],
  ['y', new Map()],
]);

getDeep(input, ['x', 'b']);
// => 20

getDeep(input, ['x']);
// => Map(2) { 'a' => 10, 'b' => 20 }

getDeep(input, ['y', 't']);
// => undefined
getDeep(input, ['y', 't'], null);
// => null
```

See also `getOr()`, `hasDeep()`.

### `hasDeep()`

```ts
hasDeep(
  map:  MapDeep<KS, any>,
  path: KS,
): boolean
```

Returns a boolean indicating whether an element with the specified keys path
exists or not.

- An empty path `[]` cause an error since function was designed for nested
  maps with fixed depth.

```ts
const input: ReadonlyMap<string, ReadonlyMap<string, number>> = new Map([
  ['x', new Map([
    ['a', 10],
    ['b', 20],
  ])],
  ['y', new Map()],
]);

hasDeep(input, ['x', 'b']);
// => true
hasDeep(input, ['x']);
// => true
hasDeep(input, ['y', 't']);
// => false
```

See also `getDeep()`.

### `includes()`

```ts
includes(
  map:   ReadonlyMap<K, V>,
  value: V,
): boolean
```

Determines whether a map includes a certain value among its values,
returning `true` or `false` as appropriate. Works similar to
`Array.prototype.includes()`.

```ts
const input: ReadonlyMap<string, number> = new Map([['x', 10], ['y', 20]]);

includes(input, 20);
// => true
includes(input, 42);
// => false
```

See also `find()`, `some()`.

### `map()`

```ts
map(
  map:      ReadonlyMap<K, V>,
  callback: (value: V, key: K, map: ReadonlyMap<K, V>) => U,
): ReadonlyMap<K, U>
```

Creates a new map populated with the results of calling a provided function
on every element in the calling map as values with respective keys from input
map. Works similar to `Array.prototype.map()`.

- Will return input `map` when nothing to change (t.i. input `map` is empty
  or every new value is identical to respective old value).

```ts
const input: ReadonlyMap<string, number> = new Map([['x', 10], ['y', 20]]);

map(input, (v) => v + 1);
// => Map(2) { 'x' => 11, 'y' => 21 }

map(input, (v, k) => ({[k]: v}));
// => Map(2) { 'x' => { x: 10 }, 'y' => { y: 20 } }
```

See also `reduce()`.

### `merge()`

```ts
merge(
  a:    ReadonlyMap<K, V>,
  ...b: ReadonlyMap<K, V>[]
): ReadonlyMap<K, V>
```

Merge multiple maps into new map. Every key in the returned map will have the
latest value from all occurrences of the key.

- May return input map when nothing to change.

```ts
const input: ReadonlyMap<string, number> = new Map([['x', 10], ['y', 20]]);

merge(input, new Map([['z', 30], ['y', 42]]));
// => Map(3) { 'x' => 10, 'y' => 42, 'z' => 30 }

merge(input, new Map([['y', 20]])) === input;
// => true

merge(new Map(), input, new Map()) === input;
// => true
```

See also `map()`, `set()`.

### `toObjectDeep()`

```ts
toObjectDeep(
  map: ReadonlyMap<keyof any, any>,
): object
```

Converts nested maps structure into nested objects keeping key=>value pairs.

```ts
const input: ReadonlyMap<string, ReadonlyMap<number, string>> = new Map([
  ['x', new Map([
    [10, 'a'],
    [20, 'b'],
  ])],
  ['y', new Map([[30, 'c']])],
  ['z', new Map()],
]);

toObjectDeep(map);
// {
//   x: {
//     10: 'a',
//     20: 'b',
//   },
//   y: {
//     30: 'c',
//   },
//   z: {},
// }
```

See also `reduce()`.

### `reduce()`

```ts
reduce(
  map:     ReadonlyMap<K, V>,
  reducer: (prev: U, value: V, key: K, map: ReadonlyMap<K, V>) => U,
  initial: U,
): U
```

Executes a provided reducer function on each element of the map, resulting
in a single output value. Works similar to `Array.prototype.reduce()`.

```ts
const input: ReadonlyMap<string, number> = new Map([['x', 10], ['y', 20]]);

reduce(input, (s, v) => s + v, 0);
// => 30

reduce(input, (m, v, k) => m.set(v, k), new Map<number, string>())
// => Map(2) { 10 => 'x', 20 => 'y' }
```

See also `map()`.

### `remove()`

```ts
remove(
  map: ReadonlyMap<K, V>,
  key: K,
): ReadonlyMap<K, V>
```

Create a new map without given key.

- Will return input `map` when it doesn't have given `key`.

```ts
const input: ReadonlyMap<string, number> = new Map([['x', 10], ['y', 20]]);

remove(input, 'x');
// => Map(1) { 'y' => 20 }
```

See also `removeDeep()`, `filter()`, `reduce()`.

### `removeDeep()`

```ts
removeDeep(
  map:  MapDeep<KS, V>,
  path: KS,
): MapDeep<KS, V>
```

Creates new nested maps structure from `input` by removing a single element
with the given keys `path`.

- Will return input `map` when element with the given path doesn't exist.
- An empty path `[]` cause an error since function was designed for nested
  maps with fixed depth.

```ts
const input: ReadonlyMap<string, ReadonlyMap<string, number>> = new Map([
  ['x', new Map([
    ['a', 10],
    ['b', 20],
  ])],
  ['y', new Map()],
]);

removeDeep(input, ['x', 'b']);
// => Map(2) {
//      'x' => Map(2) { 'a' => 10 },
//      'y' => Map(0) {},
//    }
```

See also `remove()`, `hasDeep()`, `setDeep()`.

### `set()`

```ts
set(
  map:   ReadonlyMap<K, V>,
  key:   K,
  value: V,
): ReadonlyMap<K, V>
```

Creates new map with the given key assigned to the given value.

- Will return input `map` then nothing to change (t.i. input `map` already
  has `value` assigned to `key`).

```ts
const input: ReadonlyMap<string, number> = new Map([['x', 10], ['y', 20]]);

set(input, 'z', 40);
// => Map(3) { 'x' => 10, 'y' => 20, 'z' => 40 }
set(input, 'y', 42);
// => Map(2) { 'x' => 10, 'y' => 42 }
set(input, 'y', 20) === input;
// => true
```

See also `setDeep()`, `update()`, `updateDefault()`.

### `setDeep()`

```ts
setDeep(
  map:   MapDeep<KS, V>,
  path:  KS,
  value: V,
): MapDeep<KS, V>
```

Creates new nested maps structure from `input` by assigning the given `value`
to a single element with the given keys `path`.

- Will return input `map` when element with the given path already exists and
  is identical to the given `value` already.
- An empty path `[]` cause an error since function was designed for nested
  maps with fixed depth.

```ts
const input: ReadonlyMap<string, ReadonlyMap<string, number>> = new Map([
  ['x', new Map([
    ['a', 10],
    ['b', 20],
  ])],
]);

setDeep(input, ['x', 'b'], 42);
// => Map(1) {
//      'x' => Map(2) { 'a' => 10, 'b' => 42 },
//    }

setDeep(input, ['y'], new Map([['c' => 42]]));
// => Map(2) {
//      'x' => Map(2) { 'a' => 10, 'b' => 20 },
//      'y' => Map(2) { 'c' => 42 },
//    }

setDeep(input, ['x', 'b'], 20) === input;
// => true
```

See also `set()`, `updateDeep()`, `updateDefaultDeep()`.

### `some()`

```ts
some(
  map:       ReadonlyMap<K, V>,
  predicate: (value: V, key: K, map: ReadonlyMap<K, V>) => unknown,
): boolean
```

Tests whether at least one element in the map passes the test implemented by
the provided function. It returns `true` if it finds an element for which the
provided function returns truthy value; otherwise it returns `false`. Works
similar to `Array.prototype.some()`.

```ts
const input: ReadonlyMap<string, number> = new Map([['x', 10], ['Y', 20]]);

some(input, (v) => v % 10 === 0);
// => true
some(input, (v) => v % 20 === 0);
// => true
some(input, (_, k) => k === k.toUpperCase());
// => true
some(input, (v) => v % 2);
// => false
```

See also `every()`, `find()`, `includes()`.

### `update()`

```ts
update(
  map:     ReadonlyMap<K, V>,
  key:     K,
  updater: (prev: V, key: K, map: ReadonlyMap<K, V>) => V,
): ReadonlyMap<K, V>
```

Creates new map from input `map` by updating value in the given `key` with
the given callback `updater()`.

- Will do nothing and return input `map` if `key` does not exist. See else
  `updateDefault()` as opposite for this case.
- Will return input `map` when nothing to change (t.i. when new value
  returned from `updater()` is identical to old value).

```ts
const input: ReadonlyMap<string, number> = new Map([['x', 10], ['y', 20]]);

update(input, 'y', (v) => v + 1);
// => Map(2) { 'x' => 10, 'y' => 21 }

update(input, 'z', () => { throw new Error("Won't be called"); }) === input;
// => true
```

See also `set()`, `updateDefault()`, `updateDeep()`.

### `updateDeep()`

```ts
updateDeep(
  map:     MapDeep<KS, V>,
  path:    KS,
  updater: (value: V) => V,
): MapDeep<KS, V>
```

Creates new nested maps structure from input `map` by updating value in the
given keys path with the given callback `updater()`.

- Will do nothing and return input `map` if element in the given path does
  not exist. See else `updateDefaultDeep()` as opposite for this case.
- Will return input `map` when nothing to change (t.i. when new value
  returned from `updater()` is identical to old value).
- An empty path `[]` cause an error since function was designed for nested
  maps with fixed depth.

```ts
const input: ReadonlyMap<string, ReadonlyMap<string, number>> = new Map([
  ['x', new Map([
    ['a', 10],
    ['b', 20],
  ])],
]);

updateDeep(input, ['x', 'b'], (v) => v + 1);
// => Map(1) {
//      'x' => Map(2) { 'a' => 10, 'b' => 21 },
//    }

updateDeep(input, ['y'], () => { throw new Error("Won't be called") }) === input;
// => true

updateDeep(input, ['x', 'b'], (v) => v) === input;
// => true
```

See also `update()`, `updateDefaultDeep()`, `setDeep()`.

### `updateDefault()`

```ts
updateDefault(
  map:          ReadonlyMap<K, V>,
  key:          K,
  defaultValue: V,
  updater:      (prev: V, key: K, map: ReadonlyMap<K, V>) => V,
): ReadonlyMap<K, V>
```

Creates new map from input `map` by updating value in the given `key` with
the given callback `updater()`. The given `defaultValue` will be used as
"old" value for the callback when then given `key` doesn't exist in the given
`map`.

- Will always call `updater()` callback. See else `update()` as opposite for
  this case.
- Will return input `map` when nothing to change (t.i. when new value
  returned from `updater()` is identical to old value wherever it came from -
  existing value of `key` or `defaultValue`).

```ts
const input: ReadonlyMap<string, number> = new Map([['x', 10], ['y', 20]]);

updateDefault(input, 'y', 30, (v) => v + 1);
// => Map(2) { 'x' => 10, 'y' => 21 }

updateDefault(input, 'z', 30, (v) => v + 1);
// => Map(3) { 'x' => 10, 'y' => 20, 'z' => 31 }

updateDefault(input, 'z', 0, (v) => v) === input;
// => true
```

See also `set()`, `update()`, `updateDefaultDeep()`.

### `updateDefaultDeep()`

```ts
updateDefaultDeep(
  map:          MapDeep<KS, V>,
  path:         KS,
  defaultValue: V,
  updater:      (value: V) => V,
): MapDeep<KS, V>
```

Creates new nested maps structure from input `map` by updating value in the
given keys path with the given callback `updater()`.

- Will always call `updater()` callback. See else `updateDeep()` as opposite
  for this case.
- Will return input `map` when nothing to change (t.i. when new value
  returned from `updater()` is identical to old value wherever it came from -
  existing value of `key` or `defaultValue`).
- An empty path `[]` cause an error since function was designed for nested
  maps with fixed depth.

```ts
const input: ReadonlyMap<string, ReadonlyMap<string, number>> = new Map([
  ['x', new Map([
    ['a', 10],
    ['b', 20],
  ])],
]);

updateDefaultDeep(input, ['x', 'b'], 30, (v) => v + 1);
// => Map(1) {
//      'x' => Map(2) { 'a' => 10, 'b' => 21 },
//    }

updateDefaultDeep(input, ['y', 'c'], 30, (v) => v + 1);
// => Map(2) {
//      'x' => Map(2) { 'a' => 10, 'b' => 20 },
//      'y' => Map(2) { 'c' => 31 },
//    }

updateDefaultDeep(input, ['x', 'b'], 0, (v) => v) === input;
// => true
updateDefaultDeep(input, ['y', 'c'], 0, (v) => v) === input;
// => true
```

See also `updateDefault()`, `updateDeep()`, `setDeep()`.
