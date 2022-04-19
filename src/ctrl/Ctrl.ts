import ICtrlWrk from "./ICtrlWrk";
import IWrkCtrl from "../model/IWrkCtrl";


class Ctrl implements ICtrlWrk {

    private _wrk: IWrkCtrl;

    constructor() {
        this._wrk = null;
    }

    public async start(): Promise<void> {
        let router = await this.getWrk().initRouter();
        if (router) {
            console.log("Ctrl: Router started");
            let nodeOk = await this.getWrk().start(5002, router);
            if (nodeOk) {
                console.log("Ctrl: Node started");
            } else {
                console.log("Ctrl: Node not started");
            }
        } else {
            console.log("Error while initiating the router");
        }
    }

    public handleLogin(_req, _res): void {
        _res.status(200).send("Login");
    }

    handleLogout(_req, _res): void {
        _res.status(200).send("Logout");
    }

    handleNotFound(_req, _res): void {
        _res.status(404)
            .send({
                error: true,
                message: "The requested resource could not be found.",
                status: 404
            });
    }

    handleRegister(_req, _res): void {
        _res.status(200).send("Register");
    }

    // SETTERS & GETTERS //

    public setWrk(wrk: IWrkCtrl): void {
        this._wrk = wrk;
    }

    public getWrk(): IWrkCtrl {
        return this._wrk;
    }

    // SETTERS & GETTERS //
}

export default Ctrl;