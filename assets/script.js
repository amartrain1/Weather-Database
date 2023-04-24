var searchBtn = document.querySelector('#searchBtn')
var searchInput = document.querySelector('#city-input')

// API key
var apiKey = '6b1ae97fcd991a8519a3c4d3bbe4d33e';

// Empty array for cities
var searchedCities = [];

// Function to save searches to local storage
searchBtn.addEventListener('click', function (event) {
    event.preventDefault();
    var cityValue = searchInput.value;
    searchedCities.push(cityValue);
    localStorage.setItem('searchedCities', JSON.stringify(searchedCities));
    var cityText = document.getElementById('city');
    cityText.textContent = cityValue;
    
    // render search results
    var searchHistory = document.getElementById('search-results');
    var historyEl = document.createElement('h3');
    historyEl.classList.add('history');
    searchHistory.appendChild(historyEl);
    historyEl.textContent = cityValue;
    
    // call geocoding api
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityValue}&appid=${apiKey}`)
        // .then(response => response.json())
        .then(function (response) {
            console.log(response)
            return response.json()
        })
        .then(data => {
            var cityLat = data[0].lat;
            var cityLon = data[0].lon;
            // call weather api
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&appid=${apiKey}&units=imperial`)
                .then(function (response) {
                    console.log(response)
                    return response.json()
                })
                .then(data => {
                    // THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
                    console.log(data)
                    // grab info from api
                    var todayIcon = data.list[0].weather[0].icon;
                    var currentTemp = data.list[0].main.temp;
                    var currentFeelsLike = data.list[0].main.feels_like;
                    var currentHumid = data.list[0].main.humidity;
                    var currentWind = data.list[0].wind.speed;

                    // populate sections in html
                    // Add condition photo
                    var todayImg = document.getElementById('today-cond');
                    todayImg.src = `http://openweathermap.org/img/wn/${todayIcon}@4x.png`;

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
                    for (i = 8; i < 41; i += 8) {
                        console.log(i)
                        var icon = data.list[i].weather[0].icon;
                        var temp = data.list[i].main.temp;
                        var feelsLike = data.list[i].main.feels_like;
                        var humid = data.list[i].main.humidity;
                        var wind = data.list[i].wind.speed;

                        // populate sections in html
                        // Add condition photo
                        var iconImg = document.getElementById(`cond-day-${i}`);
                        iconImg.src = `http://openweathermap.org/img/wn/${icon}@4x.png`;

                        // Add temp
                        var estTemp = document.getElementById(`temp-day-${i}`);
                        estTemp.textContent = `Temperature: ${temp}°F`;

                        // Add feels like
                        var estFeels = document.getElementById(`feels-day-${i}`);
                        estFeels.textContent = `Feels Like: ${feelsLike}°F`;

                        // Add Humidity
                        var estHumid = document.getElementById(`humid-day-${i}`);
                        estHumid.textContent = `Humidity: ${humid}%`;

                        // Add wind speeds
                        var estWind = document.getElementById(`wind-day-${i}`);
                        estWind.textContent = `Wind Speed: ${wind} mph`;
                    }
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

// Setting days on small boxes
var day1 = document.getElementById('day-1');
var day2 = document.getElementById('day-2');
var day3 = document.getElementById('day-3');
var day4 = document.getElementById('day-4');

var getDay1 = dayjs().add(1, 'days').format('dddd, MMMM DD');
day1.textContent = getDay1;

var getDay2 = dayjs().add(2, 'days').format('dddd, MMMM DD');
day2.textContent = getDay2;

var getDay3 = dayjs().add(3, 'days').format('dddd, MMMM DD');
day3.textContent = getDay3;

var getDay4 = dayjs().add(4, 'days').format('dddd, MMMM DD');
day4.textContent = getDay4;
