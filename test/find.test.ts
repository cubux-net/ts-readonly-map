import find from '../src/find';

it('works as [].find', () => {
  const map = new Map([
    ['x', 42],
    ['y', 37],
    ['z', 23],
  ]);

  const isOdd = jest.fn((n: number) => n % 2 > 0);
  expect(find(map, isOdd)).toBe(37);
  expect(isOdd).toHaveBeenCalledTimes(2);
  expect(isOdd).toHaveBeenCalledWith(42, 'x', map);
  expect(isOdd).toHaveBeenCalledWith(37, 'y', map);

  const isBad = jest.fn((n: number) => n < 10);
  expect(find(map, isBad)).toBeUndefined();
});
