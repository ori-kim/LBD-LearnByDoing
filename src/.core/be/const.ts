export interface Entity {
  type: SerializableString;
  required?: boolean;
  isPrimary?: boolean;
}

export type SerializableString = 'string' | 'number' | 'boolean' | 'null' | 'undefined' | 'date';

export type SerializableValue = MappingType<SerializableString>;

export type EntityRepoType<T extends Record<string, Entity>> = {
  [K in keyof T]: MappingType<T[K]['type']>;
};

export type MappingType<T> = T extends 'string'
  ? string
  : T extends 'number'
    ? number
    : T extends 'boolean'
      ? boolean
      : T extends 'null'
        ? null
        : T extends 'undefined'
          ? undefined
          : T extends 'date'
            ? Date
            : never;

export type EntityType<T> = {
  [K in keyof T]: MappingType<T[K]>;
};

export type ExpressMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export interface ExpressPolicy {
  METHOD: ExpressMethod;
  PATH: (...arg: any) => string;
}

export type Policy<T extends string> = Record<T, ExpressPolicy>;

export type PolicyExecutor<T extends Policy<string>> = {
  [K in keyof T]: (...arg: any) => any;
};

export type Identifiable<T> = T & { id: number };
