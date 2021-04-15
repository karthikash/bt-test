const ApiRouter = require('express').Router();

const AuthRouter = require('./auth');
const UserRouter = require('./user');

ApiRouter.use('/auth', AuthRouter);
ApiRouter.use('/user', UserRouter);

module.exports = ApiRouter;