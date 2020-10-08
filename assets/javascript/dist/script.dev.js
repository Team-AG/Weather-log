"use strict";

var apiKey = "b5a35e7e4d304e38a711535bd203a2c3";
$("#submitCity").on("click", function () {
  $(".jumbotron").remove();
  var city = inputCity.val();
  var currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
  $.ajax({
    url: currentWeatherUrl,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    var dailyTempLog = kelvinToCelsius(response.main.temp) + "\xB0" + "F";
    var humidity = response.main.humidity + "%";
    var windSpeed = response.wind.speed + " MPH";
    var cityName = response.name;
    var jumbotron = $("<div>");
    var container = $("<div>");
    var cityHeading = $("<h1>");
    var weatherInfo = $("<p>");
    var date = new Date();
    jumbotron.addClass("jumbotron jumbotron-fluid");
    container.addClass("container");
    cityHeading.addClass("display-4");
    weatherInfo.addClass("lead");
    cityHeading.text(cityName);
    cityHeading.append("&nbsp;&nbsp;&nbsp;&nbsp;" + "(" + date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear() + ")");
    weatherInfo.text("Temperature: " + dailyTempLog);
    weatherInfo.append("<br>");
    weatherInfo.append("Humidity: " + humidity);
    weatherInfo.append("<br>");
    weatherInfo.append("Wind Speed: " + windSpeed);
    weatherInfo.append("<br>");
    $(divCol).append(jumbotron);
    $(jumbotron).append(container);
    $(container).append(cityHeading);
    $(container).append(weatherInfo); // uv index api

    var lat = response.coord.lat;
    var _long = response.coord.lon;
    var uvUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + _long + "&appid=b5a35e7e4d304e38a711535bd203a2c3";
    $.ajax({
      url: uvUrl,
      method: "GET"
    }).then(function (response) {
      var uvIndex = response.value;
      console.log(response);
      weatherInfo.append("UV Index: " + uvIndex);
    });
    var apiKey = "b5a35e7e4d304e38a711535bd203a2c3";
    var fiveDayForecastUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + _long + "&appid=" + apiKey;
    $.ajax({
      url: fiveDayForecastUrl,
      method: "GET"
    }).then(function (response) {
      console.log(response);

      for (var i = 0; i < 5; i++) {}
    });
  });
});

function kelvinToCelsius(kelvin) {
  var celsius = kelvin - 273.15;
  return Math.round(celsius * 9 / 5 + 32);
}