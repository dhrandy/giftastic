// A $( document ).ready() block.
$(function() {

// Initial arra of animals
var tools = ["hammer", "nail", "screwdriver"];

function renderButtons() {

  // Deleting the animals prior to adding new animals
  // (this is necessary otherwise you will have repeat buttons)
  $("#tools-appear-here").empty();

  // Looping through the array of animals
  for (var i = 0; i < tools.length; i++) {

    // Then dynamicaly generating buttons for each tool in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of tool-btn to our button
    a.addClass("tool-btn btn btn-primary");
    // Adding a data-attribute
    a.attr("tool-name", tools[i]);
    // Providing the initial button text
    a.text(tools[i]);
    // Adding the button to the buttons-view div
    $("#tools-appear-here").append(a);
    console.log("toolArray = ",tools)
  }
}

$("#addTool").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var toolFromInput = $("#tool-input").val().trim();

  // Adding tool from the textbox to our array
  tools.push(toolFromInput);

  // Calling renderButtons which handles the processing of our tool array
  renderButtons();
});

function displayToolInfo () {

  var tool = $(this).attr("tool-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + "tool-" +
tool + "&api_key=dc6zaTOxFJmzC&limit=10";

// Creating an AJAX call for the specific tool button being clicked
$.ajax({
  url: queryURL,
  method: "GET"
}).done(function(response) {

  $("#gifs-appear-here").empty();

  // Creating a div to hold the tool
  var toolDiv = $("<div class='tool'>");

  var responseData = response.data;

  //loops through the length of the results
  for (i = 0; i < responseData.length; i ++){

  // Storing the rating data
  
  var ratings = responseData[i].rating;

  // Creating an element to have the rating displayed
   if (ratings[i].rating !== "g" || "pg" || "pg-13" || "y"){
  var ratingElement = $("<p>").text("Rating: " + ratings);
   }
  // Retrieving the URL for the still image
  var stillImgURL = responseData[i].images.fixed_height_still.url;
  // Retrieving the URL for the giphy 
  var giphImgUrl = responseData[i].images.fixed_height.url;
  // Retrieving the URL for the class
  var giphClass = responseData[i].type;

  // Creating an element to hold the image
  var image = $("<img>").attr("src", stillImgURL)
  .attr("data-still", stillImgURL)
  .attr("data-animate", giphImgUrl)
  .attr("data-state", "still")
  .attr("class", giphClass);

  // Appending the image
  toolDiv.append(ratingElement);
  toolDiv.append(image);
  
  $("#gifs-appear-here").prepend(toolDiv);

  }
  }
)}

$(".gif").on("click", function() {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state == "still") {
    $(this).attr("src", $(this).data("animate"));
  } else {
    $(this).attr("src", $(this).attr("still"));
    $(this).attr("data-state", "still");
    console.log("still");
  }

});


// This function handles events where a tool button is clicked

 
    $(document).on("click", ".gif", function () {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
      console.log("animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
      console.log("still");
    }
  
});

  // Adding a click event listener to all elements with a class of "movie-btn"
  $(document).on("click", ".tool-btn", displayToolInfo);

renderButtons();
});