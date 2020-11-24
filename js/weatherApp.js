
  //Set Storage
  var storage = window.localStorage;

  //Run Functions
  //checkSavedData();
  //loadDate();
  //loadTime();
  checkGeoLocation();
  //checkServiceWorker();


  //

  //Page Changes
  //Show Settings Page
  function settingsOpen() {
    console.log("Showing settings...")
    $("#mainContainer").css("display","none");
    $("#forecastContainer").css("display","none");
    $("#settingsContainer").css("display","block");
  }

  //Show Weather Page
  function currentOpen() {
    console.log("Showing weather...")
    $("#mainContainer").css("display","block");
    $("#forecastContainer").css("display","none");
    $("#settingsContainer").css("display","none");
  }

  //Show Weather Page
  function forecastOpen() {
    console.log("Showing weather...")
    $("#mainContainer").css("display","none");
    $("#forecastContainer").css("display","block");
    $("#settingsContainer").css("display","none");
  }



  //Run Function to Check Local Storage Data
  function checkSavedData() {
    var getUserName = localStorage.getItem('localUserName');
    if(getUserName === null){
    	localStorage.setItem('localUserName','Friend!');
    	}
    else{
    }
    document.getElementById('greetingsTag').innerHTML = "Hello,<br>"  + getUserName;
  }


  //Run Function to Grab Current Year to Date
  function loadDate(){
    //Load Today's Day
    var day = new Date();
    var rawDay  =  new Array(7);
      rawDay[0] = "Sunday";
      rawDay[1] = "Monday";
      rawDay[2] = "Tuesday";
      rawDay[3] = "Wednesday";
      rawDay[4] = "Thursday";
      rawDay[5] = "Friday";
      rawDay[6] = "Saturday";
    var loadDay = rawDay[day.getDay()];
    //Load Today's Date
    var date = new Date();
    var loadDate  =  date.getDate();
    //Load Today's Month
    var month = new Date();
    var rawMonth = new Array(12);
      rawMonth[0] = "January";
      rawMonth[1] = "February";
      rawMonth[2] = "March";
      rawMonth[3] = "April";
      rawMonth[4] = "May";
      rawMonth[5] = "June";
      rawMonth[6] = "July";
      rawMonth[7] = "August";
      rawMonth[8] = "September";
      rawMonth[9] = "October";
      rawMonth[10] = "November";
      rawMonth[11] = "December";
    var loadMonth = rawMonth[month.getMonth()];

    //Load Today's Years
    var year = new Date();
    var loadYear = year.getFullYear();

    document.getElementById('currentDay').innerHTML = loadDay;
    document.getElementById('currentMonth').innerHTML = loadMonth + " " + loadDate;
    document.getElementById('currentYear').innerHTML = loadYear;
  }


  //Run Function to Grab Current Time
  function loadTime () {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    document.getElementById('currentTime').innerHTML = strTime;
  }

