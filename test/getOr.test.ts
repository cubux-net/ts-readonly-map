import getOr from '../src/getOr';

it('works', () => {
  const map = new Map([
    ['x', 42],
    ['y', 37],
  ]);

  expect(getOr(map, 'x', null)).toBe(42);
  expect(getOr(map, 'y', 0)).toBe(37);
  expect(getOr(map, 'a', null)).toBe(null);
  expect(getOr(map, 'b', 0)).toBe(0);
});
