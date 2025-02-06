import { singleton } from 'tsyringe';

export const ENDPOINT_METADATA_KEY = Symbol('ENDPOINT_METADATA_KEY');

export const Controller = (endPoint: string) => (target: any) => {
  Reflect.defineMetadata(ENDPOINT_METADATA_KEY, endPoint, target);

  singleton()(target);
};
