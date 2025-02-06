export const ROUTE_METADATA_KEY = Symbol('ROUTE_METADATA_KEY');

export type HttpMethodType = 'get' | 'post' | 'patch' | 'delete';

export const RouteMapper =
  (args: { path: string; method: HttpMethodType }) =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata(ROUTE_METADATA_KEY, args, target, propertyKey);
  };

export const Get = (path: string) => RouteMapper({ path, method: 'get' });
export const Post = (path: string) => RouteMapper({ path, method: 'post' });
export const Patch = (path: string) => RouteMapper({ path, method: 'patch' });
export const Delete = (path: string) => RouteMapper({ path, method: 'delete' });
