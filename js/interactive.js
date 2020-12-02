/*---------------------------------------------------------------------------
JavaScript for Showing and Hiding Pages for HereNow
---------------------------------------------------------------------------*/

//Show Weather Page
function weatherOpen() {
  console.log("Showing weather...")
  $("#weatherContainer").css("display","block");
  $("#deniedContainer").css("display","none");
  $("#aboutContainer").css("display","none");
  $("#locationContainer").css("display","none");
  $("#bottomNav").css("display","block");
}

//Show About Page
function aboutOpen() {
  console.log("Showing customize...")
  $("#weatherContainer").css("display","none");
  $("#deniedContainer").css("display","none");
  $("#aboutContainer").css("display","block");
  $("#locationContainer").css("display","none");
  $("#bottomNav").css("display","block");
}

//Show Location Page
function locationOpen() {
  console.log("Showing location...")
  $("#weatherContainer").css("display","none");
  $("#deniedContainer").css("display","none");
  $("#aboutContainer").css("display","none");
  $("#locationContainer").css("display","block");
  $("#bottomNav").css("display","block");
}

function weatherRefresh() {
  location.reload();
}
