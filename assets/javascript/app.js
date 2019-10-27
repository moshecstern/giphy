$(document).ready(function () {
    var giphsArray = ["Flinstones", "animated batman", "spider man 94", "powerpuff girls"];
    var favGiphsArray=[];
    // Function for dumping the JSON content for each button into the div
    function displayGiphs() {
      // clears out results div everytime we put in new giph search
      $("#results-div").empty();
      
      //console.log "this"
      var giphName = $(this).attr("data-name");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphName + "&limit=11&apikey=l65DOVZqzCV7f9KvfiPdx8g4rfyHcN3A";
      console.log(queryURL);
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function (response) {
        console.log(response);
        console.log(response.data);
                
        // creating new div to put giph
        var newDiv = $("<div>");
        ////     looping through array of giph that we searched for 
        for (var i = 0; i < response.data.length; i++) {
          // responseG is current object being selected
          var responseG = response.data[i];
              //We create a new div to hold the rating and gif
		    var newDiv = $("<div class='aroundGifs'>");
  // Within the new div we append a paragraph for the rating
  newDiv.append("<p>Rating: " + responseG.rating + "</p>");
  // add more stuff for each giph
  newDiv.append("<p> Title: " + responseG.title + "</p>");

  // create "fav-button" for each giph that pushes giph to favGiphArray
  var favButton = $("<button>");
favButton.attr({
  "src": responseG.images.fixed_height.url,
  "class": "fav-button"
});
favButton.text("Fav");
newDiv.append(favButton);
  // id='fav-button'>"+"Fav this Giph!" +"</button

  // newImg is a new image element that will hold the actual gif
  var newImg = $("<img>");
  newImg.attr({
    "src": responseG.images.fixed_height_still.url,
    "data-still": responseG.images.fixed_height_still.url,
    "data-animate": responseG.images.fixed_height.url,
    "data-state": "still",
    "class": "gif"
  });
  
  // appending newImg to newDiv
  newDiv.append(newImg);
  // take the newDiv and apend it to the results div
  $("#results-div").append(newDiv);

  
  
}; // end of loop

// style the individual giphs by grabbing class we added to each giph
// $(".aroundGifs").css("border-style", "double");
// $(".aroundGifs").css("margin", "2px");
// $(".aroundGifs").css("max-width", "600px");

// on fav giph button click 
$(".fav-button").on("click", function(){
  // console.log("im clicking button " + newDiv);
  // console.log(newDiv);
  console.log(responseG);

  // need to change newDiv to current giph
  favGiphsArray.push(newDiv);
  console.log(favGiphsArray);
  $("#fav-giphs").append(favGiphsArray);
  
//
})
// function showgiphsarray(){
//   for (var i = 0; favGiphsArray.length; i++){
//     var b = $("#fav-button");
//     favGiphsArray.append("#fav-giphs");
//   }
// }

$(".gif").on("click", function() {
  // this is refering to the individual giph with class "giph" that we  just  clicked
  var state = $(this).attr("data-state");
  
  // $(this).attr("data-state") will either be "still" or "animate"
  // IF state is still, switch to animate
  if (state === "still") {
    
    var newSrc = $(this).attr("data-animate");
    $(this).attr("src", newSrc);
    $(this).attr("data-state", "animate");
    // else if attr is animate, switch to still
  } else {
    var newSrc = $(this).attr("data-still");
    $(this).attr("src", newSrc);
    $(this).attr("data-state", "still");
  }
}); // end of click handler

});
};

  // Function for displaying giph data
    function renderButtons() {
      
      // Deleting the buttons prior to adding new giphs
      // (this is necessary otherwise you will have repeat buttons)
      $("#buttons-view").empty();
      
      // Looping through the array of giph buttons
      for (var i = 0; i < giphsArray.length; i++) {
        
        // Then dynamicaly generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of giph to our button
        a.addClass("giph");
        // Adding a data-attribute
        a.attr("data-name", giphsArray[i]);
        // Providing the initial button text
        a.text(giphsArray[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
      }
    }
    
    // This function handles events where one button is clicked
    $("#add-giph").on("click", function (event) {
      event.preventDefault();
      
      // This line grabs the input from the textbox
      var giph = $("#giph-input").val().trim();
      
      // The Giph from the textbox is then added to our array
      giphsArray.push(giph);
      
      // Calling renderButtons which handles the processing of our movie array
      renderButtons();
      
    });
    
    // Generic function for displaying the giphs on click
    $(document).on("click", ".giph", displayGiphs);
    
    // Calling the renderButtons function to display the intial buttons
    renderButtons();
    
    
    
    
    
    
  });