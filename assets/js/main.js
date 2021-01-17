//6ff03c7dd938ec5f83f0848f7fb2180b
var apiKey = "6ff03c7dd938ec5f83f0848f7fb2180b";

var iconImgEl = document.querySelector("#wicon");

var getCityWeather = function(city) {

    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=" +apiKey+ "&units=metric";

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data){
                    console.log(data);
                    console.log(data.weather[0].icon);
                    var iconCode = data.weather[0].icon;
                    var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
                    iconImgEl.setAttribute("src", iconUrl);

                });
            } else {
                alert("error:" + response.statusText);
            }
        })
        .catch(function(error) {
            alert("Unable to connect to open weather");   
        });
}


getCityWeather("sydney")

