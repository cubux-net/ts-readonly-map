import mapFn from '../../src/map';
import setDeep from '../../src/deep/setDeep';

const origA = new Map([
  [42, 'x'],
  [37, 'y'],
]);
const origB = new Map([
  [23, 'x'],
  [19, 'y'],
]);
const orig = new Map([
  [97, origA],
  [41, origB],
]);

const copyMap = <M extends ReadonlyMap<any, ReadonlyMap<any, any>>>(
  map: M,
): M => mapFn(map, m => new Map(m)) as any;

it('does not change original map', () => {
  const prev = copyMap(orig);

  expect(setDeep(prev, [97, 47], 'z')).toEqual(
    new Map([
      [
        97,
        new Map([
          [42, 'x'],
          [37, 'y'],
          [47, 'z'],
        ]),
      ],
      [41, origB],
    ]),
  );
  expect(prev).toEqual(orig);

  expect(setDeep(prev, [97, 37], 'z')).toEqual(
    new Map([
      [
        97,
        new Map([
          [42, 'x'],
          [37, 'z'],
        ]),
      ],
      [41, origB],
    ]),
  );
  expect(prev).toEqual(orig);

  expect(
    setDeep(
      prev,
      [97],
      new Map([
        [10, 'xx'],
        [20, 'zz'],
      ]),
    ),
  ).toEqual(
    new Map([
      [
        97,
        new Map([
          [10, 'xx'],
          [20, 'zz'],
        ]),
      ],
      [41, origB],
    ]),
  );
  expect(prev).toEqual(orig);
});

it('will create new maps', () => {
  const prev = copyMap(orig);

  expect(setDeep(prev, [91, 17], 'q')).toEqual(
    new Map([
      [97, origA],
      [41, origB],
      [91, new Map([[17, 'q']])],
    ]),
  );
  expect(prev).toEqual(orig);
});

it("does nothing when it's nothing to change", () => {
  const prev = copyMap(orig);

  expect(setDeep(prev, [97, 42], 'x')).toBe(prev);
  expect(prev).toEqual(orig);
});

it('unusual', () => {
  expect(
    setDeep(
      new Map([
        [10, 'wrong' as never],
        [20, origB],
      ]),
      [10, 17],
      'foo',
    ),
  ).toEqual(
    new Map([
      [10, new Map([[17, 'foo']])],
      [20, origB],
    ]),
  );

  expect(() => setDeep(new Map(), [] as any, 42)).toThrow(
    new Error('Empty path should mean some logic mistake outside?'),
  );
});
