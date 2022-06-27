import every from '../src/every';

it('works as [].every', () => {
  const map = new Map([
    ['x', 42],
    ['y', 37],
    ['z', 24],
  ]);

  const isEven = jest.fn((n: number) => n % 2 === 0);
  expect(every(map, isEven)).toBe(false);
  expect(isEven).toHaveBeenCalledTimes(2);
  expect(isEven).toHaveBeenCalledWith(42, 'x', map);
  expect(isEven).toHaveBeenCalledWith(37, 'y', map);

  const isOK = jest.fn((n: number) => n > 10);
  expect(every(map, isOK)).toBe(true);
  expect(isOK).toHaveBeenCalledTimes(3);
  expect(isOK).toHaveBeenCalledWith(42, 'x', map);
  expect(isOK).toHaveBeenCalledWith(37, 'y', map);
  expect(isOK).toHaveBeenCalledWith(24, 'z', map);

  const noop = jest.fn();
  expect(every(new Map(), noop)).toBe(true);
  expect(noop).not.toHaveBeenCalled();
});
