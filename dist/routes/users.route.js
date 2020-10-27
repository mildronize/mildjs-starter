import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import { CreateUserDto } from '../dtos/users.dto';
import validationMiddleware from '../middlewares/validation.middleware';
class UsersRoute {
    constructor() {
        this.path = '/users';
        this.router = Router();
        this.usersController = new UsersController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, this.usersController.getUsers);
        this.router.get(`${this.path}/:id(\\d+)`, this.usersController.getUserById);
        this.router.post(`${this.path}`, validationMiddleware(CreateUserDto), this.usersController.createUser);
        this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateUserDto, true), this.usersController.updateUser);
        this.router.delete(`${this.path}/:id(\\d+)`, this.usersController.deleteUser);
    }
}
export default UsersRoute;
//# sourceMappingURL=users.route.js.map