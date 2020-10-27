import * as jwt from 'jsonwebtoken';
import HttpException from '../exceptions/HttpException';
import userModel from '../models/users.model';
function authMiddleware(req, res, next) {
    const cookies = req.cookies;
    if (cookies && cookies.Authorization) {
        const secret = process.env.JWT_SECRET;
        try {
            const verificationResponse = jwt.verify(cookies.Authorization, secret);
            const userId = verificationResponse.id;
            const findUser = userModel.find(user => user.id === userId);
            if (findUser) {
                req.user = findUser;
                next();
            }
            else {
                next(new HttpException(401, 'Wrong authentication token'));
            }
        }
        catch (error) {
            next(new HttpException(401, 'Wrong authentication token'));
        }
    }
    else {
        next(new HttpException(404, 'Authentication token missing'));
    }
}
export default authMiddleware;
//# sourceMappingURL=auth.middleware.js.map