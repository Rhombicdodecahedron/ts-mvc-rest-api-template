import express, {Express} from 'express';

import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import {Constants} from "../../app/Constants";
import * as http from "http";
import config from "../../config";

const logger = require('morgan');

class WrkNodeServer {

    private server: Express;

    private port: number;

    constructor() {
        this.port = 0;
    }

    async start(_port: number) {
        this.server = express();

        this.server.use(helmet());
        this.server.use(cors({
            origin: '*',
            allowMethods: ['GET', 'POST', 'PATCH', 'DELETE'],
            allowHeaders: ['Content-Type', 'Accept'],
            exposeHeaders: [`${Constants.API_NAME}-cache`, `${Constants.API_NAME}-response-time`],
        }));
        this.server.use(bodyParser());
        this.server.use(cookieParser());
        this.server.use(express.json());
        this.server.use(express.urlencoded({extended: false}));
        //   this.server.use(mount('/', serve('./public')));
        this.server.use(logger('dev'));
        if (process.env.NODE_ENV === 'production') {
            this.server.use(logger('common', {
                skip: function (req, res) {
                    return res.statusCode < 400
                }, stream: __dirname + '/../morgan.log'
            }));
        } else {
            this.server.use(logger('dev'));
        }

        http.createServer(this.server).listen(_port, '0.0.0.0', () => {
            console.log(`Server is listening on port ${_port}`);
            //  logger.info(`Server is listening on port ${_port}`);
            // logger.info(`Running on port: ${_port}`);
            // Handle kill commands
            /*   process.on('SIGTERM', gracefulShutdown);

               // Handle interrupts
               process.on('SIGINT', gracefulShutdown);

               // Prevent dirty exit on uncaught exceptions:
               process.on('uncaughtException', gracefulShutdown);

               // Prevent dirty exit on unhandled promise rejection
               process.on('unhandledRejection', gracefulShutdown);*/
        });

    }

}

export default WrkNodeServer;