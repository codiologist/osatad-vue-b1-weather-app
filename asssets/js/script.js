const searchLocation = document.getElementById("searchLocationInput");
const getWeatherStatusBtn = document.getElementById("getWeatherStatusBtn");
const weatherAppWrapper = document.querySelector(".wrapper");
const weatherCard = document.querySelector(".weather-card");
const weatherCardBody = document.querySelector(".weather-card-body");
const locationName = document.querySelector(".location-name h2");
const locationTime = document.querySelector(".location-name h4");
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

//Disabale Search Button
searchLocation.addEventListener("input", function () {
	if (searchLocation.value === "") {
		getWeatherStatusBtn.disabled = true;
	} else {
		getWeatherStatusBtn.disabled = false;
	}
});

//Get Weather Data Funcion From API
const getWeatherData = async (city) => {
	const response = await fetch(APP_API_URL + city + `&appid=${APP_API_KEY}`);
	const data = await response.json();

	console.log(data);

	if (data.cod === "404") {
		notFound.style.display = "block";
		weatherCardBody.style.display = "none";
		weatherCard.classList.remove("sunny", "raining", "cloudy", "haze", "snow");
		return;
	}

	const timezone = data.timezone; 
	const timezoneInMinutes = timezone / 60;
	const currTime = moment().utcOffset(timezoneInMinutes).format("h:mm A");
	

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
	locationTime.innerHTML = currTime
	

	//Changing icons and backgrounds logic
	switch (data.weather[0].main) {
		case "Clear":
			weatherIcon.src = "/asssets/images/icons/sunny.svg";
			weatherAppWrapper.classList.remove("raining", "cloudy", "haze", "snow");
			weatherAppWrapper.classList.add("sunny");
			break;

		case "Rain":
			weatherIcon.src = "/asssets/images/icons/rain.svg";
			weatherAppWrapper.classList.remove("sunny", "cloudy", "haze", "snow");
			weatherAppWrapper.classList.add("raining");
			break;

		case "Thunderstorm":
			weatherIcon.src = "/asssets/images/icons/thunderstorms.svg";
			weatherAppWrapper.classList.remove("sunny", "cloudy", "haze", "snow");
			weatherAppWrapper.classList.add("raining");
			break;

		case "Drizzle":
			weatherIcon.src = "/asssets/images/icons/moderate-rain.svg";
			weatherAppWrapper.classList.remove("sunny", "cloudy", "haze", "snow");
			weatherAppWrapper.classList.add("raining");
			break;

		case "Snow":
			weatherIcon.src = "/asssets/images/icons/snow.svg";
			weatherAppWrapper.classList.remove("sunny", "raining", "cloudy", "haze");
			weatherAppWrapper.classList.add("snow");
			break;

		case "Haze":
			weatherIcon.src = "/asssets/images/icons/haze.svg";
			weatherAppWrapper.classList.remove("sunny", "raining", "cloudy", "snow");
			weatherAppWrapper.classList.add("haze");
			break;

		case "Clouds":
			weatherIcon.src = "/asssets/images/icons/cloudy.svg";
			weatherAppWrapper.classList.remove("sunny", "raining", "haze", "snow");
			weatherAppWrapper.classList.add("cloudy");
			break;
	}
};

// Calling Get Weather Data Funcion
getWeatherStatusBtn.addEventListener("click", () => {
	getWeatherData(searchLocation.value);
});
