import { KeysPathAny, MapDeep, MapDeepValue } from './types';

function removeDeepInner(
  map: ReadonlyMap<any, any>,
  path: readonly any[],
): ReadonlyMap<any, any> {
  const key = path[0];
  if (!map.has(key)) {
    return map;
  }
  const child = map.get(key)!;
  if (path.length === 1 || !(child instanceof Map)) {
    const next = new Map(map);
    next.delete(key);
    return next;
  }
  const nextChild = removeDeepInner(child, path.slice(1));
  if (nextChild === child) {
    return map;
  }
  const next = new Map(map);
  if (nextChild.size) {
    next.set(key, nextChild);
  } else {
    next.delete(key);
  }
  return next;
}

/**
 * Creates new nested maps structure from `input` by removing a single element
 * with the given keys `path`.
 *
 * - Will return input `map` when element with the given path doesn't exist.
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
 * removeDeep(input, ['x', 'b']);
 * // => Map(2) {
 * //      'x' => Map(2) { 'a' => 10 },
 * //      'y' => Map(0) {},
 * //    }
 * ```
 *
 * See also `remove()`, `hasDeep()`, `setDeep()`.
 *
 * @param map
 * @param path
 */
function removeDeep<KS extends KeysPathAny, M extends MapDeep<KS, any>>(
  map: M,
  path: KS,
): MapDeep<KS, MapDeepValue<M, KS>> {
  if (path.length === 0) {
    throw new Error('Empty path should to mean a logic error outside?');
  }
  return removeDeepInner(map, path) as any;
}

export default removeDeep;
