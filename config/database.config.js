const Sequelize = require('sequelize');
const constants = require('./constants.config');

const sequelize = new Sequelize(constants.MYSQL_CONFIG.DB_NAME, constants.MYSQL_CONFIG.MYSQL_USERNAME, constants.MYSQL_CONFIG.MYSQL_PASSWORD, {
    host: constants.MYSQL_CONFIG.MYSQL_HOST,
    port: constants.MYSQL_CONFIG.MYSQL_PORT,
    dialect: constants.MYSQL_CONFIG.DB_DIALECT,
    operatorsAliases: 0,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;