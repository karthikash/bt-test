/**
 * @author [Karthik Ashokkumar]
 * @email [karthikashokumar@gmail.com]
 * @create date 2021-04-15 12:13:21
 * @modify date 2021-04-15 21:05:14
 * @desc [Code Test application backend entry point]
 */

// required libraries
'use strict';

require('dotenv').config();

const http = require('http');
const app = require('express')();
const httpServer = http.createServer(app);
const { logger, constants, db, appConfig } = require('./config');

// global middleware for app instance
appConfig(app);

// establishing database connection
db
    .sequelize
    .authenticate()
    .then(() => {
        logger.info('Database is connected');
        httpServer.listen(constants.PORT, () => {
            logger.info(`Server is running at port ${constants.PORT}`);
        });        // initializing global variables
        global.logger = logger;
        global.constants = constants;
    })
    .catch((err) => {
        logger.error(`Unable to connect to database ${error.stack}`);
        process.exit(1);
    });