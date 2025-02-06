import express, { NextFunction, Request, Response } from 'express';
import {
  ENDPOINT_METADATA_KEY,
  HttpMethodType,
  Middleware,
  MIDDLEWARES_METADATA_KEY,
  REQUEST_METADATA_KEY,
  RESPONSE_METADATA_KEY,
  ROUTE_METADATA_KEY,
} from './decorators';
import { container } from 'tsyringe';

export interface BootstrapModule {
  Controller: new (...args: any[]) => any;
  ErrorHandler?: (err: unknown, res: Response) => unknown;
}

export class Bootstrap {
  private static app = express();

  static setGlobalMiddlewares(...middlewares: Middleware[]) {
    this.app.use(middlewares);

    return this;
  }

  static setModules(...modules: any) {
    for (const module of modules) {
      const router = express.Router();

      const { Controller, ErrorHandler } = module;

      if (!Controller) continue;

      const instance = container.resolve(Controller);

      const endPoint = this.getEndPoint(Controller);

      const { prototype, propertyKeys } = this.getInstancePrototypeAndKeys(instance);

      for (const propertyKey of propertyKeys) {
        const { method, path } = this.getRoute(prototype, propertyKey);

        if (!method || !path) continue;

        const middlewares = this.getMiddlewares(Controller, prototype, propertyKey);

        const handler = this.createHandler(instance, propertyKey);

        router[method](`${path}`, ...middlewares, async (req, res, next) => {
          try {
            const data = await handler(req, res, next);

            return data instanceof res.constructor ? data : res.status(200).json(data);
          } catch (e) {
            return ErrorHandler ? ErrorHandler(e, res) : res.status(500).json({ message: e });
          }
        });

        this.app.use(endPoint, router);
      }
    }

    return this;
  }

  private static getInstancePrototypeAndKeys(instance: any) {
    const prototype = Object.getPrototypeOf(instance);
    const propertyKeys = Object.getOwnPropertyNames(prototype);

    return { prototype, propertyKeys };
  }

  private static getEndPoint(Controller: any) {
    return Reflect.getMetadata(ENDPOINT_METADATA_KEY, Controller);
  }

  private static getMiddlewares(constructor: any, prototype: any, propertyKey: string) {
    const controllerMiddleware = Reflect.getMetadata(MIDDLEWARES_METADATA_KEY, constructor) || [];
    const routeMiddleware = Reflect.getMetadata(MIDDLEWARES_METADATA_KEY, prototype, propertyKey) || [];

    return [...controllerMiddleware, ...routeMiddleware];
  }

  private static createHandler(instance: any, propertyKey: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      const prototype = Object.getPrototypeOf(instance);

      const args = this.getParams({ instance, req, res, prototype, propertyKey });

      return instance[propertyKey](...args);
    };
  }

  private static getParams({
    instance,
    req,
    res,
    prototype,
    propertyKey,
  }: {
    instance: any;
    req: Request;
    res: Response;
    prototype: any;
    propertyKey: string;
  }) {
    const params = Reflect.getMetadata(REQUEST_METADATA_KEY, prototype, propertyKey);

    const resIndex = Reflect.getMetadata(RESPONSE_METADATA_KEY, prototype, propertyKey);

    const args = new Array(instance[propertyKey].length);

    if (params && Array.isArray(params)) {
      params.forEach((param: { index: number; ref: string; pipe: (arg: any) => any }) => {
        const value = param.ref ? this.getValueFromPath(req, param.ref) : req;

        args[param.index] = param.pipe ? param.pipe(value) : value;
      });
    }

    if (resIndex !== undefined) {
      args[resIndex] = res;
    }

    return args;
  }

  private static getValueFromPath(obj: any, path: string) {
    return path.split('.').reduce((acc, key) => acc && acc[key], obj);
  }

  private static getRoute(prototype: any, propertyKey: string): { method: HttpMethodType; path: string } {
    const route = Reflect.getMetadata(ROUTE_METADATA_KEY, prototype, propertyKey);

    return { method: route?.method, path: route?.path };
  }

  static create() {
    return this.app;
  }
}
