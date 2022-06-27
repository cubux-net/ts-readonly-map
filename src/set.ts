/**
 * Creates new map with the given key assigned to the given value.
 *
 * - Will return input `map` then nothing to change (t.i. input `map` already
 *   has `value` assigned to `key`).
 *
 * ```ts
 * const input: ReadonlyMap<string, number> = new Map([['x', 10], ['y', 20]]);
 *
 * set(input, 'z', 40);
 * // => Map(3) { 'x' => 10, 'y' => 20, 'z' => 40 }
 * set(input, 'y', 42);
 * // => Map(2) { 'x' => 10, 'y' => 42 }
 * set(input, 'y', 20) === input;
 * // => true
 * ```
 *
 * See also `setDeep()`, `update()`, `updateDefault()`.
 *
 * @param map
 * @param key
 * @param value
 */
function set<K, V>(
  map: ReadonlyMap<K, V>,
  key: K,
  value: V,
): ReadonlyMap<K, V> {
  if (map.has(key) && map.get(key) === value) {
    return map;
  }
  return new Map(map).set(key, value);
}

export default set;
