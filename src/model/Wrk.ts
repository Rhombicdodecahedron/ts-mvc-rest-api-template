import IWrkCtrl from "./IWrkCtrl";
import ICtrlWrk from "../ctrl/ICtrlWrk";
import WrkNodeServer from "./core/WrkNodeServer";

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

    private _wrkNodeServer: WrkNodeServer;

    constructor() {
        this._ctrl = null;

        this._wrkNodeServer = new WrkNodeServer();
    }

    async start(_port: number) {
        await this._wrkNodeServer.start(_port);
    }

    public setCtrl(ctrl: ICtrlWrk): void {
        this._ctrl = ctrl;
    }

    public getCtrl(): ICtrlWrk {
        return this._ctrl;
    }
}

export default Wrk;