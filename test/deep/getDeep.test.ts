import getDeep from '../../src/deep/getDeep';

type V = 'a' | 'b' | 'c' | 'd';

it('gets value by path', () => {
  const map: ReadonlyMap<string, ReadonlyMap<number, V>> = new Map([
    [
      'x',
      new Map([
        [10, 'a' as V],
        [20, 'b' as V],
      ]),
    ],
    [
      'y',
      new Map([
        [30, 'c' as V],
        [40, 'd' as V],
      ]),
    ],
  ]);

  expect(getDeep(map, ['x', 20])).toBe('b');
  expect(getDeep(map, ['x', 20], null)).toBe('b');
  expect(getDeep(map, ['x', 20], 'd')).toBe('b');
  expect(getDeep(map, ['y', 42])).toBe(undefined);
  expect(getDeep(map, ['y', 42], null)).toBe(null);
  expect(getDeep(map, ['z', 99])).toBe(undefined);
  expect(getDeep(map, ['z', 99], null)).toBe(null);

  expect(getDeep(map, ['x'])).toBe(map.get('x'));
  expect(getDeep(map, ['x'], null)).toBe(map.get('x'));
  expect(getDeep(map, ['z'])).toBe(undefined);
  expect(getDeep(map, ['z'], null)).toBe(null);
});

it('empty path is an error', () => {
  expect(() => getDeep(new Map(), [] as any, null)).toThrow(
    new Error('Empty path should mean a logic error outside?'),
  );
});
