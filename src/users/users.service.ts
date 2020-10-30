import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dtos/users.dto';
import HttpException from '../@libs/exceptions/HttpException';
import { User as UserOld } from './users.interface';
import userModel from './users.seed';
import { isEmptyObject } from '../@libs/utils/util';

import { Service, Container, Repository, InjectRepository } from "typeorm-di";

import { User } from "./users.entity";

@Service()
class UserService {

  @InjectRepository(User) 
  private repository: Repository<User>;

  public users = userModel;

  public findAllUser(): Promise<User[]> {
    const users = this.repository.find();
    return users;
  }

  public async findUserById(userId: number): Promise<User> {
    const user: User = await this.repository.findOne({ id: userId });
    if (!user) throw new HttpException(409, `The user is not found`);
    return user;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmptyObject(userData)) throw new HttpException(400, `You're not userData`);

    // const findUser: UserOld = this.users.find(user => user.email === userData.email);
    const user: User = await this.repository.findOne({ email: userData.email });
    if (user) throw new HttpException(409, `You're email ${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createUserData = {
      ...userData, password: hashedPassword
    }
    return this.repository.save(createUserData);
    // const createUserData: UserOld = { id: (this.users.length + 1), ...userData, password: hashedPassword };

    // return createUserData;
  }

  public async updateUser(userId: number, userData: UserOld): Promise<UserOld[]> {
    if (isEmptyObject(userData)) throw new HttpException(400, `You're not userData`);

    const findUser: UserOld = this.users.find(user => user.id === userId);
    if (!findUser) throw new HttpException(409, `You're not user`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const updateUserData: UserOld[] = this.users.map((user: UserOld) => {
      if (user.id === findUser.id) user = { id: userId, ...userData, password: hashedPassword };
      return user;
    });

    return updateUserData;
  }

  public async deleteUser(userId: number): Promise<UserOld[]> {
    const findUser: UserOld = this.users.find(user => user.id === userId);
    if (!findUser) throw new HttpException(409, `You're not user`);

    const deleteUserData: UserOld[] = this.users.filter(user => user.id !== findUser.id);
    return deleteUserData;
  }
}

export default UserService;
