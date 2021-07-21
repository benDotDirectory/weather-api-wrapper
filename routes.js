/*
*   weather-dashboard
*   routes.js
*
*   Handles routing for express server.
*/
 
/* Imports & config */
const path = require("path");
const routes = require("express").Router();
const https = require("https");
const http = require("http"); // @WORK
require("dotenv").config({ path: path.join(__dirname, ".env") });

let production;
if (process.env.PRODUCTION.toLowerCase() == "true") {
    production = true;
} else {
    production = false;
}

// Configure API (https://ambientweather.docs.apiary.io/)
const macAddress = process.env.MAC_ADDRESS || logger.error("No MAC_ADDRESS in .env!");
const apiKey = process.env.API_KEY || logger.error("No API_KEY in .env!");
const appKey = process.env.APP_KEY || logger.error("No APP_KEY in .env!");

const apiBase = "https://api.ambientweather.net/v1/devices";
const keys = "?applicationKey=" + appKey + "&apiKey=" + apiKey;

const listDevices = apiBase + keys;
const queryDeviceData = apiBase + "/" + macAddress + keys;

/*
*   Index
*/
routes.get("/", (req, res) => {
    if (!production) {
        res.render("index.pug");
    } else {
        return;
    }
});

/*
*   The 2 base API calls all data is derived from
*/
// list-devices
routes.get("/list-devices", (req, res) => {
    const url = listDevices;
    https.get(url, (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
            data += chunk;
        });

        resp.on("end", () => {
            res.send(JSON.parse(data));
        });
    });
});

// query-device-data
routes.get("/query-device-data", (req, res) => {
    const url = queryDeviceData;
    https.get(url, (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
            data += chunk;
        });

        resp.on("end", () => {
            res.send(JSON.parse(data));
        });
    });
});

/*
*   Specific parsed items for the wrapper 
*   https://github.com/ambient-weather/api-docs/wiki/Device-Data-Specs
*/
// get-device-info
routes.get("/get-device-info", (req, res) => {
    const url = listDevices;
    https.get(url, (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
            data += chunk;
        });

        resp.on("end", () => {
            let result = { macAddress: JSON.parse(data)[0].macAddress, name: JSON.parse(data)[0].info.name, location: JSON.parse(data)[0].info.name };
            res.send(result);
        });
    });
});

// dateutc
// Date in UTC format
routes.get("/get-date-utc", (req, res) => {
    const url = queryDeviceData;
    https.get(url, (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
            data += chunk;
        });
    
        resp.on("end", () => {
            let result = JSON.stringify(JSON.parse(data)[0].dateutc);
            res.send(result);
        });
    });
});

// date
// Date
routes.get("/get-date", (req, res) => {
    const url = queryDeviceData;
    https.get(url, (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
            data += chunk;
        });
    
        resp.on("end", () => {
            let result = JSON.stringify(JSON.parse(data)[0].date);
            res.send(result);
        });
    });
});


// winddir
// Wind direction
routes.get("/get-wind-direction", (req, res) => {
    const url = queryDeviceData;
    https.get(url, (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
            data += chunk;
        });
    
        resp.on("end", () => {
            let result = JSON.stringify(JSON.parse(data)[0].winddir);
            res.send(result);
        });
    });
});

// windspeedmph
// Wind speed in MPH
routes.get("/get-wind-speed-mph", (req, res) => {
    const url = queryDeviceData;
    https.get(url, (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
            data += chunk;
        });
    
        resp.on("end", () => {
            let result = JSON.stringify(JSON.parse(data)[0].windspeedmph);
            res.send(result);
        });
    });
});

// windgustmph
// Max wind speed in the last 10 minutes, mph
routes.get("/get-wind-gust-mph", (req, res) => {
    const url = queryDeviceData;
    https.get(url, (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
            data += chunk;
        });
    
        resp.on("end", () => {
            let result = JSON.stringify(JSON.parse(data)[0].windgustmph);
            res.send(result);
        });
    });
});

// maxdailygust
// Maximum wind speed in last day, mph
routes.get("/get-max-wind-speed-1d", (req, res) => {
    const url = queryDeviceData;
    https.get(url, (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
            data += chunk;
        });
    
        resp.on("end", () => {
            let result = JSON.stringify(JSON.parse(data)[0].maxdailygust);
            res.send(result);
        });
    });
});

// windgustdir
// Wind direction at which the wind gust occurred, 0-360º
routes.get("/get-wind-gust-direction", (req, res) => {
    const url = queryDeviceData;
    https.get(url, (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
            data += chunk;
        });
    
        resp.on("end", () => {
            let result = JSON.stringify(JSON.parse(data)[0].windgustdir);
            res.send(result);
        });
    });
});

// winddir_avg2m
// Average wind direction, 2 minute average, mph
routes.get("/get-avg-wind-direction-2m", (req, res) => {
    const url = queryDeviceData;
    https.get(url, (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
            data += chunk;
        });
    
        resp.on("end", () => {
            let result = JSON.stringify(JSON.parse(data)[0].winddir_avg2m);
            res.send(result);
        });
    });
});

// windspdmph_avg2m
// Average wind speed, 2 minute average, mph
routes.get("/get-avg-wind-speed-2m", (req, res) => {
    const url = queryDeviceData;
    https.get(url, (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
            data += chunk;
        });
    
        resp.on("end", () => {
            let result = JSON.stringify(JSON.parse(data)[0].windspdmph_avg2m);
            res.send(result);
        });
    });
});

