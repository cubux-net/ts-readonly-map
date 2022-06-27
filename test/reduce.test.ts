import reduce from '../src/reduce';

it('works as [].reduce', () => {
  const map = new Map([
    ['x', 42],
    ['y', 37],
    ['z', 23],
  ]);

  const reducer = jest.fn((a: number[], n: number) => [...a, n]);

  expect(reduce(map, reducer, [])).toEqual([42, 37, 23]);
  expect(reducer).toHaveBeenCalledTimes(3);
  expect(reducer).toHaveBeenCalledWith([], 42, 'x', map);
  expect(reducer).toHaveBeenCalledWith([42], 37, 'y', map);
  expect(reducer).toHaveBeenCalledWith([42, 37], 23, 'z', map);
});
