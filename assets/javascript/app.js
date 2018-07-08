// Initial array of animals
var animalArray = ["Dog", "Cat", "Squirrel", "Elephant"];

// Function for displaying animalArray
function renderButtons() {

  $("#giphys").empty();
  $("#buttonsHere").empty()
  // For loop for animalArray
  for (var i = 0; i < animalArray.length; i++) {

    // Creating buttons for animalArray
   
    var a = $("<button class='btn btn-primary'>");
    // Adding a class
    a.addClass("animalButton");
    // Adding a data-attribute with a value of the animalArray at index i
    a.attr("data-name", animalArray[i]);
    // Providing the button's text with a value of the animalArray at index i
    a.text(animalArray[i]);
    // Adding the button to the HTML
    
    $("#buttonsHere").append(a);
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
//function displayAnimalGiphys {
$(document).on("click", ".animalButton", function() {
// Grabbing and storing the data-name property value from the button
  animal = $(this).attr("data-name");


  // Constructing a queryURL using the animal name
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  animal + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  })
  // After data comes back from the request
  .then(function(response) {
    
    console.log(response);
    // storing the data from the AJAX request in the results variable
    var results = response.data;

    // Looping through each result item
    for (var i = 0; i < results.length; i++) {

      
    var animalDiv = $("<div class='col-md-4'>");

      // Creating a paragraph tag with the result item's rating
      var p = $("<p>").text("Rating: " + results[i].rating);
      var animalAnimated = results[i].images.fixed_height.url;
      var animalStatic = results[i].images.fixed_height_still.url;
      // Creating and storing an image tag
      var animalImage = $("<img>");
      animalImage.attr("src", animalStatic);
      animalImage.addClass("animalGiphys");
      animalImage.attr("data-state", "still");
      animalImage.attr("data-still", animalStatic);
      animalImage.attr("data-animate", animalAnimated);
      // Making the giphy static
      //animalImage.attr("src", results[i].images.fixed_height_still.url);
      // Making the giphy animated
      //animalImage.attr("src", results[i].images.fixed_height.url);
      // Appending the paragraph and image tag to the animalDiv
      animalDiv.append(p);
      animalDiv.prepend(animalImage);

      // Prepending animalDiv to giphys div 
      $("#giphys").prepend(animalDiv);

      //$(document).on("click", "#giphys", );

      $(document).on("click", "#giphys", giphysPausePlay);
      //This is my function to make the giphys 
      function giphysPausePlay() {
        var state = $(this).attr("data-state");
         if (state === "still") {
           $(this).attr("src", $(this).attr("data-animate"));
           $(this).attr("data-state", "animate");
         } else {
           $(this).attr("src", $(this).attr("data-still"));
           $(this).attr("data-state", "still");
          }
      }

    }
  });
});
