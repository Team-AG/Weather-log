// CHANGE ALL VAR IN A APikey
var apiKey = "b5a35e7e4d304e38a711535bd203a2c3";
// HIDE display ON MAIN SCREEN
$("#forCast").hide();
$("#jumbotron").hide();
// WHEN THE BUTTON "EXPLORE" IS CLICKED DO EVERYTHING IN THIS function
$("#explore").on("click", function () {
  // SET VAR location TO WHAT USER TYPES INTO EXPLORE BOX
  var location = $(inputLocation).val();
  // TAKING OPEN WETHER MAP APiURL SETTING = TO A VAR
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    location +
    "&appid=" +
    apiKey;
  // CALLING THE API BY USING URL LISTED ABOVE
  $.ajax({
    url: apiUrl,
    method: "GET",
    // ajax getting url once recived run function
    // TELLING ITS A FUNCTION AND ITS PASSING THROUGH API SITE BY NAMING IT "itsFreeJustGrabIT"
  }).then(function (itsFreeJustGrabIT) {
    // JUST SETTING VAR TO = VALUE FROM THE API
    var locationInfo = $("#location").text(itsFreeJustGrabIT.name);
    // TAKING A OBJECT SETTING A VAR FOR THE DATE
    var today = new Date();
    // itsFreeJustGrabIT IS FROM THE API SITE
    // SETTING A VAR = TO THE CERTAIN VAL IN THE TODAY OBJECT
    var minutes = today.getMinutes();
    // SET console.Log for to itsFreeJustGrabIT to see all possible possible objects/var when you inspect html
    // FROM THE API SETTING A VAR = TO CURRENT TEMP FROM API
    var temp = itsFreeJustGrabIT.main.temp;
    // FROM THE API SETTING A VAR = TO CURRENT HIGH TEMP FROM API
    var highTemp = itsFreeJustGrabIT.main.temp_max;
    // FROM THE API SETTING A VAR = TO CURRENT LOW TEMP FROM API
    var lowTemp = itsFreeJustGrabIT.main.temp_min;
    // FROM THE API SETTING A VAR = TO CURRENT WHAT IT FEELS LIKE FROM API
    var tempOverAll = itsFreeJustGrabIT.main.feels_like;
    // FROM THE API SETTING A VAR = TO CURRENT humidity FROM API
    var air = itsFreeJustGrabIT.main.humidity;
    // FROM THE API SETTING A VAR = TO CURRENT WINDSPEED FROM API
    var wind = itsFreeJustGrabIT.wind.speed;
    // TAKING ABOVE VAR AND PASTING IT TO A ID TO FUNCTION WITHIN HTML "LINKING"
    // SETTING ABOVE ID TO A TEXT TO DISPLAY AS MM/DD/YYYY
    $("#today").text(
      today.getMonth() + "/" + today.getDate() + "/" + today.getFullYear()
    );

    // CHECKING IF ABOVE VAR IS LESS THEN 10 IF NOT ADD + 0 TO START
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    // SETTING ABOVE ID TO A FUNCTION HTML TO DISPLAY AS HH/MM/SS
    $("#time").html(
      today.getHours() +
        ":" +
        minutes +
        ":" +
        today.getSeconds() +
        // SETTING A CLASS
        "<span class='timezone'>(Eastern Time(ET))</span>"
    );
    // SETTING ABOVE ID TO A FUNCTIONN HTML TO DISPLAY AS TEMP"000" + DEGREE SYMBOL + F
    $("#temp").html(
      tempConversion(temp) + "<span class='nowsymbols'> \u00B0F </span>"
    );
    // SETTING ABOVE ID TO A FUNCTIONN HTML TO DISPLAY AS HIGHTEMP"000" + DEGREE SYMBOL + F
    $("#highTemp").html(
      tempConversion(highTemp) + "<span class='todaysymbols'> \u00B0F </span>"
    );
    // SETTING ABOVE ID TO A FUNCTIONN HTML TO DISPLAY AS LOW TEMP"000" + DEGREE SYMBOL + F
    $("#lowTemp").html(
      tempConversion(lowTemp) + "<span class='todaysymbols'> \u00B0F </span>"
    );
    // SETTING ABOVE ID TO A FUNCTIONN HTML TO DISPLAY AS IT FEELS LIKE "000" + DEGREE SYMBOL + F
    $("#tempOverAll").html(
      tempConversion(tempOverAll) +
        "<span class='todaysymbols'> \u00B0F </span>"
    );
    // SETTING ABOVE ID TO A FUNCTIONN HTML TO DISPLAY AS humidity"000" + %
    $("#air").html(air + "<span class='todaysymbols'> % </span>");
    // SETTING ABOVE ID TO A FUNCTIONN HTML TO DISPLAY AS WINDSPEED 000 " + MPH
    $("#wind").html(wind + "<span class='todaysymbols'> MPH <span>");
    // TAKING THE FIRST API LISTED ABOVE AND PULLING LATATUDE AND LONGATIUDE JUSTT SETTING A VAL TO = TO THE API
    var lat = itsFreeJustGrabIT.coord.lat;
    var long = itsFreeJustGrabIT.coord.lon;
    // OPEN WEATHER MAP API FOR ANOTHER ANOTHER API TO SET LATATUDE AND LONGATIUDE WITHIN THE city
    var uvUrl =
      "https://api.openweathermap.org/data/2.5/uvi?lat=" +
      lat +
      "&lon=" +
      long +
      // MY VAR apiKey
      "&appid=" +
      apiKey;
    // OPEN WEATHER MAP TO SET A VAR = TO UV INDEX
    $.ajax({
      url: uvUrl,
      method: "GET",
    }).then(function (itsFreeJustGrabIT) {
      var uvIndex = itsFreeJustGrabIT.value;
      console.log(itsFreeJustGrabIT);
    });
    // OPENING WEATHER MAP  TO = THE NEXT 5 DAYS COULD BE 7 IF MOTIVEDATED
    var fiveDayForecastUrl =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      long +
      "&appid=" +
      apiKey;
    // OPENING WEATHER MAP API VAR TO CALL IT A VAR "itsFreeJustGrabIT"
    $.ajax({
      url: fiveDayForecastUrl,
      // DEFINE THE METHOD GET
      method: "GET",
      // TEN ONCE IT GRAB I NAME "itsFreeJustGrabIT" "KIND OF LIKE A PACKAGE"
    }).then(function (itsFreeJustGrabIT) {
      // SETTING A CONSOLE.LOG
      console.log(itsFreeJustGrabIT);
      // ONCE SUMMIT EXPLORE DISPLAY HTML ELEMNTS
      $("#forCast").show();
      $("#jumbotron").show();
      // JAVASCRIPT BUILT IN OBJECT "DATE" AND CALLING IT DATES
      var dates = new Date();
      // JAVASCRIPT BUILT IN OBJECT "DATE" AND CALLING IT CURRENTDATE
      var currentDate = new Date();
      // CREATING A FOR LOOP FOR THE 5 DAY forCast
      // TELLING THE FORLOOP TO RUN 5 TIMES
      // 1.  THING CREATE A VAR AND SET IT = TO 0 AND RUN UNTIL i LESS THEN 5 AND THEN ONCE COMPLETE ADD + 1 TO COMPLETE THE LOOP
      for (var i = 0; i < 5; i++) {
        // SETTING VAR NEXTDAY TO = CURRENTDATE AND  GRAB FROM BUILT IN JAVASCRIPT AND ADDING 1 TO SET NEXT DAY
        var nextDay = currentDate.getDate() + (i + 1);
        // SETTING A BUILT IN FUNCTION AN SETTING TO NEXT DATE USING KEY WORD "NEW" CREATING A NEW VERSION/COPY OF DATE"
        var nextDate = new Date();
        //CAPTURES TODAY DATE AND PASSING THROUGHT A PERAMATER "NEXT DAY = TO A NUMBER" TO SHOW THE NEXT DATES
        nextDate.setDate(nextDay);
        // SETTING ELEMTS TO = DATES + 1 = TO "DATES1 DATES2 DATES3 DATES4 DATES5 "
        $("#dates" + i).html(
          // SETTING CLASS TO = WEEKLYLOG
          "<span class='weeklylog'> Date: </span>" +
            //PARSEINT = WHAT EVER INSIDE THAT HAS TO BE A NUMBER AND TRREAT IT AS A NUMBER AND ADD 1
            parseInt(nextDate.getMonth() + 1) +
            // ADD A / BETWEEN MOTH
            "/" +
            // ADD A / BETWEEN DAY
            nextDate.getDate() +
            //ADD A / BETWEEN YEAR
            "/" +
            nextDate.getFullYear()
        );
        // CONVERTING WEEKLY FORCAT TO = A NUBER THAT IS SET BY A TEMPCONVERSION FUNCTION
        var weeklyForcast = tempConversion(
          // itsFreeJustGrabIT IS and call the api var i + 1 = .temp.day from the api "digging into the api"
          itsFreeJustGrabIT.daily[i + 1].temp.day
        );
        //DIGGIN TO GRAB HUMIDIY AND ADDING PLUS FOR NEXT DAY
        var weeklyHumidity = itsFreeJustGrabIT.daily[i + 1].humidity;
        //DIGGIN TO GRAB description AND ADDING PLUS FOR NEXT DAY
        var weeklyDescription =
          itsFreeJustGrabIT.daily[i].weather[0].description;
        //SAYING DAY PLUS iTO = ADD 1 THROUGH THE LOOP
        $("#day" + i).html(
          // SET CLASS WEEKLYLOG
          "<span class='weeklylog'> Temp: </span>" +
            weeklyForcast +
            // SET CLASS TO SYMBOLS
            "<span class='symbols'> \u00B0F </span>"
        );
        // SAYING HUMIDIY PLUS 1 TO RUN WITH HTML
        $("#hottness" + i).html(
          // SET CLASS TO WEEKLOG
          "<span class='weeklylog'> Humidity: </span> " +
            weeklyHumidity +
            // SETTING CLASS SYMBOLS
            "<span class='symbols'> % </span>"
        );
        // SAYING description PLUS 1 TO RUN WITH HTML
        $("#description" + i).html(
          // SETTING CLASS WEEKLYLOG
          "<span class='weeklylog'> Weather: </span> " + weeklyDescription
        );
      }
    });
  });
});
// TEMP CONVERSION FROM KELVIN TO TO CELSIUS
function tempConversion(kelvin) {
  // SETTING VAR CELSIUS TO = KELVIN CONVERTED TO CELSIUS
  var celsius = kelvin - 273.15;
  //CONVERTING CLECIUS TO KELVIN
  return Math.round((celsius * 9) / 5 + 32);
}
