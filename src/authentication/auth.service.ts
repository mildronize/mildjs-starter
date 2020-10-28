import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { CreateUserDto } from '../users/dtos/users.dto';
import HttpException from '../@libs/exceptions/HttpException';
import { DataStoredInToken, TokenData } from './auth.interface';
import { User } from '../users/users.interface';
import userModel from '../users/users.seed';
import { isEmptyObject } from '../@libs/utils/util';
import vars from '../@libs/config/vars';

class AuthService {
  public users = userModel;

  public async signup(userData: CreateUserDto): Promise<User> {
    if (isEmptyObject(userData)) throw new HttpException(400, `You're not userData`);

    const findUser: User = this.users.find(user => user.email === userData.email);
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createUserData: User = { id: (this.users.length + 1), ...userData, password: hashedPassword };

    return createUserData;
  }

  public async login(userData: CreateUserDto): Promise<{ cookie: string, findUser: User }> {
    if (isEmptyObject(userData)) throw new HttpException(400, `You're not userData`);

    const findUser: User = this.users.find(user => user.email === userData.email);
    if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);

    const isPasswordMatching: boolean = await bcrypt.compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, `You're not userData`);

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser };
  }

  public async logout(userData: User): Promise<User> {
    if (isEmptyObject(userData)) throw new HttpException(400, `You're not userData`);

    const findUser: User = this.users.find(user => user.password === userData.password);
    if (!findUser) throw new HttpException(409, `You're not userData`);

    return findUser;
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
