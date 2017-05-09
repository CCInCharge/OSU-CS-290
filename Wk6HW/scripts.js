var apiKey = "78a1ff6ef3713d277bd6d47f094fb816";
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("submitWeatherCity").addEventListener("click", displayWeatherCity);
  document.getElementById("submitWeatherZip").addEventListener("click", displayWeatherZip);
  document.getElementById("submitPost").addEventListener("click", displayPostResults);
})

function displayPostResults(event) {
  event.preventDefault();
  var req = new XMLHttpRequest();
  var payload = document.getElementById("inputText").value;
  req.open("POST", "http://httpbin.org/post", true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(){
  if(req.status >= 200 && req.status < 400){
    var response = JSON.parse(req.responseText);
    document.getElementById("postResults").textContent = response.data;
  } else {
    console.log("Error in network request: " + req.statusText);
  }});
  req.send(payload);
}

function displayWeatherCity(event) {
  event.preventDefault();
  var req = new XMLHttpRequest();
  var city = document.getElementById("cityInput").value;
  req.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey, true);
  req.addEventListener('load',function(){
  if(req.status >= 200 && req.status < 400){
    var response = JSON.parse(req.responseText);
    var resCity = response.name;
    var resWeather = response.weather[0].main;
    document.getElementById("weatherResults").textContent = "Weather in " + resCity + " is " + resWeather;
  } else {
    console.log("Error in network request: " + req.statusText);
  }});
  req.send(null);
}

function displayWeatherZip(event) {
  event.preventDefault();
  var req = new XMLHttpRequest();
  var zip = document.getElementById("zipInput").value;
  req.open("GET", "http://api.openweathermap.org/data/2.5/weather?zip=" + zip + "&appid=" + apiKey, true);
  req.addEventListener('load',function(){
  if(req.status >= 200 && req.status < 400){
    var response = JSON.parse(req.responseText);
    var resCity = response.name;
    var resWeather = response.weather[0].main;
    document.getElementById("weatherResults").textContent = "Weather in " + resCity + " is " + resWeather;
  } else {
    console.log("Error in network request: " + req.statusText);
  }});
  req.send(null);
}
