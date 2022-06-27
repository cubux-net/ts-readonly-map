import findKey from '../src/findKey';

it('works as [].findIndex', () => {
  const map = new Map([
    ['x', 42],
    ['y', 37],
    ['z', 23],
  ]);

  const isOdd = jest.fn((n: number) => n % 2 > 0);
  expect(findKey(map, isOdd)).toBe('y');
  expect(isOdd).toHaveBeenCalledTimes(2);
  expect(isOdd).toHaveBeenCalledWith(42, 'x', map);
  expect(isOdd).toHaveBeenCalledWith(37, 'y', map);

  const isBad = jest.fn((n: number) => n < 10);
  expect(findKey(map, isBad)).toBeUndefined();
});
