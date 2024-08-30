import type { Request, Response } from 'express';
import { Entity, SerializableValue } from './const';

const EntityPipeValidator = {
  string: (value: any) => String(value),
  number: (value: any) => (isNaN(value) || !value ? null : Number(value)),
  boolean: (value: any) => (typeof value === 'string' ? value === 'true' : Boolean(value)),
  null: (value: any) => null,
  undefined: (value: any) => undefined,
  date: (value: any) => new Date(value),
};

export const EntityPipe =
  <T extends string>(entity: Record<T, Entity>) =>
  (req: Request, res: Response, next: () => void) => {
    const data = {} as Record<T, SerializableValue>;

    let primary;

    for (const key of Object.keys(entity) as T[]) {
      const entityInfo = entity[key];
      const value = req.body[key];

      if (key === 'id') continue;

      if (entityInfo.required && !value) {
        return res.status(400).send({ message: `Entity ${key} is required` });
      }

      if (entityInfo.isPrimary) {
        if (primary) {
          throw new TypeError(`Multiple primary keys found: ${primary}, ${key}`);
        }

        primary = key;

        if (value === undefined || value === null) {
          return res.status(400).send({ message: `Primary key ${key} is required but not provided` });
        }
      }

      if (
        entityInfo.required &&
        entityInfo.required === true &&
        entityInfo.type !== typeof EntityPipeValidator[entityInfo.type](value)
      ) {
        return res.status(400).send({ message: `Entity ${key} is not ${entityInfo.type}` });
      }

      data[key] = EntityPipeValidator[entityInfo.type](value);
    }

    req.body = data;

    return next();
  };

export const NumberId = () => (req: Request, res: Response, next: () => void) => {
  const { id } = req.params;

  if (!id) return next();

  if (isNaN(Number(id))) {
    return res.status(400).send({ message: 'Bad Request Error' });
  }

  req.params.id = Number(id) as any;

  return next();
};
