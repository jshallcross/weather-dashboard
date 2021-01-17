//6ff03c7dd938ec5f83f0848f7fb2180b
var apiKey = "6ff03c7dd938ec5f83f0848f7fb2180b";

var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city-name");
var cityTitleEl = document.querySelector("#city-title");
var spanTempEl = document.querySelector("#city-temp");
var spanHumidityEl = document.querySelector("#city-humidity");
var spanWindSpeedEl = document.querySelector("#city-wind-speed");
var spanUvEl = document.querySelector("#city-uv");
var iconImgEl = document.querySelector("#wicon");



var searchSubmitHandler = function(event) {
    event.preventDefault();
    var cityName = cityInputEl.value.trim();

    if (cityName) {
        getCityWeather(cityName);
        cityInputEl.value = "";
    } else {
        alert("Please enter a city name");
    }
}




var getCityWeather = function(city) {

var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=" +apiKey+ "&units=metric";

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data){
                    console.log(data);
                    var iconCode = data.weather[0].icon;
                    var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
                    iconImgEl.setAttribute("src", iconUrl);
                    var cityTitle = data.name;
                    cityTitleEl.textContent = cityTitle;
                    var cityTemp = data.main.temp;
                    var cityTemp = Math.round(cityTemp) + " °C";
                    spanTempEl.textContent = cityTemp;
                    var cityHumidity = data.main.humidity;
                    spanHumidityEl.textContent = cityHumidity + " %";
                    var cityWindSpeed = data.wind.speed;
                    spanWindSpeedEl.textContent = cityWindSpeed + " km/h";


                });
            } else {
                alert("error:" + response.statusText);
            }
        })
        .catch(function(error) {
            alert("Unable to connect to open weather");   
        });
}






searchFormEl.addEventListener("submit", searchSubmitHandler);