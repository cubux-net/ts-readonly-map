import toObjectDeep from '../../src/deep/toObjectDeep';

it('converts nested maps to plain object', () => {
  const map = new Map([
    [
      'x',
      new Map([
        [10, 'a'],
        [20, 'b'],
      ]),
    ],
    ['y', new Map([[30, 'c']])],
    ['z', new Map<number, string>()],
  ]);

  expect(toObjectDeep(map)).toEqual({
    x: {
      10: 'a',
      20: 'b',
    },
    y: {
      30: 'c',
    },
    z: {},
  });
});
