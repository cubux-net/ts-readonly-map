/**
 * Executes a provided reducer function on each element of the map, resulting
 * in a single output value. Works similar to `Array.prototype.reduce()`.
 *
 * ```ts
 * const input: ReadonlyMap<string, number> = new Map([['x', 10], ['y', 20]]);
 *
 * reduce(input, (s, v) => s + v, 0);
 * // => 30
 *
 * reduce(input, (m, v, k) => m.set(v, k), new Map<number, string>())
 * // => Map(2) { 10 => 'x', 20 => 'y' }
 * ```
 *
 * See also `map()`.
 *
 * @param map
 * @param reducer
 * @param initial
 */
function reduce<K, V, U>(
  map: ReadonlyMap<K, V>,
  reducer: (prev: U, value: V, key: K, map: ReadonlyMap<K, V>) => U,
  initial: U,
): U {
  let result: U = initial;
  for (let [key, value] of Array.from(map)) {
    result = reducer(result, value, key, map);
  }
  return result;
}

export default reduce;
