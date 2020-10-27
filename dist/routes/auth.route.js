import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { CreateUserDto } from '../dtos/users.dto';
import authMiddleware from '../middlewares/auth.middleware';
import validationMiddleware from '../middlewares/validation.middleware';
class AuthRoute {
    constructor() {
        this.router = Router();
        this.authController = new AuthController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`/signup`, validationMiddleware(CreateUserDto), this.authController.signUp);
        this.router.post(`/login`, validationMiddleware(CreateUserDto), this.authController.logIn);
        this.router.post(`/logout`, authMiddleware, this.authController.logOut);
    }
}
export default AuthRoute;
//# sourceMappingURL=auth.route.js.map