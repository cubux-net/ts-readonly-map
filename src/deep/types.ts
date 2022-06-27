export type _ErrorDepth = readonly [
  never,
  'Too deep path. Why do you need it?',
];

// TS>=4.0:
// export type MapDeep<KS extends readonly any[], V> = KS extends [...infer KRest, infer K]
//   ? MapDeep<KRest, ReadonlyMap<K, V>>
//   : V;
/**
 * Nested maps structure with fixed depth
 */
export type MapDeep<KS extends readonly any[], V> = KS extends readonly [
  any,
  any,
  any,
  any,
  any,
  any,
]
  ? _ErrorDepth
  : KS extends readonly [infer K1, infer K2, infer K3, infer K4, infer K5]
  ? ReadonlyMap<
      K1,
      ReadonlyMap<K2, ReadonlyMap<K3, ReadonlyMap<K4, ReadonlyMap<K5, V>>>>
    >
  : KS extends readonly [infer K1, infer K2, infer K3, infer K4]
  ? ReadonlyMap<K1, ReadonlyMap<K2, ReadonlyMap<K3, ReadonlyMap<K4, V>>>>
  : KS extends readonly [infer K1, infer K2, infer K3]
  ? ReadonlyMap<K1, ReadonlyMap<K2, ReadonlyMap<K3, V>>>
  : KS extends readonly [infer K1, infer K2]
  ? ReadonlyMap<K1, ReadonlyMap<K2, V>>
  : KS extends readonly [infer K1]
  ? ReadonlyMap<K1, V>
  : V;

// export type MapDeepKeys<M> = M extends ReadonlyMap<infer K, infer V> ? [K, ...MapDeepKeys<V>] : [];

// TS>=4.0:
// export type MapDeepValue<M, KS extends readonly any[]> = KS extends readonly [
//   infer K,
//   ...(infer KRest),
// ]
//   ? M extends ReadonlyMap<K, infer V>
//     ? MapDeepValue<V, KRest>
//     : never
//   : M;
/**
 * Get value from nested maps structure at the given path
 */
export type MapDeepValue<M, KS extends readonly any[]> = KS extends readonly [
  any,
  any,
  any,
  any,
  any,
  any,
]
  ? _ErrorDepth
  : KS extends readonly [infer K1, infer K2, infer K3, infer K4, infer K5]
  ? M extends ReadonlyMap<
      K1,
      ReadonlyMap<
        K2,
        ReadonlyMap<K3, ReadonlyMap<K4, ReadonlyMap<K5, infer V>>>
      >
    >
    ? V
    : never
  : KS extends readonly [infer K1, infer K2, infer K3, infer K4]
  ? M extends ReadonlyMap<
      K1,
      ReadonlyMap<K2, ReadonlyMap<K3, ReadonlyMap<K4, infer V>>>
    >
    ? V
    : never
  : KS extends readonly [infer K1, infer K2, infer K3]
  ? M extends ReadonlyMap<K1, ReadonlyMap<K2, ReadonlyMap<K3, infer V>>>
    ? V
    : never
  : KS extends readonly [infer K1, infer K2]
  ? M extends ReadonlyMap<K1, ReadonlyMap<K2, infer V>>
    ? V
    : never
  : KS extends readonly [infer K1]
  ? M extends ReadonlyMap<K1, infer V>
    ? V
    : never
  : M;

/**
 * Base type for keys path
 */
export type KeysPathAny = readonly [any, ...any[]];
