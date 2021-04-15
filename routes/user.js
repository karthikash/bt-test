const UserRouter = require('express').Router();
const { UserController } = require('../controllers');
const { AuthMiddleware } = require('../middlewares');
const validate = require('../validators');

UserRouter.get('/list', validate('get_user_list'), AuthMiddleware.validate, UserController.fnFetchUserList);

module.exports = UserRouter;