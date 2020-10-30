import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from './dtos/users.dto';
import { User as UserOld } from './users.interface';
import UserService from './users.service';
import { Controller, Delete, Get, Middleware, Post, Put, response } from '../@libs/router';
import validationMiddleware from '../@libs/middlewares/validation.middleware';
import {logger} from '../@libs/config';

import { Container } from "typeorm-di";
import { User } from "./users.entity";
import HttpException from '@libs/exceptions/HttpException';

@Controller('/users')
export class UsersController {

  public userService: UserService = Container.get(UserService);

  @Get('/')
  public async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const findAllUsersData: User[] = await this.userService.findAllUser();
      response.success(res, findAllUsersData, );
    } catch (error) {
      response.error(res, error);
    }
  }

  @Get('/:id(\\d+)')
  public async getUserById(req: Request, res: Response, next: NextFunction) {
    const userId: number = Number(req.params.id);

    try {
      const findOneUserData: UserOld = await this.userService.findUserById(userId);
      response.success(res, findOneUserData);
    } catch (error) {
      response.error(res, error);
    }

  }


  @Middleware(validationMiddleware(CreateUserDto))
  @Post('/')
  public async createUser(req: Request, res: Response, next: NextFunction) {
    const userData: CreateUserDto = req.body;

    try {   
      const createUserData: User = await this.userService.createUser(userData);
      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }

  }

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
