import remove from '../src/remove';

it('does not change original map', () => {
  const orig = new Map([
    [42, 'x'],
    [37, 'y'],
  ]);
  const prev = new Map(orig);

  const next1 = remove(prev, 42);
  expect(prev).toEqual(orig);
  expect(next1.size).toBe(1);
  expect(next1.has(37)).toBe(true);
  expect(next1.get(37)).toBe('y');
});

it("does nothing when it's nothing to change", () => {
  const orig = new Map([
    [42, 'x'],
    [37, 'y'],
  ]);
  const prev = new Map(orig);

  const next1 = remove(prev, 23);
  expect(prev).toEqual(orig);
  expect(next1).toBe(prev);
});
