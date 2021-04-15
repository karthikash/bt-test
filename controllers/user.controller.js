const { UserService } = require('../services');

const fnFetchUserList = async (req, res, next) => {
    try {
        const user = new UserService(req, res);
        return user.userList();
    } catch (error) {
        logger.error(error);
        return next(error);
    }
}

module.exports = {
    fnFetchUserList
}