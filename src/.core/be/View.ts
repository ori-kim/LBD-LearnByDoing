import { PolicyExecutor } from './const';
import { CRUD, CRUD_POLICY } from './crud';

export class CRUDRestView implements PolicyExecutor<typeof CRUD_POLICY> {
  [CRUD.CREATE](arg: { data?: any; res: any }) {
    const { res, data } = arg;

    return res.send(data);
  }

  [CRUD.DELETE](arg: { data?: any; res: any }) {
    const { res, data } = arg;

    return res.send(data);
  }

  [CRUD.UPDATE](arg: { data?: any; res: any }) {
    const { res, data } = arg;

    return res.send(data);
  }

  [CRUD.FIND_ONE](arg: { data?: any; res: any }) {
    const { res, data } = arg;

    return res.send(data);
  }

  [CRUD.FIND_MANY](arg: { data?: any; res: any }) {
    const { res, data } = arg;

    return res.send(data);
  }
}
