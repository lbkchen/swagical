const weatherAPI = "http://api.openweathermap.org/data/2.5/weather?id=5380748&APPID=13de2629d701eaa2dfe0e728ad14beab";
var weatherDict = {};

function httpGetAsync(theUrl, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      callback(xmlHttp.responseText);
    }
  }
  xmlHttp.open("GET", theUrl, true); // true for asynchronous
  xmlHttp.send(null);
}

function httpGet(url, string=false) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", url, false); // false for synchronous request
  xmlHttp.send(null);
  if (string) {
    return xmlHttp.responseText;
  }
  return JSON.parse(xmlHttp.responseText);
}

function get_type(thing){
    if(thing===null)return "[object Null]"; // special case
    return Object.prototype.toString.call(thing);
}

function getWeatherDict() {
  return httpGet(weatherAPI).weather[0];
}

function updateWeatherDict() {
  var newWeatherDict = getWeatherDict();
  if (Object.keys(weatherDict).length === 0 && weatherDict.constructor === Object) {
    for (var key in newWeatherDict) {
      if (newWeatherDict.hasOwnProperty(key)) {
        weatherDict[key] = newWeatherDict[key];
      }
    }
    return;
  }
  for (var key in weatherDict) {
    if (weatherDict.hasOwnProperty(key)) {
      weatherDict[key] = newWeatherDict[key];
    }
  }
}

function getCachedWeatherStatus() {
  return weatherDict.main;
}

function getCachedWeatherIconUrl() {
  return "http://openweathermap.org/img/w/" + weatherDict.icon + ".png";
}

function loadWeatherInfo() {
  console.log(document);
  console.log(document["weatherIcon"]);
  console.log(document.getElementById("weatherIcon"));
  document.getElementById("weatherIcon").src = getCachedWeatherIconUrl();
  document.getElementById("weather").innerHTML = getCachedWeatherStatus();
}

window.onload = function() {
  loadWeatherInfo()
}
