const jwt = require('jsonwebtoken');
const authModel = require('../api/models/auth-model');

const verifyToken = (accessToken) => {
    const result = { token: null, error: null };
    try {
        result.token = jwt.verify(accessToken, process.env.JWT_KEY);
    }
    catch (error) {
        result.error = error;
    }
    return result;
}


const jwtCookieAuth = (autoRefresh) => (req, res, next) => {
    const accessToken = req.cookies["access-token"];
    const { error, token } = verifyToken(accessToken);

    if (autoRefresh && error instanceof jwt.TokenExpiredError) {
        const refreshToken = req.cookies["refresh-token"];

        authModel.refresh(refreshToken)
            .then(({ data, error }) => {
                if (!error) {
                    const { error, token } = verifyToken(data.session.access_token);
                    if (!error) {
                        req.user = token;
                        authModel.setTokenToCookies(res, data.session);
                        console.log("Token refreshed");
                    }
                    else console.log("Invalid new Access Token");
                }
                else console.log("Invalid Refresh Token");

                next();
            });
    }
    else {
        if (!error) req.user = token;
        else console.log("Invalid Access Token");
        next();
    }
}

module.exports = jwtCookieAuth;