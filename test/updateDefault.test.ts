import updateDefault from '../src/updateDefault';

it('does not change original map', () => {
  const orig = new Map([
    [42, 'x'],
    [37, 'y'],
  ]);
  const prev = new Map(orig);

  const updater = jest.fn((s: string) => s + '*');

  const next1 = updateDefault(prev, 42, 'def', updater);
  expect(updater).toHaveBeenCalledTimes(1);
  expect(updater).toHaveBeenCalledWith('x', 42, prev);
  expect(prev).toEqual(orig);
  expect(next1).toEqual(
    new Map([
      [42, 'x*'],
      [37, 'y'],
    ]),
  );

  updater.mockClear();

  const next2 = updateDefault(prev, 23, 'def', updater);
  expect(updater).toHaveBeenCalledTimes(1);
  expect(updater).toHaveBeenCalledWith('def', 23, prev);
  expect(prev).toEqual(orig);
  expect(next2).toEqual(
    new Map([
      [42, 'x'],
      [37, 'y'],
      [23, 'def*'],
    ]),
  );
});

it("does nothing when it's nothing to change", () => {
  const orig = new Map([
    [42, 'x'],
    [37, 'y'],
  ]);
  const prev = new Map(orig);

  const keep = jest.fn((s: string) => s);

  const next1 = updateDefault(prev, 42, 'def', keep);
  expect(prev).toEqual(orig);
  expect(next1).toBe(prev);
});