// winddir_avg10m
// Average wind direction, 10 minute average, 0-360º
routes.get("/get-avg-wind-direction-10m", (req, res) => {
    const url = queryDeviceData;
    https.get(url, (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
            data += chunk;
        });
    
        resp.on("end", () => {
            let result = JSON.stringify(JSON.parse(data)[0].winddir_avg10m);
            res.send(result);
        });
    });
});

// windspdmph_avg10m
// Average wind speed, 10 minute average, mph
routes.get("/get-avg-wind-speed-10m", (req, res) => {
    const url = queryDeviceData;
    https.get(url, (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
            data += chunk;
        });
    
        resp.on("end", () => {
            let result = JSON.stringify(JSON.parse(data)[0].windspdmph_avg10m);
            res.send(result);
        });
    });
});

// tempf
// Outdoor Temperature, ºF
routes.get("/get-outdoor-temp-f", (req, res) => {
    const url = queryDeviceData;
    https.get(url, (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
            data += chunk;
        });
    
        resp.on("end", () => {
            let result = JSON.stringify(JSON.parse(data)[0].tempf);
            res.send(result);
        });
    });
});

// humidity
// Outdoor Humidity, 0-100%
routes.get("/get-humidity", (req, res) => {
    const url = queryDeviceData;
    https.get(url, (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
            data += chunk;
        });
    
        resp.on("end", () => {
            let result = JSON.stringify(JSON.parse(data)[0].humidity);
            res.send(result);
        });
    });
});

// baromrelin
// Relative Pressure, inHg
routes.get("/get-relative-pressure", (req, res) => {
    const url = queryDeviceData;
    https.get(url, (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
            data += chunk;
        });
    
        resp.on("end", () => {
            let result = JSON.stringify(JSON.parse(data)[0].baromrelin);
            res.send(result);
        });
    });
});

// baromabsin
// Absolute Pressure, inHg
routes.get("/get-absolute-pressure", (req, res) => {
    const url = queryDeviceData;
    https.get(url, (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
            data += chunk;
        });
    
        resp.on("end", () => {
            let result = JSON.stringify(JSON.parse(data)[0].baromabsin);
            res.send(result);
        });
    });
});

// tempinf
// Indoor Temperature, ºF
routes.get("/get-indoor-temp-f", (req, res) => {
    const url = queryDeviceData;
    https.get(url, (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
            data += chunk;
        });
    
        resp.on("end", () => {
            let result = JSON.stringify(JSON.parse(data)[0].tempinf);
            res.send(result);
        });
    });
});

// humidityin
// Indoor Humidity, 0-100%
routes.get("/get-indoor-humidity", (req, res) => {
    const url = queryDeviceData;
    https.get(url, (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
            data += chunk;
        });
    
        resp.on("end", () => {
            let result = JSON.stringify(JSON.parse(data)[0].humidityin);
            res.send(result);
        });
    });
});

// hourlyrainin
// Hourly Rain Rate, in/hr
routes.get("/get-hourly-rain-rate", (req, res) => {
    const url = queryDeviceData;
    https.get(url, (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
            data += chunk;
        });
    
        resp.on("end", () => {
            let result = JSON.stringify(JSON.parse(data)[0].hourlyrainin);
            res.send(result);
        });
    });
});

// dailyrainin
// Daily Rain, in
routes.get("/get-daily-rain-in", (req, res) => {
    const url = queryDeviceData;
    https.get(url, (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
            data += chunk;
        });
    
        resp.on("end", () => {
            let result = JSON.stringify(JSON.parse(data)[0].dailyrainin);
            res.send(result);
        });
    });
});

// monthlyrainin
// Monthly Rain, in
routes.get("/get-monthly-rain-in", (req, res) => {
    const url = queryDeviceData;
    https.get(url, (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
            data += chunk;
        });
    
        resp.on("end", () => {
            let result = JSON.stringify(JSON.parse(data)[0].monthlyrainin);
            res.send(result);
        });
    });
});

// yearlyrainin
// Yearly Rain, in
routes.get("/get-yearly-rain-in", (req, res) => {
    const url = queryDeviceData;
    https.get(url, (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
            data += chunk;
        });
    
        resp.on("end", () => {
            let result = JSON.stringify(JSON.parse(data)[0].yearlyrainin);
            res.send(result);
        });
    });
});

// feelsLike
// if < 50ºF => Wind Chill, if > 68ºF => Heat Index (calculated on server)
routes.get("/get-feels-like-temp", (req, res) => {
    const url = queryDeviceData;
    https.get(url, (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
            data += chunk;
        });
    
        resp.on("end", () => {
            let result = JSON.stringify(JSON.parse(data)[0].feelsLike);
            res.send(result);
        });
    });
});

// dewPoint
// Dew Point, ºF (calculated on server)
routes.get("/get-dew-point", (req, res) => {
    const url = queryDeviceData;
    https.get(url, (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
            data += chunk;
        });
    
        resp.on("end", () => {
            let result = JSON.stringify(JSON.parse(data)[0].dewPoint);
            res.send(result);
        });
    });
});

/*
*   Export routes
*/
module.exports = routes;