const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#city");
const messageTwo = document.querySelector("#country");
const messageThree = document.querySelector("#weather");

// Submit form
weatherForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  const location = search.value;

  try {
    const res = await fetch(`/weather?adress=${location}`);
    const data = await res.json();
    if (data.error) messageOne.textContent = data.error;

    const country =
      data.location.split(" ")[data.location.split(" ").length - 1];
    const city = data.location.split(" ")[0];

    messageOne.textContent = city;
    messageTwo.textContent = country;
    messageThree.textContent = data.forecast;
  } catch (error) {
    console.error(error);
    messageOne.textContent = "An error occurred while fetching the data.";
  }
  document.querySelector("input").value = "";
});
