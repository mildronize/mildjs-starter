import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import HttpException from '../exceptions/HttpException';
import userModel from '../models/users.model';
import { isEmptyObject } from '../utils/util';
class AuthService {
    constructor() {
        this.users = userModel;
    }
    async signup(userData) {
        if (isEmptyObject(userData))
            throw new HttpException(400, "You're not userData");
        const findUser = this.users.find(user => user.email === userData.email);
        if (findUser)
            throw new HttpException(409, `You're email ${userData.email} already exists`);
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const createUserData = Object.assign(Object.assign({ id: (this.users.length + 1) }, userData), { password: hashedPassword });
        return createUserData;
    }
    async login(userData) {
        if (isEmptyObject(userData))
            throw new HttpException(400, "You're not userData");
        const findUser = this.users.find(user => user.email === userData.email);
        if (!findUser)
            throw new HttpException(409, `You're email ${userData.email} not found`);
        const isPasswordMatching = await bcrypt.compare(userData.password, findUser.password);
        if (!isPasswordMatching)
            throw new HttpException(409, "You're password not matching");
        const tokenData = this.createToken(findUser);
        const cookie = this.createCookie(tokenData);
        return { cookie, findUser };
    }
    async logout(userData) {
        if (isEmptyObject(userData))
            throw new HttpException(400, "You're not userData");
        const findUser = this.users.find(user => user.password === userData.password);
        if (!findUser)
            throw new HttpException(409, "You're not user");
        return findUser;
    }
    createToken(user) {
        const dataStoredInToken = { id: user.id };
        const secret = process.env.JWT_SECRET;
        const expiresIn = 60 * 60;
        return { expiresIn, token: jwt.sign(dataStoredInToken, secret, { expiresIn }) };
    }
    createCookie(tokenData) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
    }
}
export default AuthService;
//# sourceMappingURL=auth.service.js.map