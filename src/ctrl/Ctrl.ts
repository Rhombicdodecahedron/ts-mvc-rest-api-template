import ICtrlWrk from "./ICtrlWrk";
import IWrkCtrl from "../model/IWrkCtrl";


class Ctrl implements ICtrlWrk {

    private _wrk: IWrkCtrl;

    constructor() {
        this._wrk = null;
    }

    public start(): void {
        this.getWrk().start(1233)
        console.log("Ctrl.start");
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