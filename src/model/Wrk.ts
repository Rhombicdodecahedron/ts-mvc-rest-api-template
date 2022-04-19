import IWrkCtrl from "./IWrkCtrl";
import ICtrlWrk from "../ctrl/ICtrlWrk";
import App from "./core/App";
import RouterCore from "./router/RouterCore";
import {Router} from "express";

/**
 * Worker class of the application.
 * @class Wrk
 * @implements {IWrkCtrl}
 * @author Alexis Stella
 * @version 1.0.0
 * @since 13.04.2022
 */
class Wrk implements IWrkCtrl {

    private _ctrl: ICtrlWrk;

    private readonly _wrkNodeServer: App;
    private readonly _wrkRouter: RouterCore;

    constructor() {
        this._ctrl = null;

        this._wrkNodeServer = new App();
        this._wrkRouter = new RouterCore();

        this._wrkRouter.setWrk(this);
    }

    public async initRouter(): Promise<Router> {
        return this._wrkRouter.init();
    }

    public getRouter(): Router {
        return this._wrkRouter.getRouter();
    }

    public async start(_port: number, _router: Router): Promise<boolean> {
        return this._wrkNodeServer.start(_port, _router);
    }

    public setCtrl(ctrl: ICtrlWrk): void {
        this._ctrl = ctrl;
    }

    public getCtrl(): ICtrlWrk {
        return this._ctrl;
    }

    handleLogin(_req, _res) {
        this.getCtrl().handleLogin(_req, _res);
    }

    handleNotFound(_req, _res) {
        this.getCtrl().handleNotFound(_req, _res);
    }

    handleRegister(_req, _res) {
        this.getCtrl().handleRegister(_req, _res);
    }

    handleLogout(_req, _res) {
        this.getCtrl().handleLogout(_req, _res);
    }
}

export default Wrk;