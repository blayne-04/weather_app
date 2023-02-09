var apiKey = '80b742e43f9cdfa9417bd930ff73b3f7'
var cityName = document.getElementById('input')
var weatherUpdate = document.querySelector('.weather')

document.getElementById("input").addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
      document.getElementById("submitBtn").click();
    }
  });
  
document.getElementById('submitBtn').addEventListener('click', ()=> {
//clears the weatherUpdate section so the next city can be displayed
    weatherUpdate.innerHTML = ''
//sets URL dynamically using cityName value
    const URL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKey}`;
    fetch(URL)
    .then(response => response.json())
    .then(data => {
        console.log(data);
//prints city name data onto the screen
        var city = data.name;
        nameUpdate = document.createElement('h2');
        nameUpdate.textContent = city;
        weatherUpdate.append(nameUpdate);
//sets var weatherImg to the array inside of the weather object item
        var weatherImg = data.weather[0];
//stores icon as the icon from the weatherImg array
        var icon = weatherImg.icon;
// sets the url for the icon to the openweathermap icon page, more info here -> https://openweathermap.org/weather-conditions
        var iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
//creates an img element for the weather icon, sets the src to the iconUrl and appends it to the page
        var weatherIcon = document.createElement("img");
        weatherIcon.src = iconURL;
        weatherUpdate.appendChild(weatherIcon);
//converts temp to fahrenheit and prints temp data it on screen
        var temperature = data.main.temp;
        var fahrenheit = Math.round((temperature - 273.15) * 9/5 + 32);
        tempUpdate = document.createElement('p');
        tempUpdate.textContent = (`Temperature: ${fahrenheit} °f`);
        weatherUpdate.append(tempUpdate);
//prints wind speed data on screen
        var wind = data.wind.speed;
        windUpdate = document.createElement('p');
        windUpdate.textContent = (`Wind Speed: ${wind} m/s`);
        weatherUpdate.append(windUpdate);
//prints humidity data on screen
        var humidity = data.main.humidity;
        humidityUpdate = document.createElement('p');
        humidityUpdate.textContent = (`Humidity: ${humidity}%`);
        weatherUpdate.append(humidityUpdate);
//prints a button that will be used to save content to sidebar
        historyButton = document.createElement('button')
        historyButton.textContent = 'Add City To History'
        historyButton.id = 'historyBtn'
        weatherUpdate.append(historyButton)
    })
//clears the searchbar for the user to enter another query
    cityName.value = ''
})