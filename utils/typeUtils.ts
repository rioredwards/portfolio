// Utility type for making the primitive types of nested unions visible to LSP
export type Flatten<T> = T extends (infer U)[]
  ? Flatten<U>
  : T extends object
    ? { [K in keyof T]: Flatten<T[K]> }
    : T;
