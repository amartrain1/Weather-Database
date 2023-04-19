var searchBtn = document.querySelector('#searchBtn')
var searchInput = document.querySelector('#city-input')

// API key
var apiKey = '6b1ae97fcd991a8519a3c4d3bbe4d33e'

// Empty array for cities
var searchedCities = [];

// Function to save searches to local storage
searchBtn.addEventListener('click', function (event) {
    event.preventDefault();
    var cityValue = searchInput.value;
    searchedCities.push(cityValue)
    console.log(searchedCities);
    localStorage.setItem('searchedCities', JSON.stringify(searchedCities));
    var cityText = document.getElementById('city');
    cityText.textContent = cityValue;

    // call geocoding api
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityValue}&appid=${apiKey}`)
        // .then(response => response.json())
        .then(function (response) {
            console.log(response)
            return response.json()
        })
        .then(data => {
            var cityLat = data[0].lat;
            var cityLon = data[0].lon;
            console.log(cityLat, cityLon);
            // call weather api
            fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&appid=${apiKey}&units=imperial`)
                .then(function (response) {
                    console.log(response)
                    return response.json()
                })
                .then(data => {
                    // THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
                    console.log(data)
                    // grab info from api
                    var todayIcon = data.list[0].weather[0].icon;
                    var currentCond = data.list[0].weather[0].main;
                    var currentTemp = data.list[0].main.temp;
                    var currentFeelsLike = data.list[0].main.feels_like;
                    var currentHumid = data.list[0].main.humidity;
                    var currentWind = data.list[0].wind.speed;

                    // populate sections in html
                    // Add condition photo
                    var todayImg = document.getElementById('today-cond');
                    todayImg.src = `http://openweathermap.org/img/wn/${todayIcon}@4x.png`;

                    // condition Text
                    var todayCond = document.getElementById('today-cond-text')
                    todayCond.textContent = `It is ${currentCond.toLowerCase()} today in ${cityValue}!`

                    // Today Temperature
                    var todayTemp = document.getElementById('today-temp');
                    todayTemp.textContent = `Temperature: ${currentTemp}°F`;
                    
                    // Today feels like
                    var todayFeels = document.getElementById('today-feels');
                    todayFeels.textContent = `Feels Like: ${currentFeelsLike}°F`;

                    // Today Humidity
                    var todayHumid = document.getElementById('today-humid');
                    todayHumid.textContent = `Humidity: ${currentHumid}%`;

                    // Today Wind Speed
                    var todayWind = document.getElementById('today-wind');
                    todayWind.textContent = `Wind Speed: ${currentWind} mph`

                    // set text content

                    // next 5 days forecast (i + 8)
                    for (i = 0; i < 41; i += 8) {
                        var temp = data.list[0].main.temp;
                        var feelsLike = data.list[0].main.feels_like;
                        var humid = data.list[0].main.humidity;
                        var wind = data.list[0].wind.speed;

                    }
                    // }) 0 8 16 24 32
                })
        });
});

// Date and Time in HEADER
var currentDay = document.querySelector('#current-day')
currentDay.textContent = dayjs().format('dddd, MMMM DD');
function findTime() {
    var currentTime = document.querySelector('#current-time');
    currentTime.textContent = dayjs().format('h:mm:ss a');
}
setInterval(findTime, 500);
