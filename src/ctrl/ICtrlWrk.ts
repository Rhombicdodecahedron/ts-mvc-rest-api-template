export interface ICtrlWrk {

    handleLogin(_req, _res): void;

    handleNotFound(_req, _res): void;

    handleRegister(_req, _res): void;

    handleLogout(_req, _res): void;
}

export default ICtrlWrk;