import { assignObject } from 'route-controller';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { MockRepository } from '../app/test';

const userData = assignObject(new User(), {
    id: 1,
    email: 'thada',
    password: 'aaa'
});

const allUserData: User[] = [userData];

describe('Test Module: Providers', () => {
    let service: UsersService;

    beforeEach(async () => {
        service = new UsersService(new MockRepository<User>(allUserData));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should be findAll', () => {
        expect(service.findAll()).resolves.toBe(allUserData);
    });

});