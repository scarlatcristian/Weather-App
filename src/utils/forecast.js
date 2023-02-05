const request = require("request");
const dotenv = require("dotenv");
const path = require("path");

// Define dotenv path to config.env
const envPath = path.join(__dirname, "../../config.env");
dotenv.config({ path: envPath });
const secretToken = process.env.ACCESS_KEY_WEATHER;

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${secretToken}&query=${lat},${long}&units=m`;

  request({ url, json: true }, (err, { body }) => {
    if (err) callback("Unable to connect to the weather services!", undefined);

    if (body.err) callback("Unable to find the location", undefined);

    callback(
      undefined,
      `${body.current.weather_descriptions[0]} / ${body.current.temperature}°C`
    );
  });
};

module.exports = forecast;
