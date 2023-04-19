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

    // call geocoding api
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityValue}&appid=${apiKey}`)
    // .then(response => response.json())
    .then(function(response) {
        console.log(response)
        return response.json()
    })
    .then(data => {
        var cityLat = data[0].lat;
        var cityLon = data[0].lon;
        console.log(cityLat, cityLon);
        // call weather api
        fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&appid=${apiKey}&units=imperial`)
        .then(function(response) {
            console.log(response)
            return response.json()
        })
        .then(data => {
            // THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
            console.log(data)
            var currentTemp = data.list[0].main.temp;
            var currentFeelsLike = data.list[0].main.feels_like;
            var currentHumid = data.list[0].main.humidity;
            var currentWind = data.list[0].wind.speed;

            // set text content

            // next 5 days forecast (i + 8)
            for (i = 0; i < 6)
        })
    })
});


// Date and Time in HEADER
var currentDay = document.querySelector('#current-day')
currentDay.textContent = dayjs().format('dddd, MMMM DD');
function findTime () {
    var currentTime = document.querySelector('#current-time');
    currentTime.textContent = dayjs().format('h:mm:ss a');
}
setInterval(findTime, 500);
