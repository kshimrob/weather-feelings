//need to fix coordinates

function findUserLocation() {
  //grab user coordinates
  var URL = "http://ip-api.com/json"
  $.get(URL, function(data) {
    //if there are coordinates, grab them and send to weather function
    if (data) {
      var lat = data.lat;
      var lon = data.lon;
      getWeatherData(lat, lon);
    } else {
      alert("There was an issue with fetching your location, please try again later.");
    }
  });
}

// function findUserLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
//   } else {
//     alert("You're browser does not support geolocation.");
//   }
// }

// function successCallback(position) {
//   var lat = position.coords.latitude;
//   var lon = position.coords.longitude;
//   getWeatherData(lat, lon);
// }

// function errorCallback(error) {
//   var errors = { 
//     1: 'Permission denied',
//     2: 'Position unavailable',
//     3: 'Request timeout'
//   };
//   alert("Error: " + errors[error.code]);
// }

function getWeatherData(lat, lon, units = "metric") {
  var API_KEY = "ab523a417ca668db54af9e181900f132"
  var apiUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=" + units + "&appid=" + API_KEY;

  $.get(apiUrl, function(data) {
    if (data) { 
    var city = data.name;
    var temp = data.main.temp;
    var weather = data.weather[0].description;
    var icon = data.weather[0].icon;
    updatePageData(city, temp, weather, icon);
    } else {
      alert("There was an issue getting your weather, please try again later.")
    }
  });
}

function feelingsUpdate (weather) {
  switch(weather) {
    case "clear sky":
      return "jubilant.";
      break;
    case "few clouds":
      return "joyful.";
      break;
    case "scattered clouds":
      return "calm.";
      break;
    case "overcast clouds":
      return "pensive.";
      break;
    case "broken clouds":
      return "pensive.";
      break;
    case "shower rain":
      return "antsy.";
      break;
    case "light intensity drizzle":
      return "antsy.";
      break;
    case "light rain":
      return "antsy.";
      break;
    case "rain":
      return "sad.";
      break;
    case "moderate rain":
      return "sad.";
      break;
    case "thunderstorm":
      return "angry.";
      break;
    case "snow":
      return "giddy.";
      break;
    case "mist":
      return "introspective."
      break;
    default:
      return "confused.";
  }
}

function feelingsBgColor (weather) {
  switch(weather) {
    case "clear sky":
      return "Yellow";
      break;
    case "few clouds":
      return "Chartreuse";
      break;
    case "scattered clouds":
      return "LightSkyBlue";
      break;
    case "overcast clouds":
      return "Thistle";
      break;
    case "broken clouds":
      return "Thistle";
      break;
    case "shower rain":
      return "BlueViolet";
      break;
    case "light intensity drizzle":
      return "BlueViolet";
      break;
    case "light rain":
      return "BlueViolet";
      break;
    case "rain":
      return "DeepSkyBlue";
      break;
    case "moderate rain":
      return "DeepSkyBlue";
      break;
    case "thunderstorm":
      return "RebeccaPurple";
      break;
    case "snow":
      return "LightSteelBlue";
      break;
    case "mist":
      return "PeachPuff";
      break;
    default:
      return "Violet";
  }
}

function weatherActivity (weather) {
  switch(weather) {
    case "clear sky":
      return "Time for a solo dance party.";
      break;
    case "few clouds":
      return "Time for bird watching.";
      break;
    case "scattered clouds":
      return "Time to read some philosophy.";
      break;
    case "overcast clouds":
      return "Time to sip on some tea.";
      break;
    case "broken clouds":
      return "Time to sip on some tea.";
      break;
    case "shower rain":
      return "Time for singing in the rain.";
      break;
    case "light intensity drizzle":
      return "Time for singing in the rain.";
      break;
    case "light rain":
      return "Time for singing in the rain.";
      break;
    case "rain":
      return "Time to listen to some mellow tunes.";
      break;
    case "moderate rain":
      return "Time to listen to some mellow tunes.";
      break;
    case "thunderstorm":
      return "Time to hit up that punching bag.";
      break;
    case "snow":
      return "Time for some hot chocolate with a little something extra.";
      break;
    case "mist":
      return "Time to journal.";
      break;
    default:
      return "Time to ask yourself \"What is the meaning of life?\"";
  }
}

function descriptionUpdate (weather) {
  switch(weather) {
    case "clear sky":
      return "clear skies, yo.";
      break;
    case "few clouds":
      return "only a sprinkle of clouds and fairy dust.";
      break;
    case "scattered clouds":
      return "a few more clouds than the reg.";
      break;
    case "overcast clouds":
      return "overcast, yo.";
      break;
    case "broken clouds":
      return "overcast, yo.";
      break;
    case "shower rain":
      return "some light showering outside your tub.";
      break;
    case "light intensity drizzle":
      return "some light showering outside your tub.";
      break;
    case "light rain":
      return "some light showering outside your tub.";
      break;
    case "rain":
      return "solid rain. not actually solid, silly.";
      break;
    case "moderate rain":
      return "solid rain. not actually solid, silly.";
      break;
    case "thunderstorm":
      return "BOOMSHAKALAKA. 'nuff said."
      break;
    case "snow":
      return "snow! do you want to build a snowman?"
      break;
    case "mist":
      return "much mist. hard to see."
      break;
    default:
      return "some type of sky ¯\\_(ツ)_/¯";
  }
}

function iconUpdate(icon) {
  switch(icon) {

  }
}

function updatePageData(city, temp, weather, icon) {
  console.log(weather + icon);
  $("#city").html(city);
  $("#temp").html(temp);
  $("#icon").attr("src", icon + ".png");
  $("#desc").html(descriptionUpdate(weather));
  $("#feeling-desc").html(feelingsUpdate(weather));
  $("#feeling-desc").css("background-color", feelingsBgColor(weather));
  $("#weather-activity").html(weatherActivity(weather));
}

$(document).ready(function(){
  findUserLocation();
});
