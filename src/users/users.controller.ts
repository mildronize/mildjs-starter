import { Request, Response } from 'express';
import { Controller, Delete, Get, Middleware, Post,Put, validateType, StatusCodes } from 'route-controller';
import { Container } from 'typeorm-di';

import { User } from './users.entity';
import UserService from './users.service';

import { CreateUserDto } from './dtos/users.dto';

@Controller('/users')
export class UsersController {

  public userService: UserService = Container.get(UserService);

  @Get('/')
  public async getUsers(req: Request, res: Response) {
    const data: User[] = await this.userService.findAll();
    res.status(StatusCodes.OK).json({ data });
  }

  @Get('/:id(\\d+)')
  public async getUserById(req: Request, res: Response) {
    const id: number = Number(req.params.id);
    const data = await this.userService.findById(id);
    res.status(StatusCodes.OK).json({ data });
  }

  @Middleware(validateType(CreateUserDto))
  @Post('/')
  public async createUser(req: Request, res: Response) {
    const userData: CreateUserDto = req.body;
    const data: User = await this.userService.create(userData);
    res.status(StatusCodes.CREATED).json({ data });
  }

  @Middleware(validateType(CreateUserDto, true))
  @Put('/:id(\\d+)')
  public async updateUser(req: Request, res: Response) {
    const userId: number = Number(req.params.id);
    const userData: User = req.body;

    const data: User = await this.userService.update(userId, userData);
    res.status(StatusCodes.OK).json({ data });
  }

  @Delete('/:id(\\d+)')
  public async deleteUser(req: Request, res: Response) {
    const userId: number = Number(req.params.id);
    await this.userService.delete(userId);
    res.status(StatusCodes.OK).json({ message: "Delete successfully" });
  }
}
