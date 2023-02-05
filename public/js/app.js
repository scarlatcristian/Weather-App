const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector(".city");
const messageTwo = document.querySelector(".country");
const messageThree = document.querySelector(".temperature");
const messageFour = document.querySelector(".text");
const imgForecast = document.querySelector(".forecast--img");

// Submit form
weatherForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  // messageOne.textContent = "Loading...";
  // messageTwo.textContent = "";

  const location = search.value;

  try {
    const res = await fetch(`/weather?adress=${location}`);
    const data = await res.json();
    if (data.error) messageOne.textContent = data.error;

    const country = data.location;
    // .split(" ")[data.location.split(" ").length - 1];
    const city = data.location;
    // .split(" ")[0];
    const temperature = data.forecast.split("/");

    messageOne.textContent = `${city}`;
    messageTwo.textContent = country;
    messageThree.textContent = temperature[1];
    messageFour.textContent = temperature[0];

    imgForecast.src = "../img/icons/cloudy.png";

    // Change imgForecast
    const r = temperature[0].split(" ");
    if (r.includes("sunny")) imgForecast.src = "../img/icons/sunny.png";
    if (r.includes("rain")) imgForecast.src = "../img/icons/rain.png";
    if (r.includes("snow")) imgForecast.src = "../img/icons/snow.png";

    imgForecast.style.opacity = 1;
  } catch (error) {
    console.error(error);
    messageOne.textContent = "An error occurred while fetching the data.";
  }
  document.querySelector("input").value = "";
});
