import {Router} from "express";

interface IWrkCtrl {
    start(_port: number, _router: Router): Promise<boolean>;

    initRouter(): Promise<Router>;

    getRouter(): Router;

    isValid(_token: string): Promise<boolean>;

    isConnected(_user): Promise<boolean>;
}

export default IWrkCtrl;