import App from './@libs/app';

import { IndexController } from './index/index.controller';
import { UsersController } from './users/users.controller';

const app = new App([
  IndexController,
  UsersController
]);

app.listen();
