import jwt from 'jsonwebtoken';
import {Constants} from "../app/Constants";

class WrkToken {
    public async isValid(_token: string): Promise<boolean> {
        return new Promise(async (_resolve, _reject) => {
            try {
                await jwt.verify(_token, Constants.JWT_SECRET);
                _resolve(true);
            } catch (e) {
                _resolve(false);
            }
        });
    }
}

export default WrkToken;