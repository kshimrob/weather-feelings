//need to fix coordinates
var weatherTemp;

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

function getWeatherData(lat, lon, units = "metric") {
  var API_KEY = "ab523a417ca668db54af9e181900f132"
  var apiUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=" + units + "&appid=" + API_KEY;

  $.get(apiUrl, function(data) {
    if (data) { 
    var city = data.name;
    var temp = data.main.temp;
    weatherTemp = data.main.temp;
    var icon = data.weather[0].icon;
    updatePageData(city, temp, icon);
    } else {
      alert("There was an issue getting your weather, please try again later.")
    }
  });
}

function feelingsUpdate (icon) {
  switch(icon) {
    case "01d":
    case "01n":
      return "jubilant.";
      break;
    case "02d":
    case "02n":
      return "joyful.";
      break;
    case "03d":
    case "03n":
      return "calm.";
      break;
    case "04d":
    case "04n":
      return "pensive.";
      break;
    case "09d":
    case "09n":
      return "antsy.";
      break;
    case "10d":
    case "10n":
      return "sad.";
      break;
    case "11d":
    case "11n":
      return "angry.";
      break;
    case "13d":
    case "13n":
      return "giddy.";
      break;
    case "50d":
    case "50n":
      return "introspective."
      break;
    default:
      return "confused.";
  }
}

function feelingsBgColor (icon) {
  switch(icon) {
    case "01d":
    case "01n":
      return "Yellow";
      break;
    case "02d":
    case "02n":
      return "Chartreuse";
      break;
    case "03d":
    case "03n":
      return "LightSkyBlue";
      break;
    case "04d":
    case "04n":
      return "Thistle";
      break;
    case "09d":
    case "09n":
      return "BlueViolet";
      break;
    case "10d":
    case "10n":
      return "DeepSkyBlue";
      break;
    case "11d":
    case "11n":
      return "RebeccaPurple";
      break;
    case "13d":
    case "13n":
      return "LightSteelBlue";
      break;
    case "50d":
    case "50n":
      return "PeachPuff";
      break;
    default:
      return "Violet";
  }
}

function weatherActivity (weather) {
  switch(weather) {
    case "01d":
    case "01n":
      return "Time for a solo dance party.";
      break;
    case "02d":
    case "02n":
      return "Time for bird watching.";
      break;
    case "03d":
    case "03n":
      return "Time to read some philosophy.";
      break;
    case "04d":
    case "04n":
      return "Time to sip on some tea.";
      break;
    case "09d":
    case "09n":
      return "Time for singing in the rain.";
      break;
    case "10d":
    case "10n":
      return "Time to listen to some mellow tunes.";
      break;
    case "11d":
    case "11n":
      return "Time to hit up that punching bag.";
      break;
    case "13d":
    case "13n":
      return "Time for some hot chocolate with a little something extra.";
      break;
    case "50d":
    case "50n":
      return "Time to journal.";
      break;
    default:
      return "Time to ask yourself \"What is the meaning of life?\"";
  }
}

function descriptionUpdate (icon) {
  switch(icon) {
    case "01d":
    case "01n":
      return "Clear skies, yo.";
      break;
    case "02d":
    case "02n":
      return "Only a sprinkle of clouds and fairy dust.";
      break;
    case "03d":
    case "03n":
      return "A few more clouds than the reg.";
      break;
    case "04d":
    case "04n":
      return "Overcast, yo.";
      break;
    case "09d":
    case "09n":
      return "Some light showering outside your tub.";
      break;
    case "10d":
    case "10n":
      return "Solid rain. not actually solid, silly.";
      break;
    case "11d":
    case "11n":
      return "BOOMSHAKALAKA. 'nuff said."
      break;
    case "13d":
    case "13n":
      return "Snow! Do you want to build a snowman?"
      break;
    case "50d":
    case "50n":
      return "Much mist. Hard to see."
      break;
    default:
      return "Some type of sky ¯\\_(ツ)_/¯";
  }
}

function updatePageData(city, temp, icon) {
  console.log(icon);
  $("#city").html(city);
  $("#temp").html(temp.toFixed(2));
  $("#icon").attr("src", "assets/" + icon + ".png");
  $("#desc").html(descriptionUpdate(icon));
  $("#feeling-desc").html(feelingsUpdate(icon));
  $("#feeling-desc").css("background-color", feelingsBgColor(icon));
  $("#weather-activity").html(weatherActivity(icon));
}

function changeUnits(temp) {
  console.log($("#units").text());
  if ($("#units").text() === "C") {
    $("#temp").text((weatherTemp * 1.8 + 32).toFixed(2));
    $("#units").text("F");
  } else {
    $("#temp").text(weatherTemp);
    $("#units").text("C");
  }
}

$(document).ready(function(){
  findUserLocation();

  $('button').click(function() {
    $('.toggle').toggleClass('selected unselected')
    changeUnits(weatherTemp);
  });
});

/* when button is clicked...

1. changes class of the button to "selected"
2. changes class of the other button to "unselected"
3. IF the button that was clicked was class "Farenheit", 
  then change the temperature from C -> F
  (vice versa)*/
