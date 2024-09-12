import { NextFunction, Request, Response } from 'express';

export type Middleware = (req: Request, res: Response, next: NextFunction) => unknown;

export const MIDDLEWARES_METADATA_KEY = Symbol('MIDDLEWARES_METADATA_KEY');

export const UseMiddlewares =
  (...middlewares: Middleware[]) =>
  (target: any, propertyKey?: string) => {
    if (propertyKey) {
      Reflect.defineMetadata(MIDDLEWARES_METADATA_KEY, middlewares, target, propertyKey);
    } else {
      Reflect.defineMetadata(MIDDLEWARES_METADATA_KEY, middlewares, target);
    }
  };
