results = [];
let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",];
const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December",];

function search(kewword) {
  let xhr = new XMLHttpRequest();
  xhr.open("get",'https://api.weatherapi.com/v1/forecast.json?key=d5170c71830f47a0820113500231508&q='+kewword+'&days=3');
  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState == 4) {
      results = JSON.parse(xhr.responseText);
      display(results)
    }
  });
  xhr.send();
}

document.getElementById("search").addEventListener("keyup", (a) => {
  search(a.target.value);
});

function display() {
  let newDate=new Date();
  let tomorrow = new Date(newDate);
  tomorrow.setDate(newDate.getDate() + 1);
  let dayIndex = tomorrow.getDay();
  let nextDayName = days[dayIndex];
  let dayAfterTomorrow = new Date(tomorrow);
  dayAfterTomorrow.setDate(tomorrow.getDate() + 1);
  let day3 = days[dayAfterTomorrow.getDay()];

  let cartona = "";
  cartona += `
    <div class="today forecast col-md-4 mb-4 ">
      <div class="forecast-header d-flex justify-content-between p-3 text-white" id="today">
        <div class="day">${days[newDate.getDay()]}</div>
        <div class="date">${newDate.getDate() +" "+ monthNames[newDate.getMonth()]}</div>
      </div>
      <div class="forecast-content text-white p-4" id="current">
        <div class="location">${results.location.name}</div>
        <div class="degree d-flex justify-content-between">
          <div class="num fs-1 fw-bold">${results.forecast.forecastday[0].day.avgtemp_c}<sup> o</sup>C</div>
          <div class="forecast-icon">
            <img src="https:${results.forecast.forecastday[0].day.condition.icon}" alt="" width="80"/>
          </div>
        </div>
        <div class="custom text-white fs-5 pb-2 text-center">${results.forecast.forecastday[0].day.condition.text}</div>
        <div class="icon text-center">
          <span><img src="imgs/icon-umberella.png" alt="" /> ${results.forecast.forecastday[0].day.avghumidity}%</span>
          <span><img src="imgs/icon-wind.png" alt="" class="ms-3" /> ${results.current.wind_kph}km/h</span>
        </div>
      </div>
    </div>
    <div class="forecast col-md-4  mb-4">
      <div class="forecast-header text-center p-3 text-white">
        <div class="day">${nextDayName}</div>
      </div>
      <div class="forecast-content text-white p-4 text-center">
        <div class="forecast-icon">
          <img src="https:${results.forecast.forecastday[1].day.condition.icon}" alt="" width="48"/>
        </div>
        <div class="degree fs-4  my-1">${results.forecast.forecastday[1].day.maxtemp_c}<sup> o</sup>C</div>
        <small class=" my-1">${results.forecast.forecastday[1].day.mintemp_c}<sup> o</sup></small>
        <div class=" my-1 custom">${results.forecast.forecastday[1].day.condition.text}</div>
      </div>
    </div>
    <div class="forecast col-md-4  mb-4">
      <div class="forecast-header p-3 text-white text-center">
        <div class="day">${day3}</div>
      </div>
      <div class="forecast-content text-white p-4 text-center">
        <div class="forecast-icon">
          <img src="https:${results.forecast.forecastday[2].day.condition.icon}" alt="" width="48"/>
        </div>
        <div class="degree fs-4 my-1">${results.forecast.forecastday[2].day.maxtemp_c}<sup> o</sup>C</div>
        <small class=" my-1">${results.forecast.forecastday[2].day.mintemp_c}<sup> o</sup></small>
        <div class="custom  my-1">${results.forecast.forecastday[2].day.condition.text}</div>
      </div>
    </div>
  `;
  document.getElementById("forecast").innerHTML = cartona;
}
search("cairo");