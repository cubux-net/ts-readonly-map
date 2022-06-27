import removeDeep from '../../src/deep/removeDeep';

type V = 'a' | 'b' | 'c' | 'd';

const origA: ReadonlyMap<number, V> = new Map([
  [10, 'a' as V],
  [20, 'b' as V],
]);
const origB: ReadonlyMap<number, V> = new Map([[30, 'c' as V]]);
const orig: ReadonlyMap<string, ReadonlyMap<number, V>> = new Map([
  ['x', origA],
  ['y', origB],
]);

it('does not change orig', () => {
  const map: ReadonlyMap<string, ReadonlyMap<number, V>> = new Map([
    ['x', new Map(origA)],
    ['y', new Map(origB)],
  ]);

  const next1 = removeDeep(map, ['x']);
  expect(next1).toEqual(new Map([['y', new Map([[30, 'c']])]]));

  const next2 = removeDeep(map, ['x', 10]);
  expect(next2).toEqual(
    new Map([
      ['x', new Map([[20, 'b']])],
      ['y', new Map([[30, 'c']])],
    ]),
  );

  const next21 = removeDeep(next2, ['y', 30]);
  expect(next21).toEqual(new Map([['x', new Map([[20, 'b']])]]));

  expect(map).toEqual(orig);
});

it('unusual', () => {
  expect(() => removeDeep(new Map(), [] as any)).toThrow(
    new Error('Empty path should to mean a logic error outside?'),
  );

  const map = new Map([
    [10, origA],
    [20, 'something wrong' as never],
  ]);
  expect(removeDeep(map, [20, 42])).toEqual(new Map([[10, origA]]));
});

it("does nothing when it's nothing to change", () => {
  const map: ReadonlyMap<string, ReadonlyMap<number, V>> = new Map([
    ['x', new Map(origA)],
    ['y', new Map(origB)],
  ]);

  const next1 = removeDeep(map, ['x', 50]);
  const next2 = removeDeep(next1, ['y', 90]);
  const next3 = removeDeep(next2, ['z']);
  expect(next1).toBe(map);
  expect(next2).toBe(map);
  expect(next3).toBe(map);

  expect(removeDeep(map, ['z', 10])).toBe(map);

  expect(map).toEqual(orig);
});
