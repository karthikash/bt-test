const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database.config');

const Employee = sequelize.define('employees', {
    sEmployeeId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    sOrganization: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    timestamps: true
});

Employee.sync({ force: false });
Employee.sync({ alter: false });

module.exports = Employee;