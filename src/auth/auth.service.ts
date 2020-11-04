import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { CreateUserDto } from '../users/dtos/users.dto';
import { Repository, InjectRepository, Service, Container } from 'typeorm-di';
import { HttpException } from '@mildjs/core';
import { DataStoredInToken, TokenData } from './auth.interface';
import { User } from '../users/users.entity';
import { vars } from '../app/config';

@Service()
export class AuthService {
  public async login(user: User): Promise<{ token: string; user: User }> {
    const token = this.createToken(user).token;
    return { token, user };
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secret: string = vars.jwtSecret;
    const expiresIn: number = vars.jwtExpirationInterval * 60;

    const JWTtoken = jwt.sign(dataStoredInToken, secret, { expiresIn });

    return { expiresIn, token: JWTtoken };
  }
}
