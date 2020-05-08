window.addEventListener("load", () => {
  let long;
  let lat;
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureDegree = document.querySelector("#temperature-degree");
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperature = document.querySelector(".temperature");
  let temperatureConversion = document.querySelector(".temperature-conversion");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = `https://cors-anywhere.herokuapp.com/`;
      const apiUrl = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;

      fetch(apiUrl)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);

          let { temperature, summary, icon } = data.currently;
          // Set DOM Elements from the API
          locationTimezone.textContent = data.timezone;
          temperatureDegree.textContent = Math.round(temperature);
          temperatureDescription.textContent = summary;
          // Formula from Fahrenheit to Celsius
          let celsius = (temperature - 32) * (5 / 9);
          // Set background image
          switch (summary) {
            case "Clear":
              document.body.style.backgroundImage = 'url("src/clear-sky.jpg")';
              break;
            case "Mostly Cloudy":
              document.body.style.backgroundImage =
                'url("src/most-cloudy.png")';
              break;
            case "Rainy":
              document.body.style.backgroundImage = 'url("src/rain.jpg")';
              break;
            case "Sunny":
              document.body.style.backgroundImage = 'url("src/sunny.jpg")';
              break;
            case "Cloudy":
              document.body.style.backgroundImage = 'url("src/cloudy.jpg")';
            case "Partly Cloudy":
              document.body.style.backgroundImage =
                'url("src/partly-cloudy.png")';
          }

          // Set icon
          setIcon(icon, document.querySelector(".icon"));
          // Temperature conversion Celsius/Fahrenheit
          temperatureDegree.addEventListener("click", () => {
            if (temperatureConversion.textContent === "F") {
              temperatureConversion.textContent = "C";
              temperatureDegree.textContent = Math.round(celsius);
            } else {
              temperatureConversion.textContent = "F";
              temperatureDegree.textContent = Math.round(temperature);
            }
          });
        });
    });
  }

  function setIcon(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
