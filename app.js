
const button_for_here = document.getElementById('but-here');
const button_for_city = document.getElementById('but-city');
const emoji = document.querySelector('.emoji');
const temp = document.getElementsByClassName('Temp')[0];
const mood = document.querySelector('.mood');
const input = document.querySelector('#city_input');
const weather_card = document.querySelector('.weather-card');
const city_name = document.querySelector('.city-name');

const emoji_ref = {
    Clear: '⛅',
    Clouds: '💭',
    Rain: '🌧',
    Mist: '🌫',
    Haze: '🌫',
    Thunderstorm: '🌩',    
}

button_for_here.addEventListener('click',async() => {
   
    const [lat,long]= await getCoords();
    const [temp_api,mood_api] = await getWeather(lat,long);
    emoji.innerHTML  = emoji_ref[mood_api];
    temp.innerHTML = (temp_api-273).toFixed(2) + '°C';
    mood.innerHTML = mood_api
    weather_card.style.visibility = 'visible';
});

function getWeather(lat,long)
{
    
    return fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid={YOUR API KEY}`)
    .then((res) => res.json())
    .then((res) => {
        return [res.main.temp,res.weather[0].main];
    });

}

function getCityWeather(city)
{
    return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid={YOUR API KEY}`)
    .then((res) => res.json())
    .then((res) => {
        if(res.cod == 404)
            {
                weather_card.style.visibility = 'hidden';
                alert('Please Enter A Valid City Name');
            }
              return ([res.main.temp,res.weather[0].main]);

    });
}

function getCoords()
{
    return fetch(`https://api.ipgeolocation.io/ipgeo?apiKey={YOUR API KEY}`)
    .then((res) => res.json())
    .then((res) =>{ 
        return [res.latitude,res.longitude]
});
    
}

button_for_city.addEventListener('click',async() => {
    console.log('buttn for city is clicked!');

    const city =  input.value;
    const [temp_api,mood_api] = await getCityWeather(city);
    emoji.innerHTML  = emoji_ref[mood_api];
    temp.innerHTML = (temp_api-273).toFixed(2) + '°C';
    mood.innerHTML = mood_api
    city_name.innerHTML = city;
    weather_card.style.visibility = 'visible';

});




