import map from '../src/map';

it('works as [].map', () => {
  const prev = new Map([
    ['x', 42],
    ['y', 37],
    ['z', 23],
  ]);

  const isOdd = jest.fn((n: number) => n % 2 > 0);

  expect(map(prev, isOdd)).toEqual(
    new Map([
      ['x', false],
      ['y', true],
      ['z', true],
    ]),
  );
  expect(isOdd).toHaveBeenCalledTimes(3);
  expect(isOdd).toHaveBeenCalledWith(42, 'x', prev);
  expect(isOdd).toHaveBeenCalledWith(37, 'y', prev);
  expect(isOdd).toHaveBeenCalledWith(23, 'z', prev);
});

it('does nothing when nothing changed', () => {
  const prev = new Map([
    ['x', 42],
    ['y', 37],
    ['z', 23],
  ]);

  const keep = jest.fn((n: number) => n);
  expect(map(prev, keep)).toBe(prev);
  expect(keep).toHaveBeenCalledTimes(3);
});

it('does nothing with empty map', () => {
  const prev = new Map<string, number>();

  const whatever = jest.fn((n: number) => n + 1);
  expect(map(prev, whatever)).toBe(prev);
  expect(whatever).not.toHaveBeenCalled();
});
