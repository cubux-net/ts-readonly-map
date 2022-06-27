import { KeysPathAny, MapDeep, MapDeepValue } from './types';

interface GetDeepFunction {
  /**
   * Returns a value from the given nested maps structure referenced with given
   * keys path. If map has no final element in the given path a `defaultValue` is
   * returned.
   *
   * - An empty path `[]` cause an error since function was designed for nested
   *   maps with fixed depth.
   *
   * ```ts
   * const input: ReadonlyMap<string, ReadonlyMap<string, number>> = new Map([
   *   ['x', new Map([
   *     ['a', 10],
   *     ['b', 20],
   *   ])],
   *   ['y', new Map()],
   * ]);
   *
   * getDeep(input, ['x', 'b']);
   * // => 20
   *
   * getDeep(input, ['x']);
   * // => Map(2) { 'a' => 10, 'b' => 20 }
   *
   * getDeep(input, ['y', 't']);
   * // => undefined
   * getDeep(input, ['y', 't'], null);
   * // => null
   * ```
   *
   * See also `getOr()`, `hasDeep()`.
   *
   * @param map
   * @param path
   * @param defaultValue
   */
  <KS extends KeysPathAny, M extends MapDeep<KS, any>>(
    map: M,
    path: KS,
    defaultValue: MapDeepValue<M, KS>,
  ): MapDeepValue<M, KS>;

  /**
   * Returns a value from the given nested maps structure referenced with given
   * keys path. If map has no final element in the given path a `defaultValue` is
   * returned.
   *
   * - An empty path `[]` cause an error since function was designed for nested
   *   maps with fixed depth.
   *
   * ```ts
   * const input: ReadonlyMap<string, ReadonlyMap<string, number>> = new Map([
   *   ['x', new Map([
   *     ['a', 10],
   *     ['b', 20],
   *   ])],
   *   ['y', new Map()],
   * ]);
   *
   * getDeep(input, ['x', 'b']);
   * // => 20
   *
   * getDeep(input, ['x']);
   * // => Map(2) { 'a' => 10, 'b' => 20 }
   *
   * getDeep(input, ['y', 't']);
   * // => undefined
   * getDeep(input, ['y', 't'], null);
   * // => null
   * ```
   *
   * See also `getOr()`, `hasDeep()`.
   *
   * @param map
   * @param path
   * @param defaultValue
   */
  <KS extends KeysPathAny, M extends MapDeep<KS, any>, D>(
    map: M,
    path: KS,
    defaultValue: D,
  ): MapDeepValue<M, KS> | D;

  /**
   * Returns a value from the given nested maps structure referenced with given
   * keys path. If map has no final element in the given path a `defaultValue` is
   * returned.
   *
   * - An empty path `[]` cause an error since function was designed for nested
   *   maps with fixed depth.
   *
   * ```ts
   * const input: ReadonlyMap<string, ReadonlyMap<string, number>> = new Map([
   *   ['x', new Map([
   *     ['a', 10],
   *     ['b', 20],
   *   ])],
   *   ['y', new Map()],
   * ]);
   *
   * getDeep(input, ['x', 'b']);
   * // => 20
   *
   * getDeep(input, ['x']);
   * // => Map(2) { 'a' => 10, 'b' => 20 }
   *
   * getDeep(input, ['y', 't']);
   * // => undefined
   * getDeep(input, ['y', 't'], null);
   * // => null
   * ```
   *
   * See also `getOr()`, `hasDeep()`.
   *
   * @param map
   * @param path
   * @param defaultValue
   */
  <KS extends KeysPathAny, M extends MapDeep<KS, any>>(map: M, path: KS):
    | MapDeepValue<M, KS>
    | undefined;
}

function getDeep(map: ReadonlyMap<any, any>, path: any[], defaultValue?: any) {
  if (!path.length) {
    throw new Error('Empty path should mean a logic error outside?');
  }
  let result: any = map;
  for (let key of path) {
    if (result instanceof Map && result.has(key)) {
      result = result.get(key)!;
    } else {
      return defaultValue;
    }
  }
  return result;
}

/**
 * Returns a value from the given nested maps structure referenced with given
 * keys path. If map has no final element in the given path a `defaultValue` is
 * returned.
 *
 * - An empty path `[]` cause an error since function was designed for nested
 *   maps with fixed depth.
 *
 * ```ts
 * const input: ReadonlyMap<string, ReadonlyMap<string, number>> = new Map([
 *   ['x', new Map([
 *     ['a', 10],
 *     ['b', 20],
 *   ])],
 *   ['y', new Map()],
 * ]);
 *
 * getDeep(input, ['x', 'b']);
 * // => 20
 *
 * getDeep(input, ['x']);
 * // => Map(2) { 'a' => 10, 'b' => 20 }
 *
 * getDeep(input, ['y', 't']);
 * // => undefined
 * getDeep(input, ['y', 't'], null);
 * // => null
 * ```
 *
 * See also `getOr()`, `hasDeep()`.
 *
 * @param map
 * @param path
 * @param defaultValue
 */
export default getDeep as GetDeepFunction;
