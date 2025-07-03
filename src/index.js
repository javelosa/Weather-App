function renewData(response) {
  let temperatureElement = document.querySelector("#weather-temp");
  let temperature = Math.round(response.data.temperature.current);

  let cityElement = document.querySelector("#city");

  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);

  let descriptionElement = document.querySelector("#condition");
  let description = response.data.condition.description;

  let humidityElement = document.querySelector("#current-humidity");
  let humidity = response.data.temperature.humidity;

  let windElement = document.querySelector("#current-wind");
  let wind = response.data.wind.speed;

  cityElement.innerHTML = response.data.city;

  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = description;
  humidityElement.innerHTML = `${humidity}%`;
  windElement.innerHTML = `${wind}km/h`;
  temperatureElement.innerHTML = temperature;

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "04a6b97ba438oct66060d748685ff445";

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(renewData);
}

function goSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "04a6b97ba438oct66060d748685ff445";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 6) {
      forecastHtml += `
            <div class="forecast">
               <div class="forecast-day">${formatDay(day.time)}</div>
               <div><img src="${
                 day.condition.icon_url
               }" class="forecast-icon" /></div>
               <div class="forecast-temps">
                 <span class="forecast-temp-max"><strong>${Math.round(
                   day.temperature.maximum
                 )}</strong></span>
                 <span class="forecast-temp-min">${Math.round(
                   day.temperature.minimum
                 )}</span>
               </div>
            </div>
             `;
    }
  });

  let forecastElement = document.querySelector("#data-forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", goSearchSubmit);

searchCity("Barcelona");
