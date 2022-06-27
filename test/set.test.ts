import set from '../src/set';

it('does not change original map', () => {
  const orig = new Map([
    [42, 'x'],
    [37, 'y'],
  ]);
  const prev = new Map(orig);

  const next1 = set(prev, 23, 'z');
  expect(prev).toEqual(orig);
  expect(next1.size).toBe(3);
  expect(next1.has(42)).toBe(true);
  expect(next1.get(42)).toBe('x');
  expect(next1.has(37)).toBe(true);
  expect(next1.get(37)).toBe('y');
  expect(next1.has(23)).toBe(true);
  expect(next1.get(23)).toBe('z');

  const next2 = set(prev, 42, 'z');
  expect(prev).toEqual(orig);
  expect(next2.size).toBe(2);
  expect(next2.has(42)).toBe(true);
  expect(next2.get(42)).toBe('z');
  expect(next2.has(37)).toBe(true);
  expect(next2.get(37)).toBe('y');
});

it("does nothing when it's nothing to change", () => {
  const orig = new Map([
    [42, 'x'],
    [37, 'y'],
  ]);
  const prev = new Map(orig);

  const next1 = set(prev, 42, 'x');
  const next2 = set(prev, 37, 'y');
  expect(prev).toEqual(orig);
  expect(next1).toBe(prev);
  expect(next2).toBe(prev);
});
