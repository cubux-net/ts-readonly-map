import merge from '../src/merge';

it('merges to maps', () => {
  const a = new Map([
    ['x', 42],
    ['y', 37],
  ]);
  const b = new Map([
    ['z', 23],
    ['y', 19],
  ]);

  expect(merge(a, b)).toEqual(
    new Map([
      ['x', 42],
      ['y', 19],
      ['z', 23],
    ]),
  );
  expect(merge(a, b, new Map([['t', 97]]))).toEqual(
    new Map([
      ['x', 42],
      ['y', 19],
      ['z', 23],
      ['t', 97],
    ]),
  );
});

it("does nothing when it's nothing to change", () => {
  const a = new Map([
    ['x', 42],
    ['y', 37],
  ]);
  const b = new Map([['y', 37]]);
  const c = new Map();

  expect(merge(a, b)).toBe(a);
  expect(merge(a, c)).toBe(a);

  expect(merge(c, a)).toBe(a);
  expect(merge(c, a, c)).toBe(a);
});
