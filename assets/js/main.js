//6ff03c7dd938ec5f83f0848f7fb2180b
var apiKey = "6ff03c7dd938ec5f83f0848f7fb2180b";

var today = moment().format("L");
console.log(today);


var mainIconEl = document.querySelector("#main-icon");
var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city-name");
var cityTitleEl = document.querySelector("#city-title");
var spanTempEl = document.querySelector("#city-temp");
var spanHumidityEl = document.querySelector("#city-humidity");
var spanWindSpeedEl = document.querySelector("#city-wind-speed");
var spanUvEl = document.querySelector("#city-uv");
// 5 day date elements
var dateEl1 = document.querySelector("#date1");
var dateEl2 = document.querySelector("#date2");
var dateEl3 = document.querySelector("#date3");
var dateEl4 = document.querySelector("#date4");
var dateEl5 = document.querySelector("#date5");

// 5 day icon elements
var iconImgEl = document.querySelector("#wicon");
var iconImgEl1 = document.querySelector("#wicon1");
var iconImgEl2 = document.querySelector("#wicon2");
var iconImgEl3 = document.querySelector("#wicon3");
var iconImgEl4 = document.querySelector("#wicon4");
// 5 day temp elements
var spanTempEl1 = document.querySelector("#city-temp1");
var spanTempEl2 = document.querySelector("#city-temp2");
var spanTempEl3 = document.querySelector("#city-temp3");
var spanTempEl4 = document.querySelector("#city-temp4");
var spanTempEl5 = document.querySelector("#city-temp5");
// 5 humidity elements
var spanHumidityEl1 = document.querySelector("#city-humidity1");
var spanHumidityEl2 = document.querySelector("#city-humidity2");
var spanHumidityEl3 = document.querySelector("#city-humidity3");
var spanHumidityEl4 = document.querySelector("#city-humidity4");
var spanHumidityEl5 = document.querySelector("#city-humidity5");




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
                    // latitude and longitude of users search city to use second api fetch below
                    var lon = data.coord.lon;
                    var lat = data.coord.lat;
                    // Display city name and date
                    var cityTitle = data.name;
                    cityTitleEl.textContent = cityTitle + " " +"(" + today + ")";
                    var mainIconCode = data.weather[0].icon;
                    var mainIconUrl = "http://openweathermap.org/img/w/" + mainIconCode + ".png";
                    mainIconEl.setAttribute("src", mainIconUrl);
                    console.log(mainIconEl, mainIconCode, mainIconUrl);
                    // Displays current temp/humidity/wind speed/Uv index
                    var cityTemp = data.main.temp;
                    var cityTemp = Math.round(cityTemp) + " °C";
                    spanTempEl.textContent = cityTemp;
                    var cityHumidity = data.main.humidity;
                    spanHumidityEl.textContent = cityHumidity + "%" ;
                    var cityWindSpeed = data.wind.speed;
                    spanWindSpeedEl.textContent = cityWindSpeed + " KMH";
                    
                    return fetch (
                        "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=hourly&appid="+ apiKey + "&units=metric"
                    ).then(function (response) {
                        if (response.ok) {
                            response.json().then(function(data){
                                console.log(data);
                                // UV index
                                var uvIndex = data.current.uvi;
                                spanUvEl.textContent = uvIndex;
                                if(uvIndex >= 3 && uvIndex <= 5) {
                                    spanUvEl.classList.add("yellow");
                                } else if (uvIndex >= 6 && uvIndex <= 7) {
                                    spanUvEl.classList.add("orange");
                                } else if (uvIndex >= 8 && uvIndex <=10) {
                                    spanUvEl.classList.add("red");
                                } else if (uvIndex >=11) {
                                    spanUvEl.classList.add("violet");
                                } else {
                                    spanUvEl.classList.add("green");
                                }
                                // 5 day forecast cards
                                // card #1
                                dateEl1.textContent = moment().add(1, 'days').format("L")
                                var iconCode = data.daily[0].weather[0].icon;
                                var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
                                iconImgEl.setAttribute("src", iconUrl);
                                var cityTemp1 = data.daily[0].temp.max;
                                var cityTemp1 = Math.round(cityTemp1) + "°C";
                                spanTempEl1.textContent = cityTemp1;
                                var cityHumidity1 = data.daily[0].humidity;
                                spanHumidityEl1.textContent = cityHumidity1 + "%";


                                // card #2
                                dateEl2.textContent = moment().add(2, 'days').format("L")
                                var iconCode1 = data.daily[0].weather[0].icon;
                                var iconUrl1 = "http://openweathermap.org/img/w/" + iconCode1 + ".png";
                                iconImgEl1.setAttribute("src", iconUrl1);
                                var cityTemp2 = data.daily[1].temp.max;
                                var cityTemp2 = Math.round(cityTemp2) + "°C";
                                spanTempEl2.textContent = cityTemp2;
                                var cityHumidity2 = data.daily[1].humidity;
                                spanHumidityEl2.textContent = cityHumidity2 + "%";

                                // card #3
                                dateEl3.textContent = moment().add(3, 'days').format("L")
                                var iconCode2 = data.daily[2].weather[0].icon;
                                var iconUrl2 = "http://openweathermap.org/img/w/" + iconCode2 + ".png";
                                iconImgEl2.setAttribute("src", iconUrl2);
                                var cityTemp3 = data.daily[2].temp.max;
                                var cityTemp3 = Math.round(cityTemp3) + "°C";
                                spanTempEl3.textContent = cityTemp3;
                                var cityHumidity3 = data.daily[2].humidity;
                                spanHumidityEl3.textContent = cityHumidity3 + "%";

                                // card #4
                                dateEl4.textContent = moment().add(4, 'days').format("L")
                                var iconCode3 = data.daily[3].weather[0].icon;
                                var iconUrl3 = "http://openweathermap.org/img/w/" + iconCode3 + ".png";
                                iconImgEl3.setAttribute("src", iconUrl3);
                                var cityTemp4 = data.daily[3].temp.max;
                                var cityTemp4 = Math.round(cityTemp4) + "°C";
                                spanTempEl4.textContent = cityTemp4;
                                var cityHumidity4 = data.daily[3].humidity;
                                spanHumidityEl4.textContent = cityHumidity4 + "%";
                                
                                // card #5
                                dateEl5.textContent = moment().add(5, 'days').format("L")
                                var iconCode4 = data.daily[4].weather[0].icon;
                                var iconUrl4 = "http://openweathermap.org/img/w/" + iconCode4 + ".png";
                                iconImgEl4.setAttribute("src", iconUrl4);
                                var cityTemp5 = data.daily[4].temp.max;
                                var cityTemp5 = Math.round(cityTemp5) + "°C";
                                spanTempEl5.textContent = cityTemp5;
                                var cityHumidity5 = data.daily[4].humidity;
                                spanHumidityEl5.textContent = cityHumidity5 + "%";

                            });
                        } else {
                            alert("error:" + response.statusText); 
                        }
                    })
                    .catch(function (error) {
                        alert("Unable to connect to open weather");
                    });




                    


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