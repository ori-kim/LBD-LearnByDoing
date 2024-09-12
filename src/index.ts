import { Response } from 'express';
import { Bootstrap, BootstrapModule, Controller, Get, Injectable, Query } from './.core/be';

export const CommonErrorHandler = (err: unknown, res: Response) => {
  console.error(err);

  return res.status(500).json({ message: 'Internal Server Error' });
};

@Injectable()
class AppService {
  getAll() {
    return 'getAll from AppService';
  }
}

const Id = () => Query(({ id }) => Number(id));

@Controller('/')
class AppController {
  @Get('/')
  getAll(@Id() id: number) {
    return { id };
  }
}

const AppModule: BootstrapModule = {
  Controller: AppController,
  ErrorHandler: CommonErrorHandler,
};

const app = Bootstrap.setGlobalMiddlewares((req, res, next) => {
  console.log(req.method, req.url);

  next();
})
  .setModules(AppModule)
  .create();

app.listen(3000, () => console.log(`Server is running on 3000`));
