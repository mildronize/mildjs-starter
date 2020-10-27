import * as bcrypt from 'bcrypt';
import HttpException from '../exceptions/HttpException';
import userModel from '../models/users.model';
import { isEmptyObject } from '../utils/util';
class UserService {
    constructor() {
        this.users = userModel;
    }
    async findAllUser() {
        const users = this.users;
        return users;
    }
    async findUserById(userId) {
        const findUser = this.users.find(user => user.id === userId);
        if (!findUser)
            throw new HttpException(409, "You're not user");
        return findUser;
    }
    async createUser(userData) {
        if (isEmptyObject(userData))
            throw new HttpException(400, "You're not userData");
        const findUser = this.users.find(user => user.email === userData.email);
        if (findUser)
            throw new HttpException(409, `You're email ${userData.email} already exists`);
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const createUserData = Object.assign(Object.assign({ id: (this.users.length + 1) }, userData), { password: hashedPassword });
        return createUserData;
    }
    async updateUser(userId, userData) {
        if (isEmptyObject(userData))
            throw new HttpException(400, "You're not userData");
        const findUser = this.users.find(user => user.id === userId);
        if (!findUser)
            throw new HttpException(409, "You're not user");
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const updateUserData = this.users.map((user) => {
            if (user.id === findUser.id)
                user = Object.assign(Object.assign({ id: userId }, userData), { password: hashedPassword });
            return user;
        });
        return updateUserData;
    }
    async deleteUser(userId) {
        const findUser = this.users.find(user => user.id === userId);
        if (!findUser)
            throw new HttpException(409, "You're not user");
        const deleteUserData = this.users.filter(user => user.id !== findUser.id);
        return deleteUserData;
    }
}
export default UserService;
//# sourceMappingURL=users.service.js.map