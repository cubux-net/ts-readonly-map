import { KeysPathAny, MapDeep } from './types';

/**
 * Returns a boolean indicating whether an element with the specified keys path
 * exists or not.
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
 * hasDeep(input, ['x', 'b']);
 * // => true
 * hasDeep(input, ['x']);
 * // => true
 * hasDeep(input, ['y', 't']);
 * // => false
 * ```
 *
 * See also `getDeep()`.
 *
 * @param map
 * @param path
 */
function hasDeep<KS extends KeysPathAny>(
  map: MapDeep<KS, any>,
  path: KS,
): boolean {
  if (!path.length) {
    throw new Error('Empty path should mean a logic error outside?');
  }

  let temp: any = map;
  for (const key of path) {
    if (!(temp instanceof Map) || !temp.has(key)) {
      return false;
    }
    temp = temp.get(key)!;
  }
  return true;
}

export default hasDeep;
