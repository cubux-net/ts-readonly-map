import { KeysPathAny, MapDeep, MapDeepValue } from './types';
import getDeep from './getDeep';
import setDeep from './setDeep';

interface UpdateDefaultDeepFunction {
  /**
   * Creates new nested maps structure from input `map` by updating value in the
   * given keys path with the given callback `updater()`.
   *
   * - Will always call `updater()` callback. See else `updateDeep()` as opposite
   *   for this case.
   * - Will return input `map` when nothing to change (t.i. when new value
   *   returned from `updater()` is identical to old value wherever it came from -
   *   existing value of `key` or `defaultValue`).
   * - An empty path `[]` cause an error since function was designed for nested
   *   maps with fixed depth.
   *
   * ```ts
   * const input: ReadonlyMap<string, ReadonlyMap<string, number>> = new Map([
   *   ['x', new Map([
   *     ['a', 10],
   *     ['b', 20],
   *   ])],
   * ]);
   *
   * updateDefaultDeep(input, ['x', 'b'], 30, (v) => v + 1);
   * // => Map(1) {
   * //      'x' => Map(2) { 'a' => 10, 'b' => 21 },
   * //    }
   *
   * updateDefaultDeep(input, ['y', 'c'], 30, (v) => v + 1);
   * // => Map(2) {
   * //      'x' => Map(2) { 'a' => 10, 'b' => 20 },
   * //      'y' => Map(2) { 'c' => 31 },
   * //    }
   *
   * updateDefaultDeep(input, ['x', 'b'], 0, (v) => v) === input;
   * // => true
   * updateDefaultDeep(input, ['y', 'c'], 0, (v) => v) === input;
   * // => true
   * ```
   *
   * See also `updateDefault()`, `updateDeep()`, `setDeep()`.
   *
   * @param map
   * @param path
   * @param defaultValue
   * @param updater
   */
  <KS extends KeysPathAny, M extends MapDeep<KS, any>>(
    map: M,
    path: KS,
    defaultValue: MapDeepValue<M, KS>,
    updater: (value: MapDeepValue<M, KS>) => MapDeepValue<M, KS>,
  ): MapDeep<KS, MapDeepValue<M, KS>>;

  /**
   * Creates new nested maps structure from input `map` by updating value in the
   * given keys path with the given callback `updater()`.
   *
   * - Will always call `updater()` callback. See else `updateDeep()` as opposite
   *   for this case.
   * - Will return input `map` when nothing to change (t.i. when new value
   *   returned from `updater()` is identical to old value wherever it came from -
   *   existing value of `key` or `defaultValue`).
   * - An empty path `[]` cause an error since function was designed for nested
   *   maps with fixed depth.
   *
   * ```ts
   * const input: ReadonlyMap<string, ReadonlyMap<string, number>> = new Map([
   *   ['x', new Map([
   *     ['a', 10],
   *     ['b', 20],
   *   ])],
   * ]);
   *
   * updateDefaultDeep(input, ['x', 'b'], 30, (v) => v + 1);
   * // => Map(1) {
   * //      'x' => Map(2) { 'a' => 10, 'b' => 21 },
   * //    }
   *
   * updateDefaultDeep(input, ['y', 'c'], 30, (v) => v + 1);
   * // => Map(2) {
   * //      'x' => Map(2) { 'a' => 10, 'b' => 20 },
   * //      'y' => Map(2) { 'c' => 31 },
   * //    }
   *
   * updateDefaultDeep(input, ['x', 'b'], 0, (v) => v) === input;
   * // => true
   * updateDefaultDeep(input, ['y', 'c'], 0, (v) => v) === input;
   * // => true
   * ```
   *
   * See also `updateDefault()`, `updateDeep()`, `setDeep()`.
   *
   * @param map
   * @param path
   * @param defaultValue
   * @param updater
   */
  <KS extends KeysPathAny, M extends MapDeep<KS, any>, D>(
    map: M,
    path: KS,
    defaultValue: D,
    updater: (value: MapDeepValue<M, KS> | D) => MapDeepValue<M, KS>,
  ): MapDeep<KS, MapDeepValue<M, KS>>;

