// A $( document ).ready() block.
$( document ).ready(function() {


// Initial array of animals
var animals = ["skunk", "squirl"];

function displayAnimalInfo () {

  var animal = $(this).attr("animal-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
animal + "&api_key=dc6zaTOxFJmzC&limit=1";

// Creating an AJAX call for the specific animal button being clicked
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  // Creating a div to hold the animal
  var animalDiv = $("<div class='animal'>");
  console.log(animalDiv);

  // Storing the rating data
  var ratings = response.data.rating;

  // Creating an element to have the rating displayed
  var ratingElement = $("<p>").text("Rating: " + ratings);
  // Displaying the rating
  animalDiv.append(ratingElement);

  // Retrieving the URL for the image
  var imgURL = response.data[0].images.fixed_height.url;    

  // Creating an element to hold the image
  var image = $("<img>").attr("src", imgURL);

  // Appending the image
  animalDiv.append(image);

  

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


