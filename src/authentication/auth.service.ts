import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { CreateUserDto } from '../users/dtos/users.dto';
import { Repository } from 'typeorm';
import { HttpException , Service, Container, InjectRepository } from 'route-controller';
import { DataStoredInToken, TokenData } from './auth.interface';

import { User } from '../users/users.entity';
import UserService from '../users/users.service'
import { isEmptyObject } from '../app/util';
import { vars } from '../app/config';

@Service()
class AuthService {

  public userService: UserService = Container.get(UserService);

  public async signup(userData: CreateUserDto): Promise<User> {
    return this.userService.create(userData);
  }

  public async login(userData: CreateUserDto): Promise<{ cookie: string; user: User }> {
    if (isEmptyObject(userData)) throw new HttpException(400, `You're not userData`);

    const user: User = await this.userService.findByEmail(userData.email);
    if (!user) throw new HttpException(409, `You're email ${userData.email} not found`);

    const isPasswordMatching: boolean = userData.password === user.password;
    if (!isPasswordMatching) throw new HttpException(409, `The password is incorrect`);

    const tokenData = this.createToken(user);
    const cookie = this.createCookie(tokenData);

    return { cookie, user };
  }

  public async logout(userData: CreateUserDto): Promise<User> {
    if (isEmptyObject(userData)) throw new HttpException(400, `You're not userData`);

    const user: User = await this.userService.findByEmail(userData.email);
    if (!user) throw new HttpException(409, `You're email ${userData.email} not found`);

    return user;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secret: string = vars.jwtSecret;
    const expiresIn: number = vars.jwtExpirationInterval * 60;

    const JWTtoken = jwt.sign(dataStoredInToken, secret, { expiresIn });

    return { expiresIn, token: JWTtoken };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
