import env from "./env"

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    /* Utilizando literals para realizar construção da URL o texto fica mais legivel.
     * O ideal é utilizar apenas um forma de concatenação de string.
    */
    const response = await fetch(`${env.API_URL}${city}${&appid=${env.API_KEY}}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
        
        /* Nota-se que o nome das imagens a serem exibidas
        * tem o mesmo nome que se verifica nas condicionais(if)
        * a diferença é letra maiuscula no inicio do arquivo.
        * Podemos resolver isso com a função toLowerCase()
        */
        weatherIcon.src = `images/${data.weather[0].main.toLowerCase()}.png`

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
