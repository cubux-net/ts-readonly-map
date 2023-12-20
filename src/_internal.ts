/**
 * @see https://github.com/microsoft/TypeScript/issues/14829#issuecomment-504042546
 * TS>=5.4
 */
export type NoInfer<T> = [T][T extends any ? 0 : never];
