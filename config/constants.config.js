require('dotenv').config()

const constants = {
    'development': {
        BASE_URL: process.env.BASE_URL,
        PORT: process.env.PORT,
        MYSQL_CONFIG: {
            DB_DIALECT: process.env.DB_DIALECT,
            MYSQL_HOST: process.env.MYSQL_HOST,
            MYSQL_PORT: process.env.MYSQL_PORT,
            DB_NAME: process.env.DB_NAME,
            MYSQL_USERNAME: process.env.MYSQL_USERNAME,
            MYSQL_PASSWORD: process.env.MYSQL_PASSWORD
        },
        API_VERSION: 'v1',
        JWT_AUTH: {
            JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
            JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN
        }
    },
    'staging': {

    },
    'prod': {

    }
}

module.exports = constants[process.env.NODE_ENV || "development"];