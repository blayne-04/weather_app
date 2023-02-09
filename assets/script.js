var apiKey = '80b742e43f9cdfa9417bd930ff73b3f7'
var cityName = 'London'

const URL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

fetch(URL)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))