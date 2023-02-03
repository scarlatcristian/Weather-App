const path = require("path");
const express = require("express");
const hbs = require("hbs");
const cors = require("cors");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

// Define express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup hbs engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Cristi Scarlat",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "Page is down",
    name: "Cristi Scarlat",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Cristi Scarlat",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.adress) {
    return res.send({
      error: "Adress must be provided!",
    });
  }

  geocode(
    req.query.adress,
    (err, { latitude, longitude, locationName } = {}) => {
      if (err) return res.send({ error: err });

      forecast(latitude, longitude, (err, forecastData) => {
        if (err) return res.send({ error: err });

        res.send({
          forecast: forecastData,
          location: locationName,
          adress: req.query.adress,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search)
    res.send({
      error: "You must provide a search term",
    });

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Cristi Scarlat",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
