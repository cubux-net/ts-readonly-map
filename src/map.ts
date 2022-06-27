/**
 * Creates a new map populated with the results of calling a provided function
 * on every element in the calling map as values with respective keys from input
 * map. Works similar to `Array.prototype.map()`.
 *
 * - Will return input `map` when nothing to change (t.i. input `map` is empty
 *   or every new value is identical to respective old value).
 *
 * ```ts
 * const input: ReadonlyMap<string, number> = new Map([['x', 10], ['y', 20]]);
 *
 * map(input, (v) => v + 1);
 * // => Map(2) { 'x' => 11, 'y' => 21 }
 *
 * map(input, (v, k) => ({[k]: v}));
 * // => Map(2) { 'x' => { x: 10 }, 'y' => { y: 20 } }
 * ```
 *
 * See also `reduce()`.
 *
 * @param map
 * @param callback
 */
function map<K, V, U = V>(
  map: ReadonlyMap<K, V>,
  callback: (value: V, key: K, map: ReadonlyMap<K, V>) => U,
): ReadonlyMap<K, U> {
  if (!map.size) {
    return map as ReadonlyMap<K, any>;
  }

  let next: Map<K, V> | undefined;
  for (let [key, value] of Array.from(map)) {
    const nextValue: any = callback(value, key, map);
    if (nextValue !== value) {
      (next || (next = new Map(map))).set(key, nextValue);
    }
  }
  return next || (map as any);
}

export default map;
