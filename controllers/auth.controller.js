const { AuthService } = require('../services');

const fnRegister = async (req, res, next) => {
    try {
        const auth = new AuthService(req, res);
        return auth.register();
    } catch (error) {
        logger.error(error);
        return next(error);
    }
}

const fnLogin = async (req, res, next) => {
    try {
        const auth = new AuthService(req, res);
        return auth.login();
    } catch (error) {
        logger.error(error);
        return next(error);
    }
}

module.exports = {
    fnRegister,
    fnLogin
}