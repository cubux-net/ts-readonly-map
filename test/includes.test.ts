import includes from '../src/includes';

it('works as [].includes', () => {
  const map = new Map([
    ['x', 42],
    ['y', 37],
    ['z', 23],
  ]);

  expect(includes(map, 42)).toBe(true);
  expect(includes(map, 37)).toBe(true);
  expect(includes(map, 23)).toBe(true);

  expect(includes(map, 19)).toBe(false);
  expect(includes<string, number | string>(map, '42')).toBe(false);
});
