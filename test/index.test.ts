import * as M from '../src';

const EMPTY: ReadonlyMap<never, never> = new Map<never, never>();
const DEF = Symbol();

it('common', () => {
  expect(M.every(EMPTY, Boolean)).toBeTruthy();
  expect(M.filter(EMPTY, Boolean)).toBe(EMPTY);
  expect(M.find(EMPTY, Boolean)).toBeUndefined();
  expect(M.findKey(EMPTY, Boolean)).toBeUndefined();
  expect(M.fromArray([], Boolean)).toEqual(EMPTY);
  expect(M.getOr(EMPTY, 42, DEF)).toBe(DEF);
  expect(M.includes(EMPTY, 42)).toBeFalsy();
  expect(M.map(EMPTY, (v) => v)).toBe(EMPTY);
  expect(M.merge(EMPTY, EMPTY, EMPTY)).toBe(EMPTY);
  expect(M.reduce(EMPTY, () => null, DEF)).toBe(DEF);
  expect(M.remove(EMPTY, 42)).toBe(EMPTY);
  expect(M.set(EMPTY, 42, 37)).toEqual(new Map([[42, 37]]));
  expect(M.some(EMPTY, Boolean)).toBeFalsy();
  expect(M.update(EMPTY, 42, () => DEF)).toBe(EMPTY);
  expect(M.updateDefault(new Map<number, any>(), 42, DEF, (v) => [v])).toEqual(
    new Map([[42, [DEF]]]),
  );

  expect(M.getDeep(EMPTY, [10, 20], DEF)).toBe(DEF);
  expect(M.hasDeep(EMPTY, [10, 20])).toBeFalsy();
  expect(M.removeDeep(EMPTY, [10, 20])).toBe(EMPTY);
  expect(M.setDeep(EMPTY, [10, 20], 42)).toEqual(
    new Map([[10, new Map([[20, 42]])]]),
  );
  expect(M.toObjectDeep(new Map([[10, new Map([[20, 42]])]]))).toEqual({
    10: { 20: 42 },
  });
  expect(M.updateDeep(EMPTY, [10, 20], () => DEF)).toBe(EMPTY);
  expect(M.updateDefaultDeep(EMPTY, [10, 20], DEF, (v) => [v] as any)).toEqual(
    new Map([[10, new Map([[20, [DEF]]])]]),
  );
});
