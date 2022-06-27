import updateDeep from '../../src/deep/updateDeep';
import mapFn from '../../src/map';
import setFn from '../../src/set';

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

  expect(updateDeep(prev, [97, 37], v => v + v)).toEqual(
    new Map([
      [
        97,
        new Map([
          [42, 'x'],
          [37, 'yy'],
        ]),
      ],
      [41, origB],
    ]),
  );
  expect(prev).toEqual(orig);

  expect(
    updateDeep(prev, [97], m => setFn(setFn(m, 10, 'xx'), 20, 'zz')),
  ).toEqual(
    new Map([
      [
        97,
        new Map([
          [42, 'x'],
          [37, 'y'],
          [10, 'xx'],
          [20, 'zz'],
        ]),
      ],
      [41, origB],
    ]),
  );
  expect(prev).toEqual(orig);
});

it('will not create new keys', () => {
  const prev = copyMap(orig);

  const updater = jest.fn((v: any) => v);
  expect(updateDeep(prev, [91, 17], updater)).toBe(prev);
  expect(updateDeep(prev, [91], updater)).toBe(prev);
  expect(updater).not.toHaveBeenCalled();
  expect(prev).toEqual(orig);
});

it("does nothing when it's nothing to change", () => {
  const prev = copyMap(orig);

  const update = jest.fn((v: string) => v);
  expect(updateDeep(prev, [97, 42], update)).toBe(prev);
  expect(update).toHaveBeenCalledTimes(1);
  expect(update).toHaveBeenLastCalledWith('x');
  expect(prev).toEqual(orig);
});
