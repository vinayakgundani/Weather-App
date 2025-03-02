let search_btn = document.querySelector("button");
let weath_bdy = document.querySelector(".weather-body");
let ctn = document.querySelector(".container");
let temperature = document.querySelector(".num");
let temp_cont = document.querySelector("#temp-status");
let humidity = document.querySelector(".hum-num");
let humidity_cont = document.querySelector("#hum-status");
let windspeed = document.querySelector(".win-num");
let wind_cont = document.querySelector("#wind-status");
let city_input = document.querySelector(".input-box");
let body = document.querySelector("body");
let back_btn = document.createElement("button");
let btn = document.createElement("button");
temp_img = document.querySelector(".temp-icon");


function searchweather() {
    if (city_input.value == "") {
        alert("Enter the City first");

        return;
    } else {
        ctn.style.display = "none";
        show_weather();
        weath_bdy.style.display = "flex";
        document.querySelector(".header").style.display = "none"

        btn.innerText = "Back";
        btn.classList.add("back-btn");
        ctn.appendChild(btn);
        btn.addEventListener("click", () => {
            weath_bdy.style.display = "none";
            document.querySelector(".header").style.display = "flex";
            ctn.removeChild(btn);
            start();

        });
    }

}

function start() {
    city_input.value = "";
    city_input.addEventListener("keydown", function(event) {
        if (event.key === 'Enter') {
            searchweather();
        }
    })

    search_btn.addEventListener("click", searchweather);
}

async function show_weather() {
    let city = city_input.value;

    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=197099fed31c7432c47809a2bd3263be`;

    try {
        let response = await fetch(api);
        let data = await response.json();

        ctn.style.display = "flex";
        temp_img.style.transform = "scale(0.9)";
        temperature.innerText = `${(data.main.temp - 273.15).toFixed(1)}°C`;
        temp_cont.innerText = `${data.weather[0].description}`;
        humidity.innerText = `${data.main.humidity}%`;
        windspeed.innerText = `${(data.wind.speed * 3.6).toFixed(1)}km/h`;
        getHumidityDescription(data.main.humidity);
        getWindSpeedDescription((data.wind.speed * 3.6).toFixed(1));
    } catch (e) {
        body.innerHTML = ``;

        back_btn.classList.add("back-btn");
        body.innerHTML = `<h2 style="font-weight:600">Sorry we couldn't Find data </h2>`;
        body.appendChild(back_btn);
        body.style.display = "flex";
        body.style.flexDirection = "column";
        back_btn.style.backgroundColor = "black";
        back_btn.style.Color = "white";
        back_btn.innerText = "Back";

        back_btn.addEventListener("click", function() {
            body.innerHTML = ``;
            body.appendChild(ctn);
            ctn.style.display = "flex";
            weath_bdy.style.display = "none";
            document.querySelector(".header").style.display = "flex";
            ctn.removeChild(btn);
            start();
        });


    }
}

function getHumidityDescription(humidityValue) {
    if (humidityValue <= 40) {
        humidity_cont.innerText = "Dry";
    } else if (humidityValue <= 70) {
        humidity_cont.innerText = "Comfortable";
    } else {
        humidity_cont.innerText = "Humid";
    }
}


function getWindSpeedDescription(windSpeed) {
    if (windSpeed <= 15) {
        wind_cont.innerText = "Calm";
    } else if (windSpeed <= 30) {
        wind_cont.innerText = "Breezy";
    } else if (windSpeed <= 50) {
        wind_cont.innerText = "Windy";
    } else {
        wind_cont.innerText = "Gusty";
    }
}


// https: //api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}


start();