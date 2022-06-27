import hasDeep from '../../src/deep/hasDeep';

it('check if key in path exist', () => {
  const map: ReadonlyMap<string, ReadonlyMap<number, string>> = new Map([
    [
      'x',
      new Map([
        [10, 'a'],
        [20, 'b'],
      ]),
    ],
    [
      'y',
      new Map([
        [30, 'c'],
        [40, 'd'],
      ]),
    ],
  ]);

  expect(hasDeep(map, ['x'])).toBeTruthy();
  expect(hasDeep(map, ['y'])).toBeTruthy();
  expect(hasDeep(map, ['z'])).toBeFalsy();

  expect(hasDeep(map, ['x', 20])).toBeTruthy();
  expect(hasDeep(map, ['y', 42])).toBeFalsy();
  expect(hasDeep(map, ['z', 99])).toBeFalsy();
});

it('unusual', () => {
  expect(hasDeep(new Map([['x', new Map()]]), ['x', 20, 97])).toBeFalsy();

  expect(() => hasDeep(new Map(), [] as any)).toThrow(
    new Error('Empty path should mean a logic error outside?'),
  );
});
