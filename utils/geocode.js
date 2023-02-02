const request = require("request");

// copy from config.env
const secretToken = "";

const geocode = (adress, callback) => {
  const url = `http://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    adress
  )}.json?access_token=${secretToken}&limit=1`;

  request({ url, json: true }, (err, { body }) => {
    if (err) callback("Unable to connect to the location services!", undefined);

    if (body.features.length === 0)
      callback("Unable to find location", undefined);

    callback(undefined, {
      latitude: body.features[0].center[1],
      longitude: body.features[0].center[0],
      locationName: body.features[0].place_name,
    });
  });
};

module.exports = geocode;
