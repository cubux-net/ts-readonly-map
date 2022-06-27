/**
 * Tests whether at least one element in the map passes the test implemented by
 * the provided function. It returns `true` if it finds an element for which the
 * provided function returns truthy value; otherwise it returns `false`. Works
 * similar to `Array.prototype.some()`.
 *
 * ```ts
 * const input: ReadonlyMap<string, number> = new Map([['x', 10], ['Y', 20]]);
 *
 * some(input, (v) => v % 10 === 0);
 * // => true
 * some(input, (v) => v % 20 === 0);
 * // => true
 * some(input, (_, k) => k === k.toUpperCase());
 * // => true
 * some(input, (v) => v % 2);
 * // => false
 * ```
 *
 * See also `every()`, `find()`, `includes()`.
 *
 * @param map
 * @param predicate
 */
function some<K, V>(
  map: ReadonlyMap<K, V>,
  predicate: (value: V, key: K, map: ReadonlyMap<K, V>) => unknown,
): boolean {
  for (let [key, value] of Array.from(map)) {
    if (predicate(value, key, map)) {
      return true;
    }
  }
  return false;
}

export default some;
