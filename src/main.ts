import App from './app/app';

import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { IndexModule } from './index/index.module';


const app = new App([UserModule, AuthModule, IndexModule]);

app.listen();
