import { Router } from 'express';
import UsersController from './users.controller';
import { CreateUserDto } from './dtos/users.dto';
import { Route } from '../@libs/router';
import validationMiddleware from '../@libs/middlewares/validation.middleware';

class UsersRoute implements Route {
  public path = '/users';
  public router = Router();
  public controller = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    const { path, controller, router }: Route = this;
    router.get(`${path}`, controller.getUsers);
    router.get(`${path}/:id(\\d+)`, controller.getUserById);
    router.post(`${path}`, validationMiddleware(CreateUserDto), controller.createUser);
    router.put(`${path}/:id(\\d+)`, validationMiddleware(CreateUserDto, true), controller.updateUser);
    router.delete(`${path}/:id(\\d+)`, controller.deleteUser);
  }
}

export default UsersRoute;
