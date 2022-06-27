/**
 * Create a new map without given key.
 *
 * - Will return input `map` when it doesn't have given `key`.
 *
 * ```ts
 * const input: ReadonlyMap<string, number> = new Map([['x', 10], ['y', 20]]);
 *
 * remove(input, 'x');
 * // => Map(1) { 'y' => 20 }
 * ```
 *
 * See also `removeDeep()`, `filter()`, `reduce()`.
 *
 * @param map
 * @param key
 */
function remove<K, V>(map: ReadonlyMap<K, V>, key: K): ReadonlyMap<K, V> {
  if (!map.has(key)) {
    return map;
  }
  const next = new Map(map);
  next.delete(key);
  return next;
}

export default remove;
