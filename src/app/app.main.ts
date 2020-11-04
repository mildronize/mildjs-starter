import App from './app';
import { UserModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { IndexModule } from '../index/index.module';

export const app = new App([
    UserModule, 
    AuthModule, 
    IndexModule
]);