import { HttpException , Service, InjectRepository, DeleteResult, Repository} from 'route-controller';

import { isEmptyObject } from '../app/util';

import { CreateUserDto } from './dtos/users.dto';
import { User } from './users.entity';
import { assignObject } from '../app/util';

@Service()
export class UsersService {
  @InjectRepository(User)
  private repository: Repository<User>;

  public findAll(): Promise<User[]> {
    const users = this.repository.find();
    return users;
  }

  public async findById(id: number): Promise<User> {
    const user: User = await this.repository.findOne({ id });
    if (!user) throw new HttpException(409, `The user is not found`);
    return user;
  }

  public async findByEmail(email: string): Promise<User> {
    const user: User = await this.repository.findOne({ email });
    if (!user) throw new HttpException(409, `The user is not found`);
    return user;
  }

  public async create(userData: CreateUserDto): Promise<User> {
    if (isEmptyObject(userData)) throw new HttpException(400, `The data is not 'CreateUserDto' type`);

    const findUser: User = await this.repository.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);
  
    let user = assignObject(new User(), userData);

    // Note: The password should be hashed from the client side
    return this.repository.save(user);
  }

  public async update(id: number, userData: CreateUserDto): Promise<User> {
    if (isEmptyObject(userData)) throw new HttpException(400, `You're not userData`);

    const user: User = await this.repository.findOne({ id });
    if (!user) throw new HttpException(409, `The user is not found`);

    // Note: The password should be hashed from the client side
    return this.repository.save(user);
  }

  public async delete(id: number): Promise<DeleteResult> {
    const user: User = await this.repository.findOne({ id });
    if (!user) throw new HttpException(409, `You're not user`);

    return this.repository.delete({ id });; 
  }
}
