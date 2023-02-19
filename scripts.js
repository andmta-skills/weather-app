const api = "5a3a8a7d8c8bdb42ee3d985e150b63d9";
const newapi='7876b0adcf0c1118bd02b982db7ba74d'

const iconImg = document.querySelector("#weather-icon");
const loc = document.querySelector("#location");
const tempC = document.querySelector(".c");
const tempF = document.querySelector(".f");
const desc = document.querySelector(".desc");
const sunriseDOM = document.querySelector(".sunrise");
const sunsetDOM = document.querySelector(".sunset");
const week = document.querySelector(".week");
const humid = document.querySelector(".humidity");
const date = document.querySelector(".date");
const weather= document.querySelector(".weather-ico");
const wind= document.querySelector(".wind");



window.addEventListener("load", () => {
  let long;
  let lat;
  // Accesing Geolocation of User
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      // Storing Longitude and Latitude in variables
      // console.log(position);
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const base1 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`;
      const base2 = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,apparent_temperature,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum&current_weather=true&timezone=auto`;
     
      // Using fetch to get data
      fetch(base2)
        .then((response) => {
          // console.log(base1);
          return response.json();
        })
        .then((data) => {
          console.log(data);

          // for current temprature
          const temp  = data.current_weather.temperature;
          tempC.textContent = `${temp} °C`;
          
          const weathericon=(weathercode)=>{
            if(weathercode ===0 || weathercode ===1 ){
              return "sun"
            }
            else if(weathercode === 2 ){
              return "cloud-sun"
            }
            else if(weathercode === 3 ){
              return "cloud"
            }
            else if(weathercode === 45 || weathercode === 48 ){
              return "smog"
            }
            else if(weathercode === 51 || weathercode === 53 || weathercode === 55 || weathercode === 56 || weathercode === 57 || weathercode === 61 || weathercode === 63 || weathercode === 65 || weathercode === 66 || weathercode === 67 || weathercode === 80 || weathercode === 81 || weathercode === 82 ){
              return "cloud-showers-heavy"
            }
            else if(weathercode === 71 || weathercode === 73 || weathercode === 75|| weathercode === 77|| weathercode === 85|| weathercode === 86 ){
              return "snowflake"
            }
            else if(weathercode === 95 || weathercode === 96 || weathercode === 99 ){
              return "cloud-bolt"
            }

          }



          
          
          const daydata=()=>{
            weather.innerHTML += `
            <img src="./icons/${weathericon(data.current_weather.weathercode)}.svg" alt="" id="weather-ico" />`;
          
          wind.textContent = `wind : ${data.current_weather.windspeed} km/h`;

          }
          daydata()


          const arr = [0,1,2,3,4,5,6];
          const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
          const day=new Date()
          const today=day.getDay()
          const weekData = () => {
            
            arr.map((x) => {
              const weathercode=data.daily.weathercode
              // console.log(data.current_weather.weathercode)
              return (week.innerHTML += `<div class="week_day">
      <div class="day">${(today+x<7)?weekday[today+x]:weekday[today+x-7]}</div>
      <div class="day_icon"><img src="./icons/${weathericon(weathercode[x])}.svg" alt="" srcset="" id="weather-icon"/></div>
      <div class="day_temp flex">
      <div class="day_temp_high">${data.daily.temperature_2m_max[x]} &deg; C</div>
      <div class="day_temp_low">${data.daily.temperature_2m_min[x]} &deg; C</div>
      </div>
  </div>`);
  
            });
          };
          weekData();
        });




      fetch(base1)
        .then((response) => {
          // console.log(base1);
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const humidity =`Humidity : ${data.main.humidity} %`;
          const place = data.name;
          const { description } = data.weather[0];
          // const { sunrise, sunset } = data.sys;
          // const fahrenheit = (temp * 9) / 5 + 32;

          // Converting Epoch(Unix) time to GMT
          // const sunriseGMT = new Date(sunrise * 1000);
          // const sunsetGMT = new Date(sunset * 1000);

          // Interacting with DOM to show data
          loc.textContent = `${place}`;
          desc.textContent = `${description}`;
          humid.textContent =`${humidity}`;
          
          // tempC.textContent = `${temp.toFixed(2)} °C`;
          // tempF.textContent = `${fahrenheit.toFixed(2)} °F`;
          // sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
          // sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
          const ll=new Date()
          const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
          const fulldate=month[ll.getMonth()]+"-"+ll.getDate()+"-"+ll.getFullYear()
          // const time=ll.getHours()+"-"+ll.getMinutes()
          date.textContent=`${fulldate}`

        });
    });
  }
});
