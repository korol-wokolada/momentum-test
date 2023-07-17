const nextBg = document.querySelector(".slide-next");
const prevBg = document.querySelector(".slide-prev");

const getImage = async () => {
  try {
    const url =
      "https://api.unsplash.com/photos/random?topic=&client_id=qQp9YLJAMRrioT2HCr6KiaxmQuVr6wbypvwk_lQ_S_w&orientation=landscape&width=>5000&height=>3000";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    document.body.style.backgroundImage = `url(${data.urls.regular})`;
  } catch (err) {
    console.error(err);
  }
};

nextBg.addEventListener("click", getImage);
prevBg.addEventListener("click", getImage);
window.addEventListener("load", getImage);

// time, date, greeting
const time = document.querySelector(".time");
const data = document.querySelector(".date");
const greeting = document.querySelector(".greeting");
//time
function setTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.innerHTML = currentTime;
  showDate();
  showGreeting();
  setTimeout(setTime, 1000);
}
setTime();

//date

function showDate() {
  const date = new Date();

  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  };

  const currentDate = date.toLocaleDateString("ru-RU", options);
  data.innerHTML = currentDate;
}

function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  let dayPart = "";

  if (hours < 6) {
    dayPart += "night";
  } else if (hours >= 6 && hours < 12) {
    dayPart += "morning";
  } else if (hours >= 12 && hours < 18) {
    dayPart += "afternoon";
  } else if (hours >= 18 && hours < 23) {
    dayPart += "evening";
  }
  return dayPart;
}
// greeting
function showGreeting() {
  return (greeting.innerHTML = `Good ${getTimeOfDay()}`);
}

function getLocalStorage() {
  const name = document.querySelector(".name");
  name.addEventListener("change", (e) => {
    const value = e.target.value;
    localStorage.setItem("name", value);
  });
  if (localStorage.getItem("name")) {
    name.value = localStorage.getItem("name");
  }
}

window.addEventListener("load", getLocalStorage);

// weather

const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const city = document.querySelector(".city");
const weatherError = document.querySelector(".weather-error");

async function getWeather() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=a091fe719b99a90ff5ae6dc0150ec665&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    weatherIcon.className = "weather-icon owf";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${data.wind.speed}`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    weatherError.style.display = "none";
    weatherIcon.style.display = "block";
    temperature.style.display = "block";
    weatherDescription.style.display = "block";
    wind.style.display = "block";
    humidity.style.display = "block";
  } catch (err) {
    weatherError.style.display = "block";
    weatherIcon.style.display = "none";
    temperature.style.display = "none";
    weatherDescription.style.display = "none";
    wind.style.display = "none";
    humidity.style.display = "none";
    console.error(err);
  }
}

city.addEventListener("change", getWeather);
getWeather();

// quote

const quoteArr = [];
let index = 0;
let flag = true;
let textPosition = 0;
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
async function loadQuotes() {
  try {
    const url = "https://api.quotable.io/random";
    const response = await fetch(url);
    const data = await response.json();
    author.textContent = data.authorSlug;
    quoteArr[index] = data.content;
  } catch (error) {
    console.error(error);
  }
}

function typewriter() {
  if (flag) {
    loadQuotes();
    quoteArr[index] += "";
    flag = false;
  }

  quote.innerHTML =
    quoteArr[index].substring(0, textPosition) +
    `<span class='block'>\u25AE<span/>`;

  if (textPosition++ != quoteArr[index].length) {
    setTimeout("typewriter()", 100);
  } else {
    quoteArr[index] = " ";
    setTimeout("typewriter()", 3000);
    textPosition = 0;
    flag = true;
  }
}
window.addEventListener("load", typewriter);
