import updateDefaultDeep from '../../src/deep/updateDefaultDeep';
import mapFn from '../../src/map';

const origA: ReadonlyMap<number, string> = new Map([
  [42, 'x'],
  [37, 'y'],
]);
const origB: ReadonlyMap<number, string> = new Map([
  [23, 'x'],
  [19, 'y'],
]);
const orig: ReadonlyMap<number, ReadonlyMap<number, string>> = new Map([
  [97, origA],
  [41, origB],
]);

const copyMap = <M extends ReadonlyMap<any, ReadonlyMap<any, any>>>(
  map: M,
): M => mapFn(map, m => new Map(m)) as any;

it('does not change original map', () => {
  const prev = copyMap(orig);

  expect(updateDefaultDeep(prev, [97, 47], '?', v => v + v)).toEqual(
    new Map([
      [
        97,
        new Map([
          [42, 'x'],
          [37, 'y'],
          [47, '??'],
        ]),
      ],
      [41, origB],
    ]),
  );
  expect(prev).toEqual(orig);
});

it('will create new maps', () => {
  const prev = copyMap(orig);

  expect(updateDefaultDeep(prev, [91, 17], '?', v => v + 'q')).toEqual(
    new Map([
      [97, origA],
      [41, origB],
      [91, new Map([[17, '?q']])],
    ]),
  );
  expect(prev).toEqual(orig);
});

it("does nothing when it's nothing to change", () => {
  const prev = copyMap(orig);

  const noop = jest.fn((v: any) => v);
  expect(updateDefaultDeep(prev, [97, 42], '?', noop)).toBe(prev);
  expect(updateDefaultDeep(prev, [97, 42], null, v => v)).toBe(prev);
  expect(updateDefaultDeep(prev, [97, 42], null, v => v ?? '')).toBe(prev);
  expect(updateDefaultDeep(prev, [97], null as any, noop)).toBe(prev);
  expect(noop).toHaveBeenCalledTimes(2);
  expect(noop).toHaveBeenNthCalledWith(1, 'x');
  expect(noop).toHaveBeenNthCalledWith(2, origA);
  expect(prev).toEqual(orig);
});
