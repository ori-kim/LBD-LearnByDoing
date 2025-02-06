import { Response } from 'express';

export interface BootstrapModule {
  Controller?: new (...args: any[]) => any;
  ErrorHandler?: (err: unknown, res: Response) => unknown;
}

export const MODULE_METADATA_KEY = Symbol('module');

export const Module = (options: BootstrapModule) => (target: any) => {
  Reflect.defineMetadata(MODULE_METADATA_KEY, options, target);

  return Object.assign(target, options);
};

export abstract class DynamicModule {
  static generate(...args: any[]): BootstrapModule {
    return {};
  }
}

export const getModule = (target: any): BootstrapModule => {
  return Reflect.getMetadata(MODULE_METADATA_KEY, target);
};
