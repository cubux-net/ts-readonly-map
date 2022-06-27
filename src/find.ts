interface FindFn {
  /**
   * Returns the value of the first element in the provided map that satisfies
   * the provided testing function. If no elements satisfy the testing function,
   * `undefined` is returned. Works similar to `Array.prototype.find()`.
   *
   * ```ts
   * const input: ReadonlyMap<string, number> = new Map([['x', 10], ['y', 20]]);
   *
   * find(input, (v) => v % 20 === 0);
   * // => 20
   *
   * find(input, (v) => v % 10 === 0);
   * // => 10
   *
   * find(input, (v) => !v);
   * // => undefined
   *
   * find(input, (_, k) => k === k.toUpperCase());
   * // => undefined
   * ```
   *
   * See also `findKey()`, `includes()`, `some()`.
   *
   * @param map
   * @param predicate
   */
  <K, V, U extends V>(
    map: ReadonlyMap<K, V>,
    predicate: (value: V, key: K, map: ReadonlyMap<K, V>) => value is U,
  ): U | undefined;

  /**
   * Returns the value of the first element in the provided map that satisfies
   * the provided testing function. If no elements satisfy the testing function,
   * `undefined` is returned. Works similar to `Array.prototype.find()`.
   *
   * ```ts
   * const input: ReadonlyMap<string, number> = new Map([['x', 10], ['y', 20]]);
   *
   * find(input, (v) => v % 20 === 0);
   * // => 20
   *
   * find(input, (v) => v % 10 === 0);
   * // => 10
   *
   * find(input, (v) => !v);
   * // => undefined
   *
   * find(input, (_, k) => k === k.toUpperCase());
   * // => undefined
   * ```
   *
   * See also `findKey()`, `includes()`, `some()`.
   *
   * @param map
   * @param predicate
   */
  <K, V>(
    map: ReadonlyMap<K, V>,
    predicate: (value: V, key: K, map: ReadonlyMap<K, V>) => unknown,
  ): V | undefined;
}

function find<K, V>(
  map: ReadonlyMap<K, V>,
  predicate: (value: V, key: K, map: ReadonlyMap<K, V>) => unknown,
): V | undefined {
  for (let [key, value] of Array.from(map)) {
    if (predicate(value, key, map)) {
      return value;
    }
  }
  return undefined;
}

/**
 * Returns the value of the first element in the provided map that satisfies
 * the provided testing function. If no elements satisfy the testing function,
 * `undefined` is returned. Works similar to `Array.prototype.find()`.
 *
 * ```ts
 * const input: ReadonlyMap<string, number> = new Map([['x', 10], ['y', 20]]);
 *
 * find(input, (v) => v % 20 === 0);
 * // => 20
 *
 * find(input, (v) => v % 10 === 0);
 * // => 10
 *
 * find(input, (v) => !v);
 * // => undefined
 *
 * find(input, (_, k) => k === k.toUpperCase());
 * // => undefined
 * ```
 *
 * See also `findKey()`, `includes()`, `some()`.
 *
 * @param map
 * @param predicate
 */
export default find as FindFn;
