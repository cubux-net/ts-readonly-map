import fromArray from '../src/fromArray';

it('creates map', () => {
  interface T {
    id: number;
    name: string;
  }

  const array: T[] = [
    { id: 10, name: 'John Random' },
    { id: 20, name: 'Pupkin Vasily' },
    { id: 30, name: 'Lu Lu' },
  ];

  expect(fromArray(array, v => v.id)).toEqual(
    new Map([
      [10, { id: 10, name: 'John Random' }],
      [20, { id: 20, name: 'Pupkin Vasily' }],
      [30, { id: 30, name: 'Lu Lu' }],
    ]),
  );
});
