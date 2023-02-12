var apiKey = '80b742e43f9cdfa9417bd930ff73b3f7'
var cityName = document.getElementById('input')
var weatherUpdate = document.querySelector('.weather')
var forecastUpdate = document.querySelector('.fcContainer')
var historyBtns = document.querySelector('.savedCts')
//displays history
historyUpdate()
//lets the user press enter when in the textbox instead of clicking the submit button
document.getElementById("input").addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
      document.getElementById("submitBtn").click();
    }
  });
    function historyUpdate(){
var savedCities = JSON.parse(localStorage.getItem('savedCities')) || []
        if (!savedCities.includes(cityName.value)){
                savedCities.push(cityName.value)
                localStorage.setItem('savedCities', JSON.stringify(savedCities))
        }
        cityName.value = ''
        historyBtns.innerHTML = ''
        for (i = 0; i < savedCities.length; i++){
                cityButton = document.createElement('button')
                cityButton.textContent = savedCities[i]
                cityButton.id = savedCities[i]
                historyBtns.append(cityButton)
        }
}

document.querySelector('.savedCts').addEventListener('click', () => {
        cityName.value = (event.target.id)
        document.getElementById('submitBtn').click();
})

document.getElementById('submitBtn').addEventListener('click', ()=> {
//clears the weatherUpdate section so the next city can be displayed
    weatherUpdate.innerHTML = ''
//sets URL using cityName value, turns into an object
    const dailyURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKey}&units=imperial`;
    fetch(dailyURL)
    .then(dailyResponse => dailyResponse.json())
    .then(dailyData => {
//city name -daily
        city = document.createElement('h2');
        city.textContent = dailyData.name;
        weatherUpdate.append(city);
//date -daily fixes a bug where pressing submit again would display 'invalid date'
        date = new Date(dailyData.dt * 1000).toLocaleString();
        if(date != 'Invalid Date'){
            dateUpdate = document.createElement('p');
            dateUpdate.textContent = date;
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
        temperature = document.createElement('p');
        temperature.textContent = (`Temperature: ${Math.round(dailyData.main.temp)} °f`);
        weatherUpdate.append(temperature);
//wind speed - daily
        wind = document.createElement('p');
        wind.textContent = (`Wind Speed: ${Math.round(dailyData.wind.speed)} mph`);
        weatherUpdate.append(wind);
//humidity - daily
        humidity = document.createElement('p');
        humidity.textContent = (`Humidity: ${dailyData.main.humidity}%`);
        weatherUpdate.append(humidity);
//updates history sidebar/adds name to local storage
historyUpdate()
//sets url using data from the daily fetch
        const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${dailyData.coord.lat}&lon=${dailyData.coord.lon}&appid=${apiKey}&units=imperial`
        fetch(forecastURL)
        .then (fcResponse => fcResponse.json())
        .then (fcData => {
//forecast returns in 3 hr intervals so we iterate through the data in groups of 8, 8*3 = 24hrs
                var y = 0
                for (var i = 0; i < fcData.list.length; i+=8){
                    var days = fcData.list[i]
                    var ids = ['day1', 'day2', 'day3', 'day4', 'day5']
//grabs id for each day that can be used latter to append to 
                    var dayId = (document.getElementById(ids[y]))
//clears the forecast data so the next query can display
                    dayId.innerHTML = ''
//city name -forecast
                    fcCity = document.createElement('h2');
                    fcCity.textContent = (dailyData.name);
                    dayId.append(fcCity);
//date -forecast
                    fcDate = document.createElement('p');
                    fcDate.textContent = new Date(days.dt * 1000).toLocaleString();
                    dayId.append(fcDate);
//icon -forecast
                    fcIconURL = `https://openweathermap.org/img/wn/${days.weather[0].icon}@2x.png`;
                    fcIcon = document.createElement('img');
                    fcIcon.src = fcIconURL;
                    dayId.append(fcIcon);
//temperature -forecast
                    fcTemp = document.createElement('p');
                    fcTemp.textContent = `Temperature: ${days.main.temp} °f`;
                    dayId.append(fcTemp);
//wind speed -forecast
                    fcWind = document.createElement('p');
                    fcWind.textContent = (`Wind Speed: ${days.wind.speed} mph`);
                    dayId.append(fcWind);
//humidity -forecast
                    fcHumidity = document.createElement('p');
                    fcHumidity.textContent = `Humidity: ${days.main.humidity}%`;
                    dayId.append(fcHumidity);
                    y++;
                }
        })
    })
//clears the searchbar for the user to enter another query
})