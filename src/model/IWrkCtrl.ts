import {Router} from "express";

interface IWrkCtrl {
    start(_port: number, _router: Router): Promise<boolean>;

    initRouter(): Promise<Router>;

    getRouter(): Router;
}

export default IWrkCtrl;