import set from '../set';
import { KeysPathAny, MapDeep, MapDeepValue } from './types';

function setDeepInner<T extends ReadonlyMap<any, any>>(
  map: T,
  path: readonly any[],
  value: any,
): T {
  const key = path[0];
  if (path.length === 1) {
    return set(map, key, value) as T;
  }

  let child;
  let existed = false;
  if (map.has(key)) {
    child = map.get(key);
    if (child instanceof Map) {
      existed = true;
    } else {
      child = new Map();
    }
  } else {
    child = new Map();
  }

  const nextChild = setDeepInner(child, path.slice(1), value);
  if (existed && nextChild === child) {
    return map;
  }

  return new Map(map).set(key, nextChild) as ReadonlyMap<any, any> as T;
}

/**
 * Creates new nested maps structure from `input` by assigning the given `value`
 * to a single element with the given keys `path`.
 *
 * - Will return input `map` when element with the given path already exists and
 *   is identical to the given `value` already.
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
 * setDeep(input, ['x', 'b'], 42);
 * // => Map(1) {
 * //      'x' => Map(2) { 'a' => 10, 'b' => 42 },
 * //    }
 *
 * setDeep(input, ['y'], new Map([['c' => 42]]));
 * // => Map(2) {
 * //      'x' => Map(2) { 'a' => 10, 'b' => 20 },
 * //      'y' => Map(2) { 'c' => 42 },
 * //    }
 *
 * setDeep(input, ['x', 'b'], 20) === input;
 * // => true
 * ```
 *
 * See also `set()`, `updateDeep()`, `updateDefaultDeep()`.
 *
 * @param map
 * @param path
 * @param value
 */
function setDeep<KS extends KeysPathAny, M extends MapDeep<KS, any>>(
  map: M,
  path: KS,
  value: MapDeepValue<M, KS>,
): MapDeep<KS, MapDeepValue<M, KS>> {
  if (path.length === 0) {
    throw new Error('Empty path should mean some logic mistake outside?');
  }
  return setDeepInner(map, path, value);
}

export default setDeep;
