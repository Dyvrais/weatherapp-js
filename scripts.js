let searchBar = document.querySelector(".search-bar");
let searchBtn = document.querySelector(".search-btn");
let loader = document.querySelector(".loader");

let weather = {
    "ApiKey": "b8f4fcd6996ec075a24ca2c7ad9d4732",
    fetchWeather: function(city){
        displayLoading();
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" + city 
            + "&appid=" 
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

        let celsius = Math.round(temp - 273.15);
        let sensation = Math.round(feels_like - 273.15);
        let desc = description.charAt(0).toUpperCase() + description.slice(1);

        document.querySelector('.city').innerHTML = "Weather in " + name + ", " + country;
        document.querySelector('.temp').innerText = celsius + "°C";
        document.querySelector('.feelslike').innerText = "Feels like: " + sensation + "°C";
        document.querySelector('.icon').src = "http://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector('.description').innerText = desc;
        document.querySelector('.humidity').innerText =  "Humidity: " + humidity + "%";
        document.querySelector('.wind').innerText = "Wind speed: " + speed + " km/h";
    },
    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

searchBtn.addEventListener('click', function(){
    if (searchBar.value == ""){
        alertField();
    } else {
        weather.search();
        searchBar.value = "";
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
    const div = document.querySelector('.search');
    div.appendChild(p);

    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  function alertQuery(){
    const p = document.createElement('p');
    p.innerHTML= "Couldn't find data for that location, please make sure to write the correct name.";
    p.className = `alert`
    const div = document.querySelector('.search');
    div.appendChild(p);

    setTimeout(() => document.querySelector('.alert').remove(), 3500);
  }