  /**
   * Creates new nested maps structure from input `map` by updating value in the
   * given keys path with the given callback `updater()`.
   *
   * - Will always call `updater()` callback. See else `updateDeep()` as opposite
   *   for this case.
   * - Will return input `map` when nothing to change (t.i. when new value
   *   returned from `updater()` is identical to old value wherever it came from -
   *   existing value of `key` or `defaultValue`).
   * - An empty path `[]` cause an error since function was designed for nested
   *   maps with fixed depth.
   *
   * ```ts
   * const input: ReadonlyMap<string, ReadonlyMap<string, number>> = new Map([
   *   ['x', new Map([
   *     ['a', 10],
   *     ['b', 20],
   *   ])],
   * ]);
   *
   * updateDefaultDeep(input, ['x', 'b'], 30, (v) => v + 1);
   * // => Map(1) {
   * //      'x' => Map(2) { 'a' => 10, 'b' => 21 },
   * //    }
   *
   * updateDefaultDeep(input, ['y', 'c'], 30, (v) => v + 1);
   * // => Map(2) {
   * //      'x' => Map(2) { 'a' => 10, 'b' => 20 },
   * //      'y' => Map(2) { 'c' => 31 },
   * //    }
   *
   * updateDefaultDeep(input, ['x', 'b'], 0, (v) => v) === input;
   * // => true
   * updateDefaultDeep(input, ['y', 'c'], 0, (v) => v) === input;
   * // => true
   * ```
   *
   * See also `updateDefault()`, `updateDeep()`, `setDeep()`.
   *
   * @param map
   * @param path
   * @param defaultValue
   * @param updater
   */
  <KS extends KeysPathAny, M extends MapDeep<KS, any>, D>(
    map: M,
    path: KS,
    defaultValue: D,
    updater: (value: MapDeepValue<M, KS> | D) => MapDeepValue<M, KS> | D,
  ): MapDeep<KS, MapDeepValue<M, KS> | D>;
}

function updateDefaultDeep<KS extends KeysPathAny, M extends MapDeep<KS, any>>(
  map: M,
  path: KS,
  defaultValue: MapDeepValue<M, KS>,
  updater: (value: MapDeepValue<M, KS>) => MapDeepValue<M, KS>,
): MapDeep<KS, MapDeepValue<M, KS>> {
  const prev = getDeep(map, path, defaultValue);
  const next = updater(prev);
  if (next === prev) {
    return map;
  }
  return setDeep(map, path, next);
}

/**
 * Creates new nested maps structure from input `map` by updating value in the
 * given keys path with the given callback `updater()`.
 *
 * - Will always call `updater()` callback. See else `updateDeep()` as opposite
 *   for this case.
 * - Will return input `map` when nothing to change (t.i. when new value
 *   returned from `updater()` is identical to old value wherever it came from -
 *   existing value of `key` or `defaultValue`).
 * - An empty path `[]` cause an error since function was designed for nested
 *   maps with fixed depth.
 *
 * ```ts
 * const input: ReadonlyMap<string, ReadonlyMap<string, number>> = new Map([
 *   ['x', new Map([
 *     ['a', 10],
 *     ['b', 20],
 *   ])],
 * ]);
 *
 * updateDefaultDeep(input, ['x', 'b'], 30, (v) => v + 1);
 * // => Map(1) {
 * //      'x' => Map(2) { 'a' => 10, 'b' => 21 },
 * //    }
 *
 * updateDefaultDeep(input, ['y', 'c'], 30, (v) => v + 1);
 * // => Map(2) {
 * //      'x' => Map(2) { 'a' => 10, 'b' => 20 },
 * //      'y' => Map(2) { 'c' => 31 },
 * //    }
 *
 * updateDefaultDeep(input, ['x', 'b'], 0, (v) => v) === input;
 * // => true
 * updateDefaultDeep(input, ['y', 'c'], 0, (v) => v) === input;
 * // => true
 * ```
 *
 * See also `updateDefault()`, `updateDeep()`, `setDeep()`.
 *
 * @param map
 * @param path
 * @param defaultValue
 * @param updater
 */
export default updateDefaultDeep as UpdateDefaultDeepFunction;
