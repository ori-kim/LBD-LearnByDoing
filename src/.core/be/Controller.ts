import { Request } from 'express';

export class Controller {
  constructor() {}

  protected getParams(req: Request) {
    if (!req?.route) throw new Error('Route is Required Params');

    const regex = /\/:(\w+)/;
    const paramKey = req.route.path.match(regex)[1];
    const paramValue = req.params[paramKey];

    return { [paramKey]: paramValue };
  }
}
