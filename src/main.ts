import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import App from './app/app';
import { RequestHandler, Request, Response } from 'express';
import { validateType} from 'route-controller';
import {CreateUserDto } from './users/dtos/users.dto';

const app = new App([UserModule, AuthModule]);

app.listen();
