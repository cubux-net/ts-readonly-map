import { KeysPathAny, MapDeep, MapDeepValue } from './types';
import getDeep from './getDeep';
import setDeep from './setDeep';

const NOT_FOUND = Symbol();

/**
 * Creates new nested maps structure from input `map` by updating value in the
 * given keys path with the given callback `updater()`.
 *
 * - Will do nothing and return input `map` if element in the given path does
 *   not exist. See else `updateDefaultDeep()` as opposite for this case.
 * - Will return input `map` when nothing to change (t.i. when new value
 *   returned from `updater()` is identical to old value).
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
 * updateDeep(input, ['x', 'b'], (v) => v + 1);
 * // => Map(1) {
 * //      'x' => Map(2) { 'a' => 10, 'b' => 21 },
 * //    }
 *
 * updateDeep(input, ['y'], () => { throw new Error("Won't be called") }) === input;
 * // => true
 *
 * updateDeep(input, ['x', 'b'], (v) => v) === input;
 * // => true
 * ```
 *
 * See also `update()`, `updateDefaultDeep()`, `setDeep()`.
 *
 * @param map
 * @param path
 * @param updater
 */
function updateDeep<KS extends KeysPathAny, M extends MapDeep<KS, any>>(
  map: M,
  path: KS,
  updater: (value: MapDeepValue<M, KS>) => MapDeepValue<M, KS>,
): MapDeep<KS, MapDeepValue<M, KS>> {
  const prev = getDeep(map, path, NOT_FOUND);
  if (prev !== NOT_FOUND) {
    const next = updater(prev);
    if (next !== prev) {
      return setDeep(map, path, next);
    }
  }
  return map;
}

export default updateDeep;
