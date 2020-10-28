import App from './@libs/app';

import IndexRoute from './index/index.route';
import UsersRoute from './users/users.route';

const app = new App([
  new IndexRoute(),
  new UsersRoute()
]);

app.listen();
