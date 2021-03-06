export interface IndexedObject<T> {
    [key: string]: T,
}

// Thanks to https://gist.github.com/navix/6c25c15e0a2d3cd0e5bce999e0086fc9
export type DeepPartial<T> =
// eslint-disable-next-line @typescript-eslint/ban-types
  T extends Function
    ? T
    // eslint-disable-next-line @typescript-eslint/ban-types
    : (T extends object ? { [P in keyof T]?: DeepPartial<T[P]>; } : T);
