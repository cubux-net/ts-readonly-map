/**
 * Creates a map from simple array of items, calculating corresponding key for
 * every item with the given callback `calcKey()`.
 *
 * ```ts
 * fromArray([1, 2, 3], (v) => v * 10)
 * // => Map(3) { 10 => 1, 20 => 2, 30 => 3 }
 * ```
 *
 * This is a shortcut for commonly used operation:
 *
 * ```js
 * new Map(array.map(v => [calcKey(v), v]))
 * ```
 *
 * @param array
 * @param calcKey
 */
function fromArray<T, K>(
  array: readonly T[],
  calcKey: (item: T) => K,
): ReadonlyMap<K, T> {
  return new Map(array.map((item) => [calcKey(item), item]));
}

export default fromArray;
