/*
*   weather-dashboard
*   logger.js
*
*   Global winston implementation.
*/

/* Imports & config */
const path = require("path");

require("dotenv").config({ path: path.join(__dirname, ".env") });

const winston = require("winston");
const logFile = path.join(__dirname, "/logs/log.txt");
const logger = winston.createLogger({
    format: winston.format.simple(),
    transports: [
        new winston.transports.File({ filename: logFile })
    ]
});

// Check if production is enabled
const production = (process.env.PRODUCTION == "true") ? true : false || false;

if (!production) {
    logger.add(new winston.transports.Console({ format: winston.format.simple() }));
}

// Export logger for global use
exports.logger = logger;