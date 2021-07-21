/*
*   weather-dashboard
*   index.js
*
*   Main entry point. Run: "npm start" or "npm test"
*/

/* Imports & config */
const path = require("path");

require("dotenv").config({ path: path.join(__dirname, ".env") });

let production;
if (process.env.PRODUCTION.toLowerCase() == "true") {
    production = true;
} else {
    production = false;
}

const https = require("https");
const axios = require("axios");

const express = require("express");
const app = express();
const port = process.env.PORT || 4040;
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "/views")));

const routes = require(path.join(__dirname, "/routes.js"));
app.use("/", routes);

const logger = require(path.join(__dirname, "/logger.js")).logger;

logger.info("** weather-dashboard **");
logger.info("Logging started: " + new Date());

/* Start express server */
app.listen(port, () => {
    logger.info("Express server started. (production: " + production + ", port: " + port + ")");
});