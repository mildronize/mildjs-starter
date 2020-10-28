import 'dotenv/config';
import App from './app';
import AuthRoute from './libs/authentication/auth.route';
import IndexRoute from './index/index.route';
import UsersRoute from './routes/users.route';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
]);

app.listen();
