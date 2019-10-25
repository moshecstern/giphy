$(document).ready(function () {
    var giphsArray = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];

    // Function for dumping the JSON content for each button into the div
    function displayGiphs() {

      //console.log "this"
    console.log($(this).attr("data-name"));
    var giphName = $(this).attr("data-name");
    var queryURL = "https://www.omdbapi.com/?t=" + giphName + "&apikey=trilogy";
    console.log(queryURL);
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);

    //   $("#results-div").text(JSON.stringify(response));
    console.log(this);
          console.log(response);
////     change to data from giphs 
          // Creates a div to hold the movie
          var newDiv = $("#results-div");
          // movie title all in one line
          newDiv.append("<p>Title: "+response.Title+"</p>");
          // Retrieves the Rating Data
          var rating = response.Rated;
          // console.log("the ratings for this movie is "+ response.Rated);
          // Creates an element to have the rating displayed
          var ratingsDisplay = $("<p>").text("this movie is rated " + rating);
          // Displays the rating
          newDiv.append(ratingsDisplay);
          // Retrieves the release year
          console.log("release year is " + response.Released);
          // Creates an element to hold the release year
          var releaseYear = $("<p>").text("Release Year: "+ response.Released);
          // Displays the release year
          newDiv.append(releaseYear);
          // Retrieves the plot
          var myPlot= response.Plot;
          // Creates an element to hold the plot
          var moviePlot = $("<p>").text("The plot is: " + myPlot);
          // Appends the plot
          newDiv.append(moviePlot);
          // Creates an element to hold the image
          var imgURL = response.Poster;
          // Appends the image
          var displayPoster = $("<p>").html("this poster is <img src ='" + imgURL +"'/>");
            newDiv.append(displayPoster);
          // Puts the entire Movie above the previous movies.
          $("#movies-view").prepend(newDiv);
    });
  };
  // Function for displaying movie data
  function renderButtons() {

        // Deleting the buttons prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of movies
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

        // The movie from the textbox is then added to our array
        giphsArray.push(giph);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();

      });

    // Generic function for displaying the movieInfo
    $(document).on("click", ".giph", displayGiphs);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();







});