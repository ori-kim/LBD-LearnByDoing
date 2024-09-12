export const REQUEST_METADATA_KEY = Symbol('REQUEST_METADATA_KEY');

export const Req =
  (ref?: string, pipe?: (value: any) => any) => (target: any, propertyKey: string | symbol, parameterIndex: number) => {
    const existingPipes = Reflect.getMetadata(REQUEST_METADATA_KEY, target, propertyKey) || [];

    existingPipes.push({ index: parameterIndex, ref, pipe });

    Reflect.defineMetadata(REQUEST_METADATA_KEY, existingPipes, target, propertyKey);
  };

export const Body = (pipe?: (value: any) => any) => Req('body', pipe);
export const Query = (pipe?: (value: any) => any) => Req('query', pipe);
export const Param = (pipe?: (value: any) => any) => Req('params', pipe);

export const RESPONSE_METADATA_KEY = Symbol('RESPONSE_METADATA_KEY');

export const Res = () => (target: any, propertyKey: string | symbol, parameterIndex: number) => {
  Reflect.defineMetadata(RESPONSE_METADATA_KEY, parameterIndex, target, propertyKey);
};
