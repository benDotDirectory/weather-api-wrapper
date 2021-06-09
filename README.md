# weather-api-wrapper
API Wrapper for Ambient Weather sensor devices. 
(https://ambientweather.docs.apiary.io)

## Why?
The API for these devices is simple enough to where there are 2 similar endpoints that give you a large JSON dump. This is great for pulling all the data, but if you want grab one field, it would be a minor annoyance to parse the JSON for that result. This aims to bridge that gap. Instead of querying one endpoint and sorting through a ton of JSON for one value, this lets you query a more specific endpoint like ```/get-wind-speed-mph```.

## Build/host
This is just a basic express app, so build and host like so:
```
# clone repo and build
$ git clone https://github.com/benDotDirectory/weather-api-wrapper.git ~/weather-api-wrapper
$ cd ~/weather-api-wrapper
$ npm install
# install pm2 process manager to run the server
$ npm install -g pm2
$ pm2 start index.js --name "weather-api-wrapper"
```

Configure a reverse-proxy to serve the content from ```http://localhost:$port``` to ```//serverhostname``` for internal use. This has no rate-limiting built-in.

## .env
You probably want to make a ```.env``` file in the project directory, with the following values:
```
PORT=4000 # Port number to serve server off
PRODUCTION=false # Turn off 'index.html' 

MAC_ADDRESS="11:11:11:11:11:11" # Mac address of weather sensor
API_KEY="_api key here_" # https://ambientweather.net/account
APP_KEY="_app key here_" # https://ambientweather.net/account
```

## Usage
Make a ```GET``` requests to any of the endpoints listed below. Navigating to ```http://localhost:$port``` will show a test page with all the endpoints as well.

## Endpoints
- ```/list-devices```: Returns the same results as ```/devices``` from the official API
- ```/query-device-data```: Returns the same results as ```/devices?macAddress=provided_mac_addr``` from the official API
- ```/get-device-info```: Returns mac address, device name, location
- ```/get-date-utc```: Returns date in UTC format
- ```/get-date```: Returns date
- ```/get-wind-direction```: Returns wind direction
- ```/get-wind-speed-mph```: Returns wind speed in mph
- ```/get-wind-gust-mph```: Returns max wind speed in the last 10 minutes, mph
- ```/get-max-wind-speed-1d```: Returns maximum wind speed in last day, mph
- ```/get-wind-gust-direction```: Returns wind direction at which the wind gust occured, 0-360º
- ```/get-avg-wind-direction-2m```: Returns average wind direction, 2 minute avergae, mph
- ```/get-avg-wind-speed-2m```: Returns average wind speed, 2 minute average, mph
- ```/get-avg-wind-direction-10m```: Returns average wind direction, 10 minute average, 0-360º
- ```get-avg-wind-speed-10m```: Returns average wind speed, 10 minute average, mph
- ```/get-outdoor-temp-f```: Returns outdoor temperature, ºF
- ```/get-humidity```: Returns outdoor humidity, 0-100%
- ```/get-relative-pressure```: Returns relative pressure, inHg
- ```/get-absolute-pressure```: Returns absolute pressure, inHg
- ```/get-indoor-temp-f```: Returns indoor temperature, ºF
- ```/get-indoor-humidity```: Returns indoor humidity, 0-100%
- ```/get-hourly-rain-rate```: Returns hourly rain rate, in/hr
- ```/get-daily-rain-in```: Returns daily rain amount, in
- ```/get-monthly-rain-in```: Returns monthly rain amount, in
- ```/get-yearly-rain-in```: Returns yearly rain amount, in
- ```/get-feels-like-temp```: Returns "feels like" temp, ºF. if < 50ºF => Wind Chill, if > 68ºF => Heat Index (calculated on server)
- ```/get-dew-point```: Returns dew point, ºF

## Resources
- API field descriptions: https://github.com/ambient-weather/api-docs/wiki/Device-Data-Specs
- API documentation: https://ambientweather.docs.apiary.io/
- Register your weather station and get API & app keys:  https://ambientweather.net/account
