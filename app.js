const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const location = process.argv[2];

geocode(location, (err, { latitude, longitude, locationName } = {}) => {
  if (!location) {
    console.log("You need to specify a location");
  } else {
    if (err) {
      return console.log(err);
    }

    forecast(latitude, longitude, (err, forecastData) => {
      if (err) {
        return console.log(err);
      }

      console.log(locationName);
      console.log(forecastData);
    });
  }
});
