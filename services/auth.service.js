const { hash, genSalt } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { User, Employee } = require('../models');

class AuthService {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    signToken(payload) {
        const token = sign(payload, constants.JWT_AUTH.JWT_SECRET_KEY, { expiresIn: parseInt(constants.JWT_AUTH.JWT_EXPIRES_IN) });
        return token;
    }

    async hashPassword(sPassword, sSalt) {
        return await hash(sPassword, sSalt);
    }

    async register() {
        const { sEmail, sPassword } = this.req.body;
        const user = await User.findOne({ where: { sEmail } });
        if (user) return this.res.status(409).json({ status: 409, message: 'User already registered, Please Login', error: 'Conflict' });
        const salt = await genSalt();
        this.req.body.sSalt = salt;
        this.req.body.sPassword = await this.hashPassword(sPassword, salt);
        this.req.body.sEmail = sEmail.toLowerCase();
        const employee = await Employee.create({ sOrganization: this.req.body.sOrganization });
        this.req.body.sEmployeeId = employee.sEmployeeId;
        await User.create(this.req.body);
        return this.res.status(201).json({ status: 201, message: 'User Registered' });
    }

    async login() {
        const { sEmail, sPassword } = this.req.body;
        const user = await User.findOne({ where: { sEmail } });
        if (!user) return this.res.status(404).json({ status: 404, message: `User not Registered`, error: 'Not Found' });
        if (user.sPassword !== await this.hashPassword(sPassword, user.sSalt)) {
            return this.res.status(401).json({ status: 401, message: 'Incorrect Password', error: 'Unauthorized' });
        }
        const { sUserId } = user;
        const token = this.signToken({ sUserId });
        return this.res.status(200).json({ status: 200, message: 'Login Success', token, sUserId });
    }

}

module.exports = AuthService;