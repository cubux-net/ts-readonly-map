import some from '../src/some';

it('works as [].some', () => {
  const map = new Map([
    ['x', 42],
    ['y', 37],
    ['z', 24],
  ]);

  const isOdd = jest.fn((n: number) => n % 2 > 0);
  expect(some(map, isOdd)).toBe(true);
  expect(isOdd).toHaveBeenCalledTimes(2);
  expect(isOdd).toHaveBeenCalledWith(42, 'x', map);
  expect(isOdd).toHaveBeenCalledWith(37, 'y', map);

  const isBad = jest.fn((n: number) => n < 10);
  expect(some(map, isBad)).toBe(false);
  expect(isBad).toHaveBeenCalledTimes(3);
  expect(isBad).toHaveBeenCalledWith(42, 'x', map);
  expect(isBad).toHaveBeenCalledWith(37, 'y', map);
  expect(isBad).toHaveBeenCalledWith(24, 'z', map);

  const noop = jest.fn();
  expect(some(new Map(), noop)).toBe(false);
  expect(noop).not.toHaveBeenCalled();
});
