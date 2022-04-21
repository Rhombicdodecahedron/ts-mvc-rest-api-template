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
        this.checkToken(_req, _res, () => {
            this.checkAuth(_req, _res, () => {
                _res.status(200).send("Logout");
            });
        });
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

    private checkAuth(_req, _res, _next): void {
        const {user} = _req.session;

        this.getWrk().isConnected(user)
            .then((isConnected) => {
                if (isConnected) {
                    _next();
                } else {
                    _res.status(401)
                        .send({
                            error: true,
                            message: "You are not authorized to access this resource.",
                            status: 401
                        });
                }
            })
            .catch((err) => {
                _res.status(500)
                    .send({
                        error: true,
                        message: "Internal server error.",
                        status: 500
                    });
            });
    }

    private checkToken(_req, _res, next): void {
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
            this.getWrk().isValid(token)
                .then((result) => {
                    if (result) {
                        next();
                    } else {
                        _res.status(401)
                            .json({
                                error: true,
                                message: 'Token is not valid.',
                                status: 401
                            });
                    }
                })
                .catch((err) => {
                    _res.status(500)
                        .send({
                            error: true,
                            message: "Internal server error.",
                            status: 500
                        });
                });
        }
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