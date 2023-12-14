import set from './set';

/**
 * Creates new map from input `map` by updating value in the given `key` with
 * the given callback `updater()`. The given `defaultValue` will be used as
 * "old" value for the callback when then given `key` doesn't exist in the given
 * `map`.
 *
 * - Will always call `updater()` callback. See else `update()` as opposite for
 *   this case.
 * - Will return input `map` when nothing to change (t.i. when new value
 *   returned from `updater()` is identical to old value wherever it came from -
 *   existing value of `key` or `defaultValue`).
 *
 * ```ts
 * const input: ReadonlyMap<string, number> = new Map([['x', 10], ['y', 20]]);
 *
 * updateDefault(input, 'y', 30, (v) => v + 1);
 * // => Map(2) { 'x' => 10, 'y' => 21 }
 *
 * updateDefault(input, 'z', 30, (v) => v + 1);
 * // => Map(3) { 'x' => 10, 'y' => 20, 'z' => 31 }
 *
 * updateDefault(input, 'z', 0, (v) => v) === input;
 * // => true
 * ```
 *
 * See also `set()`, `update()`, `updateDefaultDeep()`.
 *
 * @param map
 * @param key
 * @param defaultValue
 * @param updater
 */
function updateDefault<K, V, D = never>(
  map: ReadonlyMap<K, V>,
  key: K,
  defaultValue: V | D,
  updater: (prev: V | D, key: K, map: ReadonlyMap<K, V>) => V,
): ReadonlyMap<K, V> {
  return set(
    map,
    key,
    updater(map.has(key) ? map.get(key)! : defaultValue, key, map),
  );
}

export default updateDefault;
