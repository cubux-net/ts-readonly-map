/**
 * Tests whether all elements in the map pass the test implemented by the
 * provided function. Works similar to `Array.prototype.every()`.
 *
 * ```ts
 * const input: ReadonlyMap<string, number> = new Map([['x', 10], ['y', 20]]);
 *
 * every(input, (v) => v % 10 === 0);
 * // => true
 *
 * every(input, (v) => v % 20 === 0);
 * // => false
 *
 * every(input, (_, k) => k === k.toLowerCase());
 * // => true
 * ```
 *
 * See also `map()`, `some()`.
 *
 * @param map
 * @param predicate
 */
function every<K, V>(
  map: ReadonlyMap<K, V>,
  predicate: (value: V, key: K, map: ReadonlyMap<K, V>) => unknown,
): boolean {
  for (let [key, value] of Array.from(map)) {
    if (!predicate(value, key, map)) {
      return false;
    }
  }
  return true;
}

export default every;
