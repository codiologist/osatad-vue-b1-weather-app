const searchLocation = document.getElementById("searchLocationInput");
const getWeatherStatusBtn = document.getElementById("getWeatherStatusBtn");
const weatherAppWrapper = document.querySelector(".wrapper");
const weatherCard = document.querySelector(".weather-card");
const weatherCardBody = document.querySelector(".weather-card-body");
const locationName = document.querySelector(".location-name h2");
const currentTemperature = document.querySelector(".temperature .temp-current span");
const maxTemperature = document.querySelector(".temperature .temp-max span");
const minTemperature = document.querySelector(".temperature .temp-min span");
const humidity = document.querySelector(".humidity p span");
const windSpeed = document.querySelector(".wind-speed p span");
const feelsLike = document.querySelector(".feels-like span");
const desc = document.querySelector(".temperature-status .desc");
const weatherIcon = document.querySelector(".weather-icon img");
const notFound = document.querySelector(".location-not-found");

const APP_API_KEY = "f2051ed6dec700dcfb5c1bc40e50917c";

const APP_API_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

searchLocation.addEventListener("input", function () {
	if (searchLocation.value === "") {
		getWeatherStatusBtn.disabled = true;
	} else {
		getWeatherStatusBtn.disabled = false;
	}
});

const getWeatherData = async (city) => {
	const response = await fetch(APP_API_URL + city + `&appid=${APP_API_KEY}`);
	const data = await response.json();

	console.log(data);

	if (data.cod === "404") {
		notFound.style.display = "block";
		weatherCardBody.style.display = "none";
		weatherCard.classList.remove("sunny-bg", "rain-bg", "cloud-bg", "haze-bg", "snow-bg");
		return;
	}
	notFound.style.display = "none";
	weatherCardBody.style.display = "block";

	locationName.innerHTML = data.name;
	currentTemperature.innerHTML = Math.round(data.main.temp);
	maxTemperature.innerHTML = Math.round(data.main.temp_max);
	minTemperature.innerHTML = Math.round(data.main.temp_min);
	feelsLike.innerHTML = Math.round(data.main.feels_like);
	humidity.innerHTML = Math.round(data.main.humidity);
	desc.innerHTML = data.weather[0].main;
	windSpeed.innerHTML = Math.round(data.wind.speed);

	switch (data.weather[0].main) {
		case "Clear":
			weatherIcon.src = "/asssets/images/icons/sunny.svg";
			weatherCard.classList.remove("rain-bg", "cloud-bg", "haze-bg", "snow-bg");
			weatherCard.classList.add("sunny-bg");
			break;

		case "Rain":
			weatherIcon.src = "/asssets/images/icons/rain.svg";
			weatherCard.classList.remove("sunny-bg", "cloud-bg", "haze-bg", "snow-bg");
			weatherCard.classList.add("rain-bg");
			break;

		case "Thunderstorm":
			weatherIcon.src = "/asssets/images/icons/thunderstorms.svg";
			weatherCard.classList.remove("sunny-bg", "cloud-bg", "haze-bg", "snow-bg");
			weatherCard.classList.add("rain-bg");
			break;

		case "Drizzle":
			weatherIcon.src = "/asssets/images/icons/moderate-rain.svg";
			weatherCard.classList.remove("sunny-bg", "cloud-bg", "haze-bg", "snow-bg");
			weatherCard.classList.add("rain-bg");
			break;

		case "Snow":
			weatherIcon.src = "/asssets/images/icons/snow.svg";
			weatherCard.classList.remove("sunny-bg", "cloud-bg", "haze-bg", "rain-bg");
			weatherCard.classList.add("snow-bg");
			break;

		case "Haze":
			weatherIcon.src = "/asssets/images/icons/haze.svg";
			weatherCard.classList.remove("sunny-bg", "cloud-bg", "snow-bg", "rain-bg");
			weatherCard.classList.add("haze-bg");
			break;

		case "Clouds":
			weatherIcon.src = "/asssets/images/icons/cloudy.svg";
			weatherCard.classList.remove("sunny-bg", "haze-bg", "snow-bg", "rain-bg");
			weatherCard.classList.add("cloud-bg");
			break;

		default:
			" ";
			weatherCard.classList.remove("sunny-bg", "haze-bg", "snow-bg", "rain-bg", "cloud-bg");
	}
};

getWeatherStatusBtn.addEventListener("click", () => {
	getWeatherData(searchLocation.value);
});
