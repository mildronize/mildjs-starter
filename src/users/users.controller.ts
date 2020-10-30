import { NextFunction, Request, Response } from 'express';
import { Controller, Delete, Get, Middleware, Post, validateType } from 'route-controller';
import { Container } from 'typeorm-di';

import { User } from './users.entity';
import UserService from './users.service';

import { CreateUserDto } from './dtos/users.dto';
import { User as UserOld } from './users.interface';

@Controller('/users')
export class UsersController {
  public userService: UserService = Container.get(UserService);

  @Get('/')
  public async getUsers(req: Request, res: Response, next: NextFunction) {
    const data: User[] = await this.userService.findAllUser();
    res.status(200).json({ data });
  }

  @Get('/:id(\\d+)')
  public async getUserById(req: Request, res: Response, next: NextFunction) {
    const id: number = Number(req.params.id);
    const data = await this.userService.findUserById(id);
    res.status(200).json({ data });
  }

  @Middleware(validateType(CreateUserDto))
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

  // @Middleware(validateType(CreateUserDto, true))
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
