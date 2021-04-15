const { verify } = require('jsonwebtoken');
const { User } = require('../models');

exports.validate = async (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        var token = req.headers.authorization.split(' ')[1];
        try {
            const { sUserId } = verify(token, constants.JWT_AUTH.JWT_SECRET_KEY);
            const user = await User.findOne({ sUserId });
            if (!user) return this.res.status(401).json({ status: 401, message: 'Invalid Token', error: 'Unauthorized' });
            return next();
        } catch (error) {
            return res.status(401).json({ status: 401, message: error.message });
        }
    } else {
        return res.status(401).json({
            status: 401,
            message: 'Access Denied',
            error: 'No token provided'
        })
    }
}