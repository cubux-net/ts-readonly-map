import update from '../src/update';

it('does not change original map', () => {
  const orig = new Map([
    [42, 'x'],
    [37, 'y'],
  ]);
  const prev = new Map(orig);

  const updater = jest.fn((s: string) => s + '*');

  const next1 = update(prev, 42, updater);
  expect(updater).toHaveBeenCalledTimes(1);
  expect(updater).toHaveBeenCalledWith('x', 42, prev);
  expect(prev).toEqual(orig);
  expect(next1.size).toBe(2);
  expect(next1.has(42)).toBe(true);
  expect(next1.get(42)).toBe('x*');
  expect(next1.has(37)).toBe(true);
  expect(next1.get(37)).toBe('y');
});

it("does nothing when it's nothing to change", () => {
  const orig = new Map([
    [42, 'x'],
    [37, 'y'],
  ]);
  const prev = new Map(orig);

  const updater = jest.fn((s: string) => s + '*');

  const next1 = update(prev, 23, updater);
  expect(updater).not.toHaveBeenCalled();
  expect(prev).toEqual(orig);
  expect(next1).toBe(prev);
});
