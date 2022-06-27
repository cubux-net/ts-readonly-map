/**
 * Creates new map from input `map` by updating value in the given `key` with
 * the given callback `updater()`.
 *
 * - Will do nothing and return input `map` if `key` does not exist. See else
 *   `updateDefault()` as opposite for this case.
 * - Will return input `map` when nothing to change (t.i. when new value
 *   returned from `updater()` is identical to old value).
 *
 * ```ts
 * const input: ReadonlyMap<string, number> = new Map([['x', 10], ['y', 20]]);
 *
 * update(input, 'y', (v) => v + 1);
 * // => Map(2) { 'x' => 10, 'y' => 21 }
 *
 * update(input, 'z', () => { throw new Error("Won't be called"); }) === input;
 * // => true
 * ```
 *
 * See also `set()`, `updateDefault()`, `updateDeep()`.
 *
 * @param map
 * @param key
 * @param updater
 */
function update<K, V>(
  map: ReadonlyMap<K, V>,
  key: K,
  updater: (prev: V, key: K, map: ReadonlyMap<K, V>) => V,
): ReadonlyMap<K, V> {
  if (map.has(key)) {
    const prev = map.get(key)!;
    const next = updater(prev, key, map);
    if (next !== prev) {
      return new Map(map).set(key, next);
    }
  }
  return map;
}

export default update;
