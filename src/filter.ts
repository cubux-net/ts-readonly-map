interface ImMapFilter {
  /**
   * Creates a new map with all elements that pass the test implemented by the
   * provided function. Works similar to `Array.prototype.filter()`.
   *
   * - Will return input `map` if nothing changed (t.i. all elements passed the
   *   test).
   *
   * ```ts
   * const input: ReadonlyMap<string, number> = new Map([
   *   ['x', 10],
   *   ['y', 20],
   *   ['Z', 42],
   * ]);
   *
   * filter(input, (v, k) => v % 20 === 0 || k === k.toUpperCase());
   * // => Map(2) { 'y' => 20, 'Z' => 42 }
   * ```
   *
   * See also `map()`.
   *
   * @param map
   * @param predicate
   */
  <K, V, U extends V>(
    map: ReadonlyMap<K, V>,
    predicate: (value: V, key: K, map: ReadonlyMap<K, V>) => value is U,
  ): ReadonlyMap<K, U>;

  /**
   * Creates a new map with all elements that pass the test implemented by the
   * provided function. Works similar to `Array.prototype.filter()`.
   *
   * - Will return input `map` if nothing changed (t.i. all elements passed the
   *   test).
   *
   * ```ts
   * const input: ReadonlyMap<string, number> = new Map([
   *   ['x', 10],
   *   ['y', 20],
   *   ['Z', 42],
   * ]);
   *
   * filter(input, (v, k) => v % 20 === 0 || k === k.toUpperCase());
   * // => Map(2) { 'y' => 20, 'Z' => 42 }
   * ```
   *
   * See also `map()`.
   *
   * @param map
   * @param predicate
   */
  <K, V>(
    map: ReadonlyMap<K, V>,
    predicate: (value: V, key: K, map: ReadonlyMap<K, V>) => unknown,
  ): ReadonlyMap<K, V>;
}

function filter<K, V>(
  map: ReadonlyMap<K, V>,
  predicate: (value: V, key: K, map: ReadonlyMap<K, V>) => unknown,
) {
  let next: Map<K, V> | undefined;
  for (let [key, value] of Array.from(map)) {
    if (!predicate(value, key, map)) {
      (next || (next = new Map(map))).delete(key);
    }
  }
  return next || map;
}

/**
 * Creates a new map with all elements that pass the test implemented by the
 * provided function. Works similar to `Array.prototype.filter()`.
 *
 * - Will return input `map` if nothing changed (t.i. all elements passed the
 *   test).
 *
 * ```ts
 * const input: ReadonlyMap<string, number> = new Map([
 *   ['x', 10],
 *   ['y', 20],
 *   ['Z', 42],
 * ]);
 *
 * filter(input, (v, k) => v % 20 === 0 || k === k.toUpperCase());
 * // => Map(2) { 'y' => 20, 'Z' => 42 }
 * ```
 *
 * See also `map()`.
 *
 * @param map
 * @param predicate
 */
export default filter as ImMapFilter;
