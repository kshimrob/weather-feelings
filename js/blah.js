// functions
function findUserLocation() {
  // grab user location coords
  var URL = "http://ip-api.com/json";
  $.get(URL, function(data) {
    // if coords, assign to variables and pass to getWeatherData();
    if (data) {
      var lat = data.lat;
      var lon = data.lon;
      getWeatherData(lat, lon);
      // else error
    } else {
      var error = "There was an error fetching your location, please try again later.";
      alert(error);
    }
  });
}

function getWeatherData(lat, lon, units = "metric") {
  // use user coords to construct api call URL
  var API_KEY = "8e3d5fb059aff365a9f81937943b8c4b";
  var apiUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=" + units + "&appid=" + API_KEY;
  // weather API call
  $.get(apiUrl, function(data) {
    // if data, parse JSON from api3
    if (data) {
      var city = data.name;
      var temp = Math.round(data.main.temp);
      var weather = data.weather[0].main;
      var icon = "http://openweathermap.org/img/w/" + data.weather[0].icon +".png";
      var humidity = data.main.humidity;
      updatePageData(city, temp, weather, icon, humidity)
        // else error
    } else {
      var error = "There was an error checking your weather. Please try again later.";
      alert(error);
    }
  });
}

function updatePageData(city, temp, weather, icon, humidity) {
  // update data on page + background with weather data
  var html = "<p>" + city + "</p>";
  html += "<p id='temp'><span id='degrees'>" + temp + "</span>&deg; <a id='convert'>C</a></p>";
  html += "<p>" + weather + " <img src='" + icon + "'></p>";
  html += "<p>" + humidity + "&#37; Humidity</p>";
  $("#data").html(html);
}

function convertToF(temp) {
  return Math.round((temp * 1.8) + 32); 
}

function convertToC(temp) {
  return Math.round((temp - 32) * .55556);
}
3
// runtime
$(document).ready(function() {
  // Handler for .ready() called. 
  findUserLocation();

$(document).on("click", "#convert", function() {
  var unit = $(this).html();
  var temp = $("#degrees").html();
  if (unit === "C") {
    var newTemp = convertToF(temp);
    var html = "<p id='temp'><span id='degrees'>" + newTemp + "</span>&deg; <a id='convert'>F</a></p>";
    $("#temp").html(html);   
  } else if (unit === "F") {
    var newTemp = convertToC(temp);
    var html = "<p id='temp'><span id='degrees'>" + newTemp + "</span>&deg; <a id='convert'>C</a></p>";
    $("#temp").html(html);  
  }
  });
  
});