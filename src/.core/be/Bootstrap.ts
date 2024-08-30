import express from 'express';
import { Entity, PolicyExecutor, Policy } from './const';
import { EntityPipe, NumberId } from './Middleware';

export interface Module<T extends Policy<string>> {
  Policy: T;
  Entity: Record<string, Entity>;
  routePath: string;
  Controller: new (...args: any[]) => PolicyExecutor<T>;
  View: new (...args: any[]) => PolicyExecutor<T>;
  Middlewares?: any[];
  Providers?: ConstructorParameters<new (...args: any[]) => PolicyExecutor<T>>;
}

export class Bootstrap {
  static app = express();

  static setModules<T extends Policy<string>>(...modules: Module<T>[]) {
    for (const config of modules) {
      const {
        routePath,
        Providers,
        Controller: RouteController,
        View: RouteView,
        Policy: RoutePolicy,
        Middlewares: RouteMiddlewares,
        Entity: RouteEntity,
      } = config;

      const router = express.Router();

      const controller = Providers ? new RouteController(...Providers.map((p) => new p())) : new RouteController();
      const view = new RouteView();

      const middlewares = [NumberId(), EntityPipe(RouteEntity), ...(RouteMiddlewares || [])];

      for (const modifier of Object.keys(RoutePolicy)) {
        const { METHOD, PATH } = RoutePolicy[modifier];

        const primary = Object.keys(RouteEntity).find((key) => RouteEntity[key].isPrimary);
        const path = PATH(primary || 'id');

        router[METHOD](path, ...middlewares, async (req, res) => {
          try {
            const data = await controller[modifier](req);

            return view[modifier]({ res, data });
          } catch (e) {
            console.error(e);
            return res.status(500).send({ message: e instanceof Error ? e.message : 'Server Error' });
          }
        });
      }

      this.app.use(routePath, router);
    }

    return this;
  }

  static setGlobalMiddlewares(...middlewares: any[]) {
    for (const middleware of middlewares) {
      this.app.use(middleware);
    }

    return this;
  }

  static create() {
    return this.app;
  }
}
