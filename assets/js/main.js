// A $( document ).ready() block.
$( document ).ready(function() {


// Initial array of animals
var animals = ["skunk", "squirl"];
console.log("animalInitialArray = ",animals)

function displayAnimalInfo () {

  var animal = $(this).attr("animal-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
animal + "&api_key=dc6zaTOxFJmzC&limit=10";

// Creating an AJAX call for the specific animal button being clicked
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {

  $("#gifs-appear-here").empty();

  // Creating a div to hold the animal
  var animalDiv = $("<div class='animal'>");

  //loops through the length of the results
  for (i = 0; i < response.data.length; i ++){

  // Storing the rating data
  
  var ratings = response.data[i].rating;

  // Creating an element to have the rating displayed
  if (response.data[i].rating !== "g" || "pg" || "pg-13" || "y"){
  var ratingElement = $("<p>").text("Rating: " + ratings);
  }
  // Retrieving the URL for the still image
  var stillImgURL = response.data[i].images.fixed_height_still.url;
  // Retrieving the URL for the giphy 
  var giphImgUrl = response.data[i].images.fixed_height.url;
  // Retrieving the URL for the class
  var giphClass = response.data[i].type;

  // Creating an element to hold the image
  var image = $("<img>").attr("src", stillImgURL)
  .attr("data-still", stillImgURL)
  .attr("data-animate", giphImgUrl)
  .attr("data-state", "still")
  .attr("class", giphClass);

  // Appending the image
  animalDiv.append(ratingElement);
  animalDiv.append(image);
  
  $("#gifs-appear-here").prepend(animalDiv);

  $(".gif").on("click", function() {
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
  }
});

}

function renderButtons() {

  // Deleting the animals prior to adding new animals
  // (this is necessary otherwise you will have repeat buttons)
  $("#animals-appear-here").empty();

  // Looping through the array of animals
  for (var i = 0; i < animals.length; i++) {

    // Then dynamicaly generating buttons for each animal in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of animal-btn to our button
    a.addClass("animal-btn");
    // Adding a data-attribute
    a.attr("animal-name", animals[i]);
    // Providing the initial button text
    a.text(animals[i]);
    // Adding the button to the buttons-view div
    $("#animals-appear-here").append(a);
    console.log("animalArray = ",animals)
  }
}



// This function handles events where a animal button is clicked
$("#addAnimal").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var animalFromInput = $("#animal-input").val().trim();

  // Adding animal from the textbox to our array
  animals.push(animalFromInput);
  

  // Calling renderButtons which handles the processing of our animal array
  renderButtons();
  
});

  // Adding a click event listener to all elements with a class of "movie-btn"
  $(document).on("click", ".animal-btn", displayAnimalInfo);

renderButtons();
});



