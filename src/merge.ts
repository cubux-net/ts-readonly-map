import set from './set';

/**
 * Merge multiple maps into new map. Every key in the returned map will have the
 * latest value from all occurrences of the key.
 *
 * - May return input map when nothing to change.
 *
 * ```ts
 * const input: ReadonlyMap<string, number> = new Map([['x', 10], ['y', 20]]);
 *
 * merge(input, new Map([['z', 30], ['y', 42]]));
 * // => Map(3) { 'x' => 10, 'y' => 42, 'z' => 30 }
 *
 * merge(input, new Map([['y', 20]])) === input;
 * // => true
 *
 * merge(new Map(), input, new Map()) === input;
 * // => true
 * ```
 *
 * See also `map()`, `set()`.
 *
 * @param a
 * @param b
 */
function merge<K, V>(
  a: ReadonlyMap<K, V>,
  ...b: ReadonlyMap<K, V>[]
): ReadonlyMap<K, V> {
  return b.reduce(
    (a, b) =>
      b.size
        ? a.size
          ? Array.from(b).reduce((m, [k, v]) => set(m, k, v), a)
          : b
        : a,
    a,
  );
}

export default merge;
