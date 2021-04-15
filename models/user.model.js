const { DataTypes } = require('sequelize');
const { Employee } = require('.');
const { sequelize } = require('../config/database.config');

const User = sequelize.define('users', {
    sUserId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    sEmployeeId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        references: {         // WorkingDays hasMany Users n:n
            model: 'Employee',
            key: 'sEmployeeId'
        },
        unique: true,
        allowNull: false
    },
    sFirstName: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    sLastName: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    sEmail: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
    },
    sPassword: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    sSalt: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    timestamps: true
});

User.sync({force: false});
User.sync({alter: false});

module.exports = User;