import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import App from './app/app';

const app = new App([UserModule, AuthModule]);

app.listen();
