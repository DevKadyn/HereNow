  /*---------------------------------------------------------------------------
  Run Functions
  ---------------------------------------------------------------------------*/
  //checkSavedData();
  loadDate();
  //loadTime();
  checkGeoLocation();
  //checkServiceWorker();

  /*---------------------------------------------------------------------------
  Generate Current Date
  ---------------------------------------------------------------------------*/
  function loadDate(){
    //Load Today's Day
    var day = new Date();
    var rawDay  =  new Array(7);
      rawDay[0] = "Sun";
      rawDay[1] = "Mon";
      rawDay[2] = "Tue";
      rawDay[3] = "Wed";
      rawDay[4] = "Thu";
      rawDay[5] = "Fri";
      rawDay[6] = "Sat";
    var loadDay = rawDay[day.getDay()];
    //Load Today's Date
    var date = new Date();
    var loadDate  =  date.getDate();
    //Load Today's Month
    var month = new Date();
    var rawMonth = new Array(12);
      rawMonth[0] = "January";
      rawMonth[1] = "Febuary";
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

    document.getElementById('currentDay').innerHTML = "Today is " + loadDay + ", " + loadMonth + " " + loadDate ;
  }


  /*---------------------------------------------------------------------------
  Generate Current Time
  ---------------------------------------------------------------------------*/
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

  /*---------------------------------------------------------------------------
  Check Browser for GeoLocation Information
  ---------------------------------------------------------------------------*/
  function checkGeoLocation() {
    if ("geolocation" in navigator) {
      $('.js-geolocation').show();
      navigator.geolocation.getCurrentPosition(showPosition, showError);
      console.log("HereNow Message: We have found your Geo Location.")
    } else {
      $('.js-geolocation').hide();
      console.log("HereNow Message: We couldn't find your Geo Location.")
    }

    function showPosition(position) {
      console.log("HereNow: We are currently running GeoLocation in the Navigator and are loading your location.")
      console.log("HereNow: Thanks for allowing us to grab your location.");
      console.log("HereNow: Your current Lat is " + position.coords.latitude)
      console.log("HereNow: Your current Lon is " + position.coords.longitude)
      myLat = position.coords.latitude;
      myLon = position.coords.longitude;
      $("#optionsButton").css("display","block");
      $("#weatherContainer").css("display","block");
      $("#refreshWeather").css("display","block");
      loadOWMAPICurrent();
      generateLocationImage();
      generateMapBackground();
      };

      function showError(error) {
        if (error.code == error.PERMISSION_DENIED)
          console.log("HereNow: Wish you would allow us to grab your location.");
          $("#weatherContainer").css("display","none");
          $("#deniedContainer").css("display","block");
          $("#optionsContainer").css("display","none");
          $("#customizeContainer").css("display","none");
          $("#aboutContainer").css("display","none");
          $("#privacyContainer").css("display","none");
          $("#locationContainer").css("display","none");
          $("#refreshWeather").css("display","none");
          $("#optionsButton").css("display","none");
          $("#backButton").css("display","none");
          $("#exitButton").css("display","none");
      }
  }

  /*---------------------------------------------------------------------------
  Generate MapBox Background Based on Users Location
  ---------------------------------------------------------------------------*/
  function generateMapBackground() {
    var mapboxAPIKey = "pk.eyJ1IjoiZGV2a2FkeW4iLCJhIjoiY2tpNDNobjBzMGRqMDJxbXNpMXd5bGhkeSJ9.6aXmf3mDlVyTvCZ-546pUA";
    var latPos = myLat;
    var lonPos = myLon;
    document.getElementById('mapBoxBackground').src = "https://api.mapbox.com/styles/v1/devkadyn/cki44i8tt1gpp19lkxyq5x7f8/static/" + lonPos + "," + latPos + "," + "15,0/1000x1000?access_token=" + mapboxAPIKey
    //var mapBoxImageLoad = "https://api.mapbox.com/styles/v1/devkadyn/cki44i8tt1gpp19lkxyq5x7f8/static/" + lonPos + "," + latPos + "," + "15,0/650x1000?access_token=" + mapboxAPIKey;
    console.log('HereNow: Map Box Completed')
  }


  /*---------------------------------------------------------------------------
  Generate MapBox Image for Location Tab Based on Users Location
  ---------------------------------------------------------------------------*/
  function generateLocationImage() {
    var mapboxAPIKey = "pk.eyJ1IjoiZGV2a2FkeW4iLCJhIjoiY2tpNDNobjBzMGRqMDJxbXNpMXd5bGhkeSJ9.6aXmf3mDlVyTvCZ-546pUA";
    var latPos = myLat;
    var lonPos = myLon;

    document.getElementById('locationMap').src = "https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/" + lonPos + "," + latPos + "," + "15,0/650x1000?access_token=" + mapboxAPIKey
    console.log('HereNow: Map Box Completed')
  }

  /*---------------------------------------------------------------------------
  Generate JSON data and placement for OpenWeatherMap API Based on Location
  ---------------------------------------------------------------------------*/
  function loadOWMAPICurrent () {
    const currentAPIKey = "61bd3d48471f508fa7cd4799235d2c38";
    var latPos = myLat;
    var lonPos = myLon;

    //GET Rest API for Current Weather
    axios //Node.js Element that is able to pull in API Get requests.
      //OpenWeatherMap Lat and Lon Location Current
      .get("https://api.openweathermap.org/data/2.5/weather?lat=" + latPos + "&lon=" + lonPos + "&appid=" + currentAPIKey + "&units=imperial")
      .then(response => {
        console.log("HereNow: We have grabbed the weather data from OpenWeatherMap and is loaded below...")
        console.log(response.data);

        //Grab Current City Name
        var currentLocationName = response.data.name;
        document.getElementById('currentCity').innerHTML = '<img src="media/buttonicons/locationMarker.png"  width="30px" height="40px"/>' + " " + currentLocationName;
        document.getElementById('pingLocation').innerHTML = '<b>Location:</b> <img src="media/buttonicons/locationMarker.png"  width="30px" height="40px"/>' + " " + currentLocationName + "<br><b>Latitude:</b> " + latPos.toFixed() + "<br><b>Longitude:</b> " + lonPos.toFixed();

        //Grab OpenWeatherMap Update timeout
        var rawLastUpdate = response.data.dt;
        console.log("HereNow: Your raw time is " + rawLastUpdate);
        var dateLastUpdate = new Date(rawLastUpdate * 1000);
        console.log("HereNow: Your Full time is " + dateLastUpdate);
        cleanLastUpdate = dateLastUpdate.toLocaleTimeString('en-US',{ hour: '2-digit', minute: '2-digit' });
        console.log("HereNow: Your cleaned up time is " + cleanLastUpdate);

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
        document.getElementById('currentTemp').innerHTML = cleanTemp + "°F";

        //Grab Today's Feels Like Temp
        var rawFeelsLike = response.data.main.feels_like;
        var cleanFeelsLike= rawFeelsLike.toFixed();
        document.getElementById('feelsLikeTemp').innerHTML = "Feels Like " + cleanFeelsLike + "°F";

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

  /*---------------------------------------------------------------------------
  Run Service Worker for PWA
  ---------------------------------------------------------------------------*/
  function checkServiceWorker () {
    if('serviceWorker' in navigator) {
        navigator.serviceWorker.register('../sw.js').then(function() {
          console.log("HereNow: Your service worker is now registered"); });
    }
  }//End of Service Worker
