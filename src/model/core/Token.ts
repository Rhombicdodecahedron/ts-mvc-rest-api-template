import jwt from 'jsonwebtoken';
import {Constants} from "../../app/Constants";

class Token {

    public static generateToken(user: any) {
        return jwt.sign(user, Constants.JWT_SECRET, {
            //  expiresIn: Constants.TOKEN_EXPIRATION
        });
    }

    public static token(_req, _res, next): void {
        const token = _req.header('x-auth-token');
        // Check for token
        if (!token) {
            _res.status(401)
                .json({
                    error: true,
                    message: 'No token provided.',
                    status: 401
                });
        } else {
            try {
                _req.user = jwt.verify(token, Constants.JWT_SECRET);
                next();
            } catch (e) {
                _res.status(400)
                    .json({
                        error: true,
                        message: 'Invalid token.',
                        status: 400
                    });
            }
        }
    }
}

export default Token;