interface GetOrFunction {
  /**
   * Get a value of the given key in the map. If map has no given key a
   * `defaultValue` is returned.
   *
   * ```ts
   * const input: ReadonlyMap<string, number | undefined> = new Map([
   *   ['x', 10],
   *   ['y', undefined],
   * ]);
   *
   * getOr(input, 'x');
   * // => 10
   *
   * getOr(input, 'y', null);
   * // => undefined
   *
   * getOr(input, 'z', null);
   * // => null
   * ```
   *
   * See also `getDeep()`.
   *
   * @param map
   * @param key
   * @param defaultValue
   */
  <K, V>(map: ReadonlyMap<K, V>, key: K, defaultValue: V): V;

  /**
   * Get a value of the given key in the map. If map has no given key a
   * `defaultValue` is returned.
   *
   * ```ts
   * const input: ReadonlyMap<string, number | undefined> = new Map([
   *   ['x', 10],
   *   ['y', undefined],
   * ]);
   *
   * getOr(input, 'x');
   * // => 10
   *
   * getOr(input, 'y', null);
   * // => undefined
   *
   * getOr(input, 'z', null);
   * // => null
   * ```
   *
   * See also `getDeep()`.
   *
   * @param map
   * @param key
   * @param defaultValue
   */
  <K, V, D>(map: ReadonlyMap<K, V>, key: K, defaultValue: D): V | D;
}

function getOr(map: ReadonlyMap<any, any>, key: any, defaultValue: any) {
  return map.has(key) ? map.get(key)! : defaultValue;
}

/**
 * Get a value of the given key in the map. If map has no given key a
 * `defaultValue` is returned.
 *
 * ```ts
 * const input: ReadonlyMap<string, number | undefined> = new Map([
 *   ['x', 10],
 *   ['y', undefined],
 * ]);
 *
 * getOr(input, 'x');
 * // => 10
 *
 * getOr(input, 'y', null);
 * // => undefined
 *
 * getOr(input, 'z', null);
 * // => null
 * ```
 *
 * See also `getDeep()`.
 *
 * @param map
 * @param key
 * @param defaultValue
 */
export default getOr as GetOrFunction;
