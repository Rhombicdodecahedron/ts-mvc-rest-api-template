import {Router} from "express";

import express = require("express");
import Wrk from "../Wrk";
import {Constants} from "../../app/Constants";

class RouterCore {

    private _wrk: Wrk;
    private router: Router;

    constructor() {
        this._wrk = null;
        this.router = null;
    }

    public getRouter(): Router {
        return this.router;
    }

    public async init(): Promise<Router> {
        return new Promise(async (_resolve, _reject) => {
            try {
                this.router = express.Router();

                await this.router.get(`${Constants.API_URL}/login`, (_req, _res) => this.getWrk().handleLogin(_req, _res));
                await this.router.get(`${Constants.API_URL}/logout`, (_req, _res) => this.getWrk().handleLogout(_req, _res));
                await this.router.get(`${Constants.API_URL}/register`, (_req, _res) => this.getWrk().handleRegister(_req, _res));

                await this.router.get("*", (_req, _res) => this.getWrk().handleNotFound(_req, _res));

                _resolve(this.router);
            } catch (e) {
                _resolve(null);
            }
        });
    }

    public getWrk(): Wrk {
        return this._wrk;
    }

    public setWrk(wrk: Wrk) {
        this._wrk = wrk;
    }
}

export default RouterCore;