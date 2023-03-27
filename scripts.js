let searchBar = document.querySelector(".search-bar");
let searchBtn = document.querySelector(".search-btn");
let loader = document.querySelector(".loader");

let cityField = document.querySelector('.city');
let tempField = document.querySelector('.temp');
let feelsField = document.querySelector('.feelslike');
let iconField = document.querySelector('.icon');
let descField = document.querySelector('.description');
let humidField = document.querySelector('.humidity');
let windField =  document.querySelector('.wind');

let weather = {
    "ApiKey": "b8f4fcd6996ec075a24ca2c7ad9d4732",
    "units": "metric",
    fetchWeather: function(city){
        displayLoading();
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" + city 
            + "&units=" + this.units + "&appid=" 
            + this.ApiKey
        )
            .then((response) => response.json())
            .then((data) => {
                hideLoading();
                this.displayWeather(data)
            })
            .catch(() => alertQuery());
    },
    displayWeather: function(data){
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, feels_like, humidity } = data.main;
        const { speed } = data.wind;
        const { country } = data.sys;

        let desc = description.charAt(0).toUpperCase() + description.slice(1);

        cityField.innerHTML = "Weather in " + name + ", " + country;
        tempField.innerText = temp + (this.units === "metric" ? "°C" : "°F");
        feelsField.innerText = "Feels like: " + feels_like + (this.units === "metric" ? "°C" : "°F");
        iconField.src = "http://openweathermap.org/img/wn/" + icon + ".png";
        descField.innerText = desc;
        humidField.innerText =  "Humidity: " + humidity + "%";
        windField.innerText = "Wind speed: " + speed + (this.units === "metric" ? "m/s" : "mph");
    },
    search: function(){
        this.fetchWeather(searchBar.value);
    }
};

searchBtn.addEventListener('click', function(){
    if (searchBar.value == ""){
        alertField();
    } else {
        weather.search();
    }
});

const toggleUnits = document.querySelector('.unit');
toggleUnits.addEventListener('click', (e) => {
    weather.units = weather.units === 'metric' ? 'imperial' : 'metric';
    if (searchBar.value == ""){
      e.preventDefault;
    } else {
      weather.fetchWeather(searchBar.value);
    }
});

searchBar.addEventListener("keypress", function(e){
    if (e.key === "Enter"){
      e.preventDefault();
      searchBtn.click();
    }
  });

  const displayLoading = () => {
    loader.style.display = 'block';
  }

  const hideLoading = () => {
    loader.style.display = 'none';
  }

  function alertField(){
    const p = document.createElement('p');
    p.innerHTML= "Please fill the field before submitting.";
    p.className = `alert`
    const div = document.querySelector('.container');
    div.insertBefore(p, div.children[1]);

    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  function alertQuery(){
    const p = document.createElement('p');
    p.innerHTML= "Couldn't find data for that location, please make sure to write the correct name.";
    p.className = `alert`
    const div = document.querySelector('.container');
    div.insertBefore(p, div.children[1]);

    setTimeout(() => document.querySelector('.alert').remove(), 3500);
  }