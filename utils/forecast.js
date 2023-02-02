const request = require("request");

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=8072fb1c403773c443a8af92e8143d9f&query=${lat},${long}&units=m`;

  request({ url, json: true }, (err, { body }) => {
    if (err) callback("Unable to connect to the weather services!", undefined);

    if (body.err) callback("Unable to find the location", undefined);

    callback(
      undefined,
      `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees outside.`
    );
  });
};

module.exports = forecast;
