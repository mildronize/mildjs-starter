import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from './dtos/users.dto';
import { User as UserOld } from './users.interface';
import UserService from './users.service';
import { Controller, Delete, Get, Middleware, Post, Put } from '../@libs/router';
import validationMiddleware from '../@libs/middlewares/validation.middleware';
import logger from '../@libs/config/logger';

import { Container } from "typeorm-di";
import { User } from "./users.entity";

// @Service()
@Controller('/users')
export class UsersController {

  public userService: UserService;

  constructor(){
    this.userService = Container.get(UserService);
  }

  // constructor(@Inject(UserService) private userService: UserService ){}

  @Get('/')
  public async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      // const findAllUsersData: User[] = await this.userService.findAllUser();
      const userService = Container.get(UserService);
      const findAllUsersData: User[] = await userService.findAllUser();
      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      logger.error(JSON.stringify(error));
      // next(error);
    }
  }

  // @Get('/:id(\\d+)')
  // public async getUserById(req: Request, res: Response, next: NextFunction) {
  //   const userId: number = Number(req.params.id);

  //   try {
  //     const findOneUserData: UserOld = await this.userService.findUserById(userId);
  //     res.status(200).json({ data: findOneUserData, message: 'findOne' });
  //   } catch (error) {
  //     next(error);
  //   }
  // }


  // @Middleware(validationMiddleware(CreateUserDto))
  // @Post('/')
  // public async createUser(req: Request, res: Response, next: NextFunction) {
  //   const userData: CreateUserDto = req.body;

  //   try {
  //     const createUserData: UserOld = await this.userService.createUser(userData);
  //     res.status(201).json({ data: createUserData, message: 'created' });
  //   } catch (error) {
  //     next(error);
  //   }

  // }

  // @Middleware(validationMiddleware(CreateUserDto, true))
  // @Put('/:id(\\d+)')
  // public async updateUser(req: Request, res: Response, next: NextFunction) {
  //   const userId: number = Number(req.params.id);
  //   const userData: User = req.body;

  //   try {
  //     const updateUserData: User[] = await this.userService.updateUser(userId, userData);
  //     res.status(200).json({ data: updateUserData, message: 'updated' });
  //   } catch (error) {
  //     next(error);
  //   }
  // }


  // @Delete('/:id(\\d+)')
  // public async deleteUser(req: Request, res: Response, next: NextFunction) {
  //   const userId: number = Number(req.params.id);

  //   try {
  //     const deleteUserData: User[] = await this.userService.deleteUser(userId);
  //     res.status(200).json({ data: deleteUserData, message: 'deleted' });
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}
