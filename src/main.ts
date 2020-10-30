import App from './app/app';

import { IndexController } from './index/index.controller';
import { UsersController } from './users/users.controller';
import { AuthController } from './authentication/auth.controller';

const app = new App([IndexController, UsersController, AuthController]);

app.listen();
