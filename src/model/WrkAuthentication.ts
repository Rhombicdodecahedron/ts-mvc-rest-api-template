class WrkAuthentication {

    public async isConnected(_user): Promise<boolean> {
        return new Promise((_resolve, _reject) => {
            if (_user !== null && typeof _user !== "undefined") {
                _resolve(true);

            } else {
                _resolve(false);
            }
        });
    }

}

export default WrkAuthentication;