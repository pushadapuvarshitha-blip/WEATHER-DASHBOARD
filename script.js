const apiKey = "ec0036ba64507514c4b467f2832b424b";

let history = JSON.parse(localStorage.getItem("history")) || [];

async function getWeather() {

    const city = document.getElementById("city").value.trim();

    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {

        const response = await fetch(url);
        const data = await response.json();

        console.log(data);

        if (!response.ok) {
            alert(data.message);
            return;
        }

        document.getElementById("cityName").innerText =
            data.name + ", " + data.sys.country;

        document.getElementById("temperature").innerText =
            data.main.temp + " °C";

        document.getElementById("condition").innerText =
            data.weather[0].main;

        document.getElementById("humidity").innerText =
            data.main.humidity + "%";

        document.getElementById("wind").innerText =
            data.wind.speed + " km/h";

        document.getElementById("icon").src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        document.getElementById("dateTime").innerText =
            new Date().toLocaleString();

        if (!history.includes(city)) {
            history.unshift(city);

            if (history.length > 5) {
                history.pop();
            }

            localStorage.setItem("history", JSON.stringify(history));
        }

        displayHistory();

    } catch (error) {
        alert(error.message);
    }
}

function displayHistory() {

    const list = document.getElementById("historyList");

    list.innerHTML = "";

    history.forEach(city => {

        list.innerHTML += `<li>${city}</li>`;

    });

}

displayHistory();