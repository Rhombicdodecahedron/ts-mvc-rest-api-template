import {Application, Router} from 'express';

import express = require('express');

import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import session from 'express-session';

import {Constants} from "../../app/Constants";
import * as http from "http";

const logger = require('morgan');

class App {

    private server: Application;

    private port: number;

    constructor() {
        this.port = 0;
    }

    async start(_port: number, _router: Router): Promise<boolean> {
        return new Promise(async (_resolve, _reject) => {
            try {
                this.server = express();

                let sess = {
                    secret: 'keyboard sdlkflksdf',
                    resave: true,
                    saveUninitialized: true,
                    cookie: {
                        maxAge: undefined,
                        expires: undefined
                    },
                }
                const week = (604800) * 1000;
                sess.cookie.expires = new Date(Date.now() + week)
                sess.cookie.maxAge = week
                /*    if (app.get('env') === 'production') {
                        app.set('trust proxy', 1) // trust first proxy
                        sess.cookie.secure = true // serve secure cookies
                    }*/
                this.server.use(session(sess));

                this.server.use(_router)
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
                        skip: function (_req, res) {
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
                _resolve(true);
            } catch (e) {
                _resolve(false);
            }
        });
    }
}

export default App;