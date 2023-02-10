var apiKey = '80b742e43f9cdfa9417bd930ff73b3f7'
var cityName = document.getElementById('input')
var weatherUpdate = document.querySelector('.weather')
var forecastUpdate = document.querySelector('.fcContainer')
//lets the user press enter when in the textbox instead of clicking the submit button
document.getElementById("input").addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
      document.getElementById("submitBtn").click();
    }
  });
  
document.getElementById('submitBtn').addEventListener('click', ()=> {
//clears the weatherUpdate section so the next city can be displayed
    weatherUpdate.innerHTML = ''
//sets URL using cityName value, turns into an object
    const dailyURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKey}&units=imperial`;
    fetch(dailyURL)
    .then(dailyResponse => dailyResponse.json())
    .then(dailyData => {
//city name -daily
        var city = dailyData.name;
        nameUpdate = document.createElement('h2');
        nameUpdate.textContent = city;
        weatherUpdate.append(nameUpdate);
//date -daily
        var date = new Date(dailyData.dt * 1000).toLocaleString();
//fixes a bug where pressing submit again would display 'invalid date'
        if(date != 'Invalid Date'){
            dateUpdate = document.createElement('p');
            dateUpdate.textContent = date
            weatherUpdate.append(dateUpdate)
        }
// sets the url for the icon to the openweathermap icon page, uses the icon value, more info here -> https://openweathermap.org/weather-conditions
        var icon = dailyData.weather[0].icon;
        var iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
//weather icon -daily
        var weatherIcon = document.createElement("img");
        weatherIcon.src = iconURL;
        weatherUpdate.appendChild(weatherIcon);
//temperature - daily
        var temperature = Math.round(dailyData.main.temp);
        tempUpdate = document.createElement('p');
        tempUpdate.textContent = (`Temperature: ${temperature} °f`);
        weatherUpdate.append(tempUpdate);
//wind speed - daily
        var wind = Math.round(dailyData.wind.speed);
        windUpdate = document.createElement('p');
        windUpdate.textContent = (`Wind Speed: ${wind} mph`);
        weatherUpdate.append(windUpdate);
//humidity - daily
        var humidity = dailyData.main.humidity;
        humidityUpdate = document.createElement('p');
        humidityUpdate.textContent = (`Humidity: ${humidity}%`);
        weatherUpdate.append(humidityUpdate);
//gets lat and lon from dailyData and uses it in the forecast url
        var longitude = (dailyData.coord.lon)
        var latitude = (dailyData.coord.lat)
        const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`
        fetch(forecastURL)
        .then (fcResponse => fcResponse.json())
        .then (fcData => {
//forecast returns in 3 hr intervals so we iterate through the data in groups of 8, 8*3 = 24hrs
                var forecast = fcData.list;
                var y = 0
                for (var i = 0; i < forecast.length; i+=8){
                    var days = forecast[i]
                    var ids = ['day1', 'day2', 'day3', 'day4', 'day5']
//grabs id for each day that can be used latter to append to 
                    var dayId = (document.getElementById(ids[y]))
//clears the forecast data so the next query can display
                    dayId.innerHTML = ''
//city name -forecast
                    var fcCity = dailyData.name
                    var fcNewCity = document.createElement('h2')
                    fcNewCity.textContent = (fcCity)
                    dayId.append(fcNewCity)
//date -forecast
                    var fcDate = new Date(days.dt * 1000).toLocaleString();
                    fcDateUpdate = document.createElement('p');
                    fcDateUpdate.textContent = fcDate
                    dayId.append(fcDateUpdate)
//icon -forecast
                    var fcIcon = days.weather[0].icon
                    var fcIconURL = `https://openweathermap.org/img/wn/${fcIcon}@2x.png`;
                    var fcNewIcon = document.createElement('img')
                    fcNewIcon.src = fcIconURL
                    dayId.append(fcNewIcon)
//temperature -forecast
                    var fcTemp = Math.round(days.main.temp)
                    var fcNewTemp = document.createElement('p')
                    fcNewTemp.textContent = `Temperature: ${fcTemp} °f`
                    dayId.append(fcNewTemp)
//wind speed -forecast
                    var fcWind = Math.round(days.wind.speed)
                    var fcNewWind = document.createElement('p')
                    fcNewWind.textContent = (`Wind Speed: ${fcWind} mph`)
                    dayId.append(fcNewWind)
//humidity -forecast
                    var fcHumidity = days.main.humidity
                    var fcNewHumidity = document.createElement('p')
                    fcNewHumidity.textContent = `Humidity: ${fcHumidity}%`
                    dayId.append(fcNewHumidity)
                    y++
                }
        })
    })
//clears the searchbar for the user to enter another query
    cityName.value = ''
})
