import {Constants} from '../app/Constants';

export default class Utils {
    static normalizePort(val) {
        const port = parseInt(val, 10);
        if (Number.isNaN(port)) {
            return val;
        }
        if (port >= 0) {
            return port;
        }
        return false;
    }

    static async responseTime(ctx, next) {
        const start = Date.now();
        await next();
        const ms = Date.now() - start;
        ctx.set(`${Constants.API_NAME}-response-time`, `${ms}ms`);
    }

    static msToDate(ms) {
        const date = new Date(ms);
        return date.toLocaleString();
    }
}

