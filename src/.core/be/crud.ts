import { ExpressPolicy } from './const';

export const CRUD = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  FIND_MANY: 'FIND_MANY',
  FIND_ONE: 'FIND_ONE',
} as const;

export const CRUDS = Object.values(CRUD);

export const CRUD_POLICY: Record<keyof typeof CRUD, ExpressPolicy> = {
  [CRUD.CREATE]: {
    METHOD: 'post',
    PATH: (query: string) => '/',
  },
  [CRUD.UPDATE]: {
    METHOD: 'patch',
    PATH: (query: string) => `/:${query}`,
  },
  [CRUD.DELETE]: {
    METHOD: 'delete',
    PATH: (query: string) => `/:${query}`,
  },
  [CRUD.FIND_MANY]: {
    METHOD: 'get',
    PATH: (query: string) => '/',
  },
  [CRUD.FIND_ONE]: {
    METHOD: 'get',
    PATH: (query: string) => `/:${query}`,
  },
};
