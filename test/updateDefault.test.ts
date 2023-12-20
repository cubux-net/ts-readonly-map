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

it("alternate 'default' type", () => {
  const orig = new Map([
    [42, 'x'],
    [37, 'y'],
  ]);
  const next0 = updateDefault(orig, 42, 'def', (v) => v + '*');
  const expected0: ReadonlyMap<number, string> = next0;
  expect(expected0.get(42)).toBe('x*');

  const next1 = updateDefault(orig, 42, null, (v): string => (v ?? '') + '*');
  const expected1: ReadonlyMap<number, string> = next1;
  expect(expected1.get(42)).toBe('x*');

  const next2 = updateDefault(orig, 42, false, (v) => v + '*');
  const expected2: ReadonlyMap<number, string> = next2;
  expect(expected2.get(42)).toBe('x*');
});

describe('default is subtype', () => {
  interface Patch {
    n?: number;
    s?: string;
  }
  type M = ReadonlyMap<number, Patch>;

  const orig: M = new Map();

  it('full', () => {
    const next = updateDefault(orig, 10, { n: 1, s: '' }, (p) => {
      const { n, s } = p;
      return { n, s };
    });
    const m: M = next;
    expect(m.has(10)).toBeTruthy();
  });

  it('partial', () => {
    const next = updateDefault(orig, 10, { n: 1 }, (p) => {
      // `p` must be `Patch` here, not `Patch | { n:number }`,
      // so `s` is known
      const { n, s } = p;
      return { n, s };
    });
    const m: M = next;
    expect(m.has(10)).toBeTruthy();
  });

  it('{}', () => {
    const next = updateDefault(orig, 10, {}, (p) => {
      // `p` must be `Patch` here, not `Patch | {}`,
      // so `n` and `s` are known
      const { n, s } = p;
      return { n, s };
    });
    const m: M = next;
    expect(m.has(10)).toBeTruthy();
  });

  it('alt', () => {
    const next = updateDefault(orig, 10, null, (p) => {
      // `p` must be `Patch | null` here
      const { n, s } = p || {};
      return { n, s };
    });
    const m: M = next;
    expect(m.has(10)).toBeTruthy();
  });
});
