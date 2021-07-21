/*
*   weather-api-test
*   index.js
*
*   Main entry point. Run "npm start" or "npm test"
*/

// Imports & config
const fs = require("fs");
const path = require("path");

require("dotenv").config({ path: path.join(__dirname, ".env") });

const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

const pug = require("pug");
const axios = require("axios");

// Production?
let productionEnabled;
if (process.env.PRODUCTION == "true") {
    productionEnabled = true;
} else {
    productionEnabled = false;
}

const winston = require("winston");
const logFile = process.env.LOG_FILE || path.join(__dirname, "/logs/log.txt");
const logger = winston.createLogger({
    format: winston.format.simple(),
    transports: [
        new winston.transports.File({ filename: logFile })
    ]
});

if (!productionEnabled) {
    logger.add(new winston.transports.Console({ format: winston.format.simple() }));
}

// Start express
app.listen(port, () => {
    logger.info("Express server listening (port: " + port + ")");
});