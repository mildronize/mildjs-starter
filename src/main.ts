import App from './app/app';

import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { IndexModule } from './index/index.module';
// import { mainModule } from 'process';


export const app = new App([UserModule, AuthModule, IndexModule]);

async function main() {
    await app.init();
}


main();
