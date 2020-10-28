import request from 'supertest';
import App from '../@libs/app';
import { User } from './users.interface';
import userModel from './users.model';
import UserRoute from './users.route';
import { CreateUserDto } from 'users/dtos/users.dto';
import { AuthController } from '@libs/authentication/auth.controller';
import { getControllerData } from '@libs/router';
import { UsersController } from './users.controller';

afterAll(async () => {
  await new Promise(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Users', () => {
  describe('[GET] /users', () => {
    it('response statusCode 200 / findAll', () => {
      const findUser: User[] = userModel;
      
      const app = new App([UsersController]);
      const { prefix } = getControllerData(UsersController);

      return request(app.getServer())
      .get(`${prefix}`)
      .expect(200, { data: findUser, message: 'findAll' });
    });
  });

  describe('[GET] /users/:id', () => {
    it('response statusCode 200 / findOne', () => {
      const userId: number = 1;
      const findUser: User = userModel.find(user => user.id === userId);

      const app = new App([UsersController]);
      const { prefix } = getControllerData(UsersController);

      return request(app.getServer())
      .get(`${prefix}/${userId}`)
      .expect(200, { data: findUser, message: 'findOne' });
    });
  });

  describe('[POST] /users', () => {
    it('response statusCode 201 / created', async () => {
      const userData: CreateUserDto = {
        email: 'lkm@gmail.com',
        password: 'q1w2e3r4',
      };
      
      const app = new App([UsersController]);
      const { prefix } = getControllerData(UsersController);

      return request(app.getServer())
      .post(`${prefix}`)
      .send(userData)
      .expect(201);
    });
  });

  describe('[PUT] /users/:id', () => {
    it('response statusCode 200 / updated', async () => {
      const userId: number = 1;
      const userData: CreateUserDto = {
        email: 'lim@gmail.com',
        password: '1q2w3e4r',
      };
      
      const app = new App([UsersController]);
      const { prefix } = getControllerData(UsersController);

      return request(app.getServer())
      .put(`${prefix}/${userId}`)
      .send(userData)
      .expect(200);
    });
  });

  describe('[DELETE] /users/:id', () => {
    it('response statusCode 200 / deleted', () => {
      const userId = 1;
      const deleteUser: User[] = userModel.filter(user => user.id !== userId);
      
      const app = new App([UsersController]);
      const { prefix } = getControllerData(UsersController);

      return request(app.getServer())
      .delete(`${prefix}/${userId}`)
      .expect(200, { data: deleteUser, message: 'deleted' });
    });
  });
});
