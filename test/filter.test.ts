import filter from '../src/filter';

/**
 * Type equivalence check
 *
 * If types `X` and `Y` are equivalent, the results to type `Then`, otherwise
 * results to type `Else`.
 *
 * @see https://github.com/Microsoft/TypeScript/issues/27024#issuecomment-421529650
 */
export type IfEquals<X, Y, Then = true, Else = never> = (<T>() => T extends X
  ? 1
  : 2) extends <T>() => T extends Y ? 1 : 2
  ? Then
  : Else;

const isDefined = <T>(value: T | undefined): value is T => undefined !== value;

it('works as [].filter', () => {
  const map = new Map([
    ['x', 42],
    ['y', 37],
    ['z', 23],
  ]);

  const isOdd = jest.fn((n: number) => n % 2 > 0);

  expect(filter(map, isOdd)).toEqual(
    new Map([
      ['y', 37],
      ['z', 23],
    ]),
  );
  expect(isOdd).toHaveBeenCalledTimes(3);
  expect(isOdd).toHaveBeenCalledWith(42, 'x', map);
  expect(isOdd).toHaveBeenCalledWith(37, 'y', map);
  expect(isOdd).toHaveBeenCalledWith(23, 'z', map);
});

it('does nothing when all matched', () => {
  const map = new Map([
    ['x', 42],
    ['y', 37],
    ['z', 23],
  ]);

  const isOk = jest.fn((n: number) => n > 10);
  const next = filter(map, isOk);

  expect(next).toBe(map);
  expect(isOk).toHaveBeenCalledTimes(3);
});

it('types', () => {
  const input = new Map<string, number | undefined>();

  const same = filter(input, () => true);
  const changed = filter(input, isDefined);

  expect(
    ((): IfEquals<typeof same, ReadonlyMap<string, number | undefined>> =>
      true)(),
  ).toBe(true);
  expect(
    ((): IfEquals<typeof changed, ReadonlyMap<string, number>> => true)(),
  ).toBe(true);
});
