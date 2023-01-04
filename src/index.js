function formateDate(date) {
  let months = [
    "January",
    "Feburary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];

  let currentDate = date.getDate();
  let year = date.getFullYear();

  let dayIndex = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let day = days[dayIndex];

  let hour = now.getHours();
  if (hour < 10) {
    hour = `${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  return `${day} ${month} ${currentDate}, ${year} ${hour}:${minute}`;
}

function searchLocation(position) {
  let apiKey = "57b2c40fdae71a6ba41d72685e3226e2";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
}

function searchCity(city) {
  let apiKey = "57b2c40fdae71a6ba41d72685e3226e2";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
}

function displayWeather(response) {
  document.querySelector("#cityName").innerHTML = response.data.name;
  document.querySelector("#cityTemp").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidityPercent").innerHTML =
    response.data.main.humidity;
  document.querySelector("#windMph").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  console.log(response.data);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let now = new Date();
let h2 = document.querySelector("h2");
h2.innerHTML = formateDate(now);

//challenge 2
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");
