// Initial array of animals
var animalArray = ["Dog", "Cat", "Squirrel", "Elephant"];

// Function for displaying animalArray
function renderButtons() {

  $("#giphys").empty();

  // For loop for animalArray
  for (var i = 0; i < animalArray.length; i++) {

    // Creating buttons for animalArray
   
    var a = $("<button>");
    // Adding a class
    a.addClass("animalButton");
    // Adding a data-attribute with a value of the animalArray at index i
    a.attr("data-name", animalArray[i]);
    // Providing the button's text with a value of the animalArray at index i
    a.text(animalArray[i]);
    // Adding the button to the HTML
    $("#giphys").append(a);
  }
}

// This function handles events where one button is clicked
$("#add-animal").on("click", function(event) {
  // prevents page from refreshing        
  event.preventDefault();

  // This line will grab the text from the search bar
  var animal = $("#animal-input").val().trim();
  // The animal from the search is then added to animalArray
  animalArray.push(animal);
  console.log(animalArray)
  // calling renderButtons which handles the processing of animalArray
  renderButtons();
});

// Calling the renderButtons function at least once to display the initial list of animals
renderButtons();

$(".animalButton").on("click", function() {
// Grabbing and storing the data-animal property value from the button
animal = $(this).attr("data-name");
console.log(this);

// Constructing a queryURL using the animal name
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  animal + "&api_key=dc6zaTOxFJmzC&limit=10";

// Performing an AJAX request with the queryURL
$.ajax({
  url: queryURL,
  method: "GET"
})
  // After data comes back from the request
  .then(function(response) {
    console.log(queryURL);

    console.log(response);
    // storing the data from the AJAX request in the results variable
    var results = response.data;

    // Looping through each result item
    for (var i = 0; i < results.length; i++) {

      // Creating and storing a div tag
      var animalDiv = $("<div class='col-md-4'>");

      // Creating a paragraph tag with the result item's rating
     var p = $("<p>").text("Rating: " + results[i].rating);

      // Creating and storing an image tag
      var animalImage = $("<img>");
      // Setting the src attribute of the image to a property pulled off the result item
      animalImage.attr("src", results[i].images.fixed_height_still.url);

      // Appending the paragraph and image tag to the animalDiv
      animalDiv.append(p);
      animalDiv.prepend(animalImage);

      // Appending animalDiv to giphys div 
      $("#giphys").append(animalDiv);
    }
  });
});
