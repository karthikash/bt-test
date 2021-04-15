const { Op } = require("sequelize");
const { User, Employee } = require("../models");

class UserService {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async userList() {
        try {
            User.belongsTo(Employee, { foreignKey: 'sEmployeeId' });
            let { sFirstName, sLastName, sEmployeeId, sort, order, offset, limit } = this.req.query;
            let user = await User.findAll({
                attributes: ['sUserId', 'sFirstName', 'sLastName', 'sEmail', 'sEmployeeId'],
                include: [{
                    model: Employee,
                    attributes: ['sEmployeeId', 'sOrganization']
                }],
                where: {
                    [Op.or]: [
                        { sFirstName: { [Op.like]: `%${sFirstName}%` } },
                        { sLastName: { [Op.like]: `%${sLastName}%` } },
                        { sEmployeeId: { [Op.like]: `%${sEmployeeId}%` } }
                    ]
                },
                order: [[sort, order]],
                offset: parseInt(offset),
                limit: parseInt(limit)
            });
            let result = [];
            user.forEach((e) => {
                let obj = {
                    sUserId: e.sUserId,
                    sFirstName: e.sFirstName,
                    sLastName: e.sLastName,
                    sEmail: e.sEmail,
                    sEmployeeId: e.sEmployeeId,
                    sOrganization: e.employee.sOrganization
                };
                result.push(obj);
            });
            if (!result.length) return this.res.status(404).json({ code: 0, message: 'No users found', error: 'Not Found' });
            return this.res.status(200).json({ code: 1, message: 'Users List', data: result });
        } catch (error) {
            return this.res.status(500).json({ code: 0, message: error.message, error: error.name });
        }
    }
}

module.exports = UserService;