# weather-api-wrapper
API Wrapper for Ambient Weather sensor devices. 
(https://ambientweather.docs.apiary.io/#)

## Why?
The API for these devices is simple enough to where there are 2 similar endpoints that give you a large JSON dump. This aims to bridge that gap. Instead of querying one endpoint and sorting a ton of JSON for one value, this let's you query a more specific endpoint like ```/get-wind-speed-mph```.

## Build/host
This is just a basic express app, so build and host like so:
```
git clone https://github.com/benDotDirectory/weather-api-wrapper.git ~/weather-api-wrapper
cd ~/weather-api-wrapper
npm install
npm install -g pm2
pm2 start index.js --name "weather-api-wrapper"
```

## .env
You probably want to make a ```.env``` file in the project directory, with the following values:
```
PORT=4000 # Port number to serve server off
PRODUCTION=false # Turn off 'index.html' 

MAC_ADDRESS="E0:98:06:A3:3A:32" # Mac address of weather sensor
API_KEY="_api key here_" # https://ambientweather.net/account
APP_KEY="_app key here_" # https://ambientweather.net/account
```
