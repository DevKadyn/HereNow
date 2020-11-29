//Interactive functionaility like opening and closing fuax pages.

//Show Weather Page
function weatherOpen() {
  console.log("Showing weather...")
  $("#weatherContainer").css("display","block");
  $("#deniedContainer").css("display","none");
  $("#optionsContainer").css("display","none");
  $("#customizeContainer").css("display","none");
  $("#aboutContainer").css("display","none");
  $("#privacyContainer").css("display","none");
  $("#locationContainer").css("display","none");
  $("#optionsButton").css("display","block");
  $("#backButton").css("display","none");
  $("#exitButton").css("display","none");
}

//Show options Page
function optionsOpen() {
  console.log("Showing options...")
  $("#weatherContainer").css("display","none");
  $("#deniedContainer").css("display","none");
  $("#optionsContainer").css("display","block");
  $("#customizeContainer").css("display","none");
  $("#aboutContainer").css("display","none");
  $("#privacyContainer").css("display","none");
  $("#locationContainer").css("display","none");
  $("#optionsButton").css("display","none");
  $("#backButton").css("display","none");
  $("#exitButton").css("display","block");
}

//Show About Page
function aboutOpen() {
  console.log("Showing customize...")
  $("#weatherContainer").css("display","none");
  $("#deniedContainer").css("display","none");
  $("#optionsContainer").css("display","none");
  $("#customizeContainer").css("display","none");
  $("#aboutContainer").css("display","block");
  $("#privacyContainer").css("display","none");
  $("#locationContainer").css("display","none");
  $("#optionsButton").css("display","none");
  $("#backButton").css("display","block");
  $("#exitButton").css("display","none");
}

//Show Customize Page
function customizeOpen() {
  console.log("Showing customize...")
  $("#weatherContainer").css("display","none");
  $("#deniedContainer").css("display","none");
  $("#optionsContainer").css("display","none");
  $("#customizeContainer").css("display","block");
  $("#aboutContainer").css("display","none");
  $("#privacyContainer").css("display","none");
  $("#locationContainer").css("display","none");
  $("#optionsButton").css("display","none");
  $("#backButton").css("display","block");
  $("#exitButton").css("display","none");
}

//Show Privacy Page
function privacyOpen() {
  console.log("Showing privacy...")
  $("#weatherContainer").css("display","none");
  $("#deniedContainer").css("display","none");
  $("#optionsContainer").css("display","none");
  $("#customizeContainer").css("display","none");
  $("#aboutContainer").css("display","none");
  $("#privacyContainer").css("display","block");
  $("#locationContainer").css("display","none");
  $("#optionsButton").css("display","none");
  $("#backButton").css("display","block");
  $("#exitButton").css("display","none");
}

//Show Location Page
function locationOpen() {
  console.log("Showing location...")
  $("#weatherContainer").css("display","none");
  $("#deniedContainer").css("display","none");
  $("#optionsContainer").css("display","none");
  $("#customizeContainer").css("display","none");
  $("#aboutContainer").css("display","none");
  $("#privacyContainer").css("display","none");
  $("#locationContainer").css("display","block");
  $("#optionsButton").css("display","none");
  $("#backButton").css("display","block");
  $("#exitButton").css("display","none");
}
