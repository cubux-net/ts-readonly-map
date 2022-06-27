import { _ErrorDepth } from './types';

type Keys<K> = K extends keyof any ? K : never;
type ToObject<K extends keyof any, V> = { [P in K]?: V };

// TS>=4.0:
// export type ObjectDeep<M> = M extends ReadonlyMap<infer K, infer V>
//   ? ToObject<K extends keyof any ? K : never, ObjectDeep<V>>
//   : M;
export type ObjectDeep<M> = M extends ReadonlyMap<
  any,
  ReadonlyMap<
    any,
    ReadonlyMap<any, ReadonlyMap<any, ReadonlyMap<any, ReadonlyMap<any, any>>>>
  >
>
  ? _ErrorDepth
  : M extends ReadonlyMap<
      infer K1,
      ReadonlyMap<
        infer K2,
        ReadonlyMap<
          infer K3,
          ReadonlyMap<infer K4, ReadonlyMap<infer K5, infer V>>
        >
      >
    >
  ? ToObject<
      Keys<K1>,
      ToObject<
        Keys<K2>,
        ToObject<Keys<K3>, ToObject<Keys<K4>, ToObject<Keys<K5>, V>>>
      >
    >
  : M extends ReadonlyMap<
      infer K1,
      ReadonlyMap<
        infer K2,
        ReadonlyMap<infer K3, ReadonlyMap<infer K4, infer V>>
      >
    >
  ? ToObject<
      Keys<K1>,
      ToObject<Keys<K2>, ToObject<Keys<K3>, ToObject<Keys<K4>, V>>>
    >
  : M extends ReadonlyMap<
      infer K1,
      ReadonlyMap<infer K2, ReadonlyMap<infer K3, infer V>>
    >
  ? ToObject<Keys<K1>, ToObject<Keys<K2>, ToObject<Keys<K3>, V>>>
  : M extends ReadonlyMap<infer K1, ReadonlyMap<infer K2, infer V>>
  ? ToObject<Keys<K1>, ToObject<Keys<K2>, V>>
  : M extends ReadonlyMap<infer K1, infer V>
  ? ToObject<Keys<K1>, V>
  : M;

// TS>=4.0:
// interface ToObjectDeepFunction {
//   <KS extends readonly (keyof any)[], M extends MapDeep<KS, any>>(
//     map: M,
//   ): ObjectDeep<M>;
// }

/**
 * Converts nested maps structure into nested objects keeping key=>value pairs.
 *
 * ```ts
 * const input: ReadonlyMap<string, ReadonlyMap<number, string>> = new Map([
 *   ['x', new Map([
 *     [10, 'a'],
 *     [20, 'b'],
 *   ])],
 *   ['y', new Map([[30, 'c']])],
 *   ['z', new Map()],
 * ]);
 *
 * toObjectDeep(map);
 * // {
 * //   x: {
 * //     10: 'a',
 * //     20: 'b',
 * //   },
 * //   y: {
 * //     30: 'c',
 * //   },
 * //   z: {},
 * // }
 * ```
 *
 * See also `reduce()`.
 *
 * @param map
 */
function toObjectDeep<M extends ReadonlyMap<any, any>>(map: M): ObjectDeep<M> {
  const result: Record<any, any> = {};
  for (let [key, value] of Array.from(map)) {
    result[key] = value instanceof Map ? toObjectDeep(value) : value;
  }
  return result as any;
}

export default toObjectDeep /*as ToObjectDeepFunction*/;
