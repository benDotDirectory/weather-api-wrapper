/*
*   weather-dashboard
*   index.js
*
*   Main entry point. Run: "npm start" or "npm test"
*/

/* Imports & config */
const path = require("path");

require("dotenv").config({ path: path.join(__dirname, ".env") });

const production = (process.env.PRODUCTION == "true") ? true : false || false;

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

// Configure API (https://ambientweather.docs.apiary.io/)
const macAddress = process.env.MAC_ADDRESS || logger.error("No MAC_ADDRESS in .env!");
const apiKey = process.env.API_KEY || logger.error("No API_KEY in .env!");
const appKey = process.env.APP_KEY || logger.error("No APP_KEY in .env!");

//const apiBase = "https://private-anon-c466bd994e-ambientweather.apiary-proxy.com/v1/devices/";
const apiBase = "https://api.ambientweather.net/v1/devices";
const keys = "?applicationKey=" + appKey + "&apiKey=" + apiKey;

// Get device data
app.get("/device-data", (req, res) => {
    const url = apiBase + macAddress + keys + "&limit=5";
    https.get(url, (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
            data += chunk;
        });

        resp.on("end", () => {
            res.send(data);
        });
    });
});

/* Start express server */
app.listen(port, () => {
    logger.info("Express server started. (production: " + production + ", port: " + port + ")");
});