var myLon = 0;
var myLat = 0;

  function checkGeoLocation() {
    if ("geolocation" in navigator) {
      $('.js-geolocation').show();
      console.log("GeoLocation Found...")


      navigator.geolocation.getCurrentPosition(function(position) {
        console.log("Running GeoLocation in Navigator...")
        console.log("Lat = " + position.coords.latitude)
        console.log("Lon = " + position.coords.longitude)
        myLat = position.coords.latitude;
        myLon = position.coords.longitude;
        console.log(myLon + " " + myLat)
        $("#mainContainer").css("display","block");
        loadOWMAPICurrent();
      });
    } else {
      $('.js-geolocation').hide();
      console.log("No GeoLocation Found...")
    }
  }


  //Run OpenWeatherMap API for Weather DAta
  function loadOWMAPICurrent () {
    const currentAPIKey = "61bd3d48471f508fa7cd4799235d2c38";
    var latPos = myLat;
    var lonPos = myLon;

    //GET Rest API for Current Weather
    axios //Node.js Element that is able to pull in API Get requests.
      //OpenWeatherMap Lat and Lon Location Current
      .get("https://api.openweathermap.org/data/2.5/weather?lat=" + latPos + "&lon=" + lonPos + "&appid=" + currentAPIKey + "&units=imperial")
      .then(response => {
        console.log(response.data);

        //Grab Current City Name
        var currentLocationName = response.data.name;
        document.getElementById('currentCity').innerHTML = '<img src="media/buttonicons/locationMarker.png"  width="30px" height="40px"/>' + " " + currentLocationName;
        document.getElementById('pingLocation').innerHTML = 'It looks like you are currently located<br><img src="media/buttonicons/locationMarker.png"  width="30px" height="40px"/>' + " " + currentLocationName + ' This is based on your GPS data and weather stations near by that we have access to.';
        //Grab OpenWeatherMap Update timeout
        var rawLastUpdate = response.data.dt;
        console.log("Raw - " + rawLastUpdate);
        var dateLastUpdate = new Date(rawLastUpdate * 1000);
        console.log("Full - " + dateLastUpdate);
        cleanLastUpdate = dateLastUpdate.toLocaleTimeString('en-US',{ hour: '2-digit', minute: '2-digit' });
        console.log("Clean - " + cleanLastUpdate);

        document.getElementById('lastUpdate').innerHTML = "Last Updated: " + cleanLastUpdate;

        //Grab Today's Current Weather Icon
        //Pull Icons Locally
        var weatherIcon = response.data.weather[0].icon;
        document.getElementById('weatherIcon').src = "media/weathericons/" + weatherIcon + ".png";
        //Pull Icons From OpenWeatherMap
        //document.getElementById('weatherIcon').src = "http://openweathermap.org/img/wn/" + weatherIcon + "@4x.png";

        //Grab Today's Current Weather Condition
        var weatherDescription = response.data.weather[0].description;
        document.getElementById('currentConditions').innerHTML = weatherDescription;

        //Grab Today's Current Temp
        var rawTemp = response.data.main.temp;
        var cleanTemp = rawTemp.toFixed();
        document.getElementById('currentTemp').innerHTML = cleanTemp + "°";

        //Grab Today's Feels Like Temp
        var rawFeelsLike = response.data.main.feels_like;
        var cleanFeelsLike= rawFeelsLike.toFixed();
        document.getElementById('feelsLikeTemp').innerHTML = "Feels Like " + cleanFeelsLike + "°";

        //Grab Today's High Weather
        var rawHigh = response.data.main.temp_max;
        var cleanHigh = rawHigh.toFixed();
        document.getElementById('highTemp').innerHTML =  cleanHigh + '  <img src="media/buttonicons/highIcon.png"  width="60px" height="60px"/>';

        //Grab Today's Low Weather
        var rawLow = response.data.main.temp_min;
        var cleanLow = rawLow.toFixed();
        document.getElementById('lowTemp').innerHTML = cleanLow + '  <img src="media/buttonicons/lowIcon.png"  width="60px" height="60px"/>';

        //Grab Today's Current Wind Speed and Direction
        //Wind Speed
        var rawWindSpeed = response.data.wind.speed;
        var cleanWindSpeed = rawWindSpeed.toFixed();

        //Wind Direction
        var rawWindDirection = response.data.wind.deg;
        if (rawWindDirection>11.25 && rawWindDirection<33.75){
          cleanWindDirection =  "NNE";
        }
        else if (rawWindDirection>33.75 && rawWindDirection<56.25){
          cleanWindDirection =  "ENE";
        }
        else if (rawWindDirection>56.25 && rawWindDirection<78.75){
          cleanWindDirection =  "E";
        }
        else if (rawWindDirection>78.75 && rawWindDirection<101.25){
          cleanWindDirection =  "ESE";
        }
        else if (rawWindDirection>101.25 && rawWindDirection<123.75){
          cleanWindDirection =  "ESE";
        }
        else if (rawWindDirection>123.75 && rawWindDirection<146.25){
          cleanWindDirection =  "SE";
        }
        else if (rawWindDirection>146.25 && rawWindDirection<168.75){
          cleanWindDirection =  "SSE";
        }
        else if (rawWindDirection>168.75 && rawWindDirection<191.25){
          cleanWindDirection =  "S";
        }
        else if (rawWindDirection>191.25 && rawWindDirection<213.75){
          cleanWindDirection =  "SSW";
        }
        else if (rawWindDirection>213.75 && rawWindDirection<236.25){
          cleanWindDirection =  "SW";
        }
        else if (rawWindDirection>236.25 && rawWindDirection<258.75){
          cleanWindDirection =  "WSW";
        }
        else if (rawWindDirection>258.75 && rawWindDirection<281.25){
          cleanWindDirection =  "W";
        }
        else if (rawWindDirection>281.25 && rawWindDirection<303.75){
          cleanWindDirection =  "WNW";
        }
        else if (rawWindDirection>303.75 && rawWindDirection<326.25){
          cleanWindDirection =  "NW";
        }
        else if (rawWindDirection>326.25 && rawWindDirection<348.75){
          cleanWindDirection =  "NNW";
        }
        else{
          cleanWindDirection =  "N";
        }

        document.getElementById('currentWind').innerHTML = '<img src="media/buttonicons/windIcon.png"  width="52px" height="44px"/> ' + cleanWindDirection+ " " + cleanWindSpeed + 'mph';


        //Sunrise and Sunset
        var rawSunrise = response.data.sys.sunrise;
        var dateSunrise = new Date(rawSunrise * 1000)
        cleanSunrise = dateSunrise.toLocaleTimeString('en-US',{ hour: '2-digit', minute: '2-digit' });

        var rawSunset = response.data.sys.sunset;
        var dateSunset = new Date(rawSunset * 1000)
        cleanSunset = dateSunset.toLocaleTimeString('en-US',{ hour: '2-digit', minute: '2-digit' });

        document.getElementById('theSun').innerHTML = cleanSunrise + "          " + '<img src="media/buttonicons/sunrise.png" id="sunRise" width="60px" height="53px"/>' + "          " + '<img src="media/buttonicons/sunset.png" id="sunSet" width="60px" height="53px"/>' + "          " +  cleanSunset ;

      })
      .catch(error => console.error(error));
  }

  //Start Service Worker
  function checkServiceWorker () {
    if('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/js/sw.js').then(function() {
          console.log("Tada! Your service worker is now registered"); });
    }
  }//End of Service Worker
