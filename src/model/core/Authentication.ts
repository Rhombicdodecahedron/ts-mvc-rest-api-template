class Authentication {

    public static isConnected(_req, _res, next) {
        console.log(_req.session)
        const {user} = _req.session;
        if (user !== null && typeof user !== "undefined") {
            next();
        } else {
            _res.status(401)
                .json({
                    error: true,
                    message: 'Authentication required',
                    status: 401,
                    data: null
                });
        }
    }

}

export default Authentication;