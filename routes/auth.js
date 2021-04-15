const AuthRouter = require('express').Router();
const { AuthController } = require('../controllers');
const validate = require('../validators');

AuthRouter.post('/register', validate('register'), AuthController.fnRegister);
AuthRouter.post('/login', validate('login'), AuthController.fnLogin);

module.exports = AuthRouter;