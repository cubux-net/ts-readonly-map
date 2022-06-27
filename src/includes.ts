/**
 * Determines whether a map includes a certain value among its values,
 * returning `true` or `false` as appropriate. Works similar to
 * `Array.prototype.includes()`.
 *
 * ```ts
 * const input: ReadonlyMap<string, number> = new Map([['x', 10], ['y', 20]]);
 *
 * includes(input, 20);
 * // => true
 * includes(input, 42);
 * // => false
 * ```
 *
 * See also `find()`, `some()`.
 *
 * @param map
 * @param value
 */
function includes<K, V>(map: ReadonlyMap<K, V>, value: V): boolean {
  for (const v of Array.from(map.values())) {
    if (v === value) {
      return true;
    }
  }
  return false;
}

export default includes;
