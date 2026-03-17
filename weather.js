const valueSearch = document.querySelector('input[type="text"]');
const cityName    = document.querySelector('.name figcaption');
const cityFlag    = document.querySelector('.name .flag');
const weatherIcon = document.querySelector('.temperature img');
const tempValue   = document.querySelector('.temp-value');
const description = document.querySelector('.description');
const clouds      = document.querySelector('.clouds');
const humidity    = document.querySelector('.humidity');
const pressure    = document.querySelector('.pressure');
const form        = document.querySelector('form');
const main        = document.querySelector('main');
const resultSec   = document.querySelector('.result');
 
const API_KEY = 'bd1ac8e81c64dcd79ecc0a4efde800a6';
 
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = valueSearch.value.trim();
  if (query) searchWeather(query);
});
 
async function searchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
 
  try {
    const res  = await fetch(url);
    const data = await res.json();
 
    if (data.cod === 200) {
      renderWeather(data);
    } else {
      triggerError();
    }
  } catch {
    triggerError();
  }
 
  valueSearch.value = '';
}
 
function renderWeather(data) {
  resultSec.style.opacity = '0';
  resultSec.style.transform = 'translateY(10px)';
 
  setTimeout(() => {
    cityName.textContent    = data.name;
    cityFlag.src            = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
    cityFlag.alt            = data.sys.country;
    weatherIcon.src         = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    tempValue.textContent   = Math.round(data.main.temp);
    description.textContent = capitalise(data.weather[0].description);
    clouds.textContent      = data.clouds.all;
    humidity.textContent    = data.main.humidity;
    pressure.textContent    = data.main.pressure;
 
    resultSec.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
    resultSec.style.opacity    = '1';
    resultSec.style.transform  = 'translateY(0)';
  }, 180);
}
 
function triggerError() {
  main.classList.add('error');
  setTimeout(() => main.classList.remove('error'), 600);
}
 
function capitalise(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
 
(function init() {
  searchWeather('Tokyo');
})();