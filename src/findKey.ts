interface FindKeyFn {
  /**
   * Returns the key of the first element in the provided map that satisfies
   * the provided testing function. If no elements satisfy the testing function,
   * `undefined` is returned. Works similar to `Array.prototype.findIndex()`.
   *
   * ```ts
   * const input: ReadonlyMap<string, number> = new Map([['x', 10], ['y', 20]]);
   *
   * findKey(input, (v) => v % 20 === 0);
   * // => 'y'
   *
   * findKey(input, (v) => v % 10 === 0);
   * // => 'x'
   *
   * findKey(input, (v) => !v);
   * // => undefined
   *
   * findKey(input, (_, k) => k === k.toUpperCase());
   * // => undefined
   * ```
   *
   * See also `find()`.
   *
   * @param map
   * @param predicate
   */
  <K, V, P extends K>(
    map: ReadonlyMap<K, V>,
    predicate: (value: V, key: K, map: ReadonlyMap<K, V>) => key is P,
  ): P | undefined;

  /**
   * Returns the key of the first element in the provided map that satisfies
   * the provided testing function. If no elements satisfy the testing function,
   * `undefined` is returned. Works similar to `Array.prototype.findIndex()`.
   *
   * ```ts
   * const input: ReadonlyMap<string, number> = new Map([['x', 10], ['y', 20]]);
   *
   * findKey(input, (v) => v % 20 === 0);
   * // => 'y'
   *
   * findKey(input, (v) => v % 10 === 0);
   * // => 'x'
   *
   * findKey(input, (v) => !v);
   * // => undefined
   *
   * findKey(input, (_, k) => k === k.toUpperCase());
   * // => undefined
   * ```
   *
   * See also `find()`.
   *
   * @param map
   * @param predicate
   */
  <K, V>(
    map: ReadonlyMap<K, V>,
    predicate: (value: V, key: K, map: ReadonlyMap<K, V>) => unknown,
  ): K | undefined;
}

function findKey<K, V>(
  map: ReadonlyMap<K, V>,
  predicate: (value: V, key: K, map: ReadonlyMap<K, V>) => unknown,
): K | undefined {
  for (let [key, value] of Array.from(map)) {
    if (predicate(value, key, map)) {
      return key;
    }
  }
  return undefined;
}

/**
 * Returns the key of the first element in the provided map that satisfies
 * the provided testing function. If no elements satisfy the testing function,
 * `undefined` is returned. Works similar to `Array.prototype.findIndex()`.
 *
 * ```ts
 * const input: ReadonlyMap<string, number> = new Map([['x', 10], ['y', 20]]);
 *
 * findKey(input, (v) => v % 20 === 0);
 * // => 'y'
 *
 * findKey(input, (v) => v % 10 === 0);
 * // => 'x'
 *
 * findKey(input, (v) => !v);
 * // => undefined
 *
 * findKey(input, (_, k) => k === k.toUpperCase());
 * // => undefined
 * ```
 *
 * See also `find()`.
 *
 * @param map
 * @param predicate
 */
export default findKey as FindKeyFn;
