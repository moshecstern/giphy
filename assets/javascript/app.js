$(document).ready(function () {
  var giphsArray = ["Batman", "Spider-Man", "Superman", "Groot", "teen titans", "Wonder Woman", 
"Flash", "Green Arrow", "Avengers","Green Lantern", "The Hulk", "Black Panther", "Captain America", 
"Iron-Man","Justice League", "Aquaman", "Captain Marvel", "Deadpool", "Thor", "Wolverine", "guardians of the galaxy",
"suicide squad", "Doctor Strange", "Ant-Man", "X-Men", "Watchmen", "HellBoy", "Martian Manhunter", "Black Widow", "Swamp Thing",
"Fantastic Four", "Catwoman", "Star-Lord", "Daredevil", "Dr. Manhattan"
];
  var favGiphsArray = [];
  // Function for dumping the JSON content for each button into the div
  function displayGiphs() {
    // clears out results div everytime we put in new giph search
    $("#results-div").empty();
    $("#results-two").empty();

    //console.log "this"
    var giphName = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphName + "&limit=12&apikey=l65DOVZqzCV7f9KvfiPdx8g4rfyHcN3A";
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
        newDiv.append("<p>Rating: " + responseG.rating.toUpperCase() + "</p>");
        // add more stuff for each giph
        newDiv.append("<p> Title: " + responseG.title + "</p>");

        // create "fav-button" for each giph that pushes giph to favGiphArray
        var favButton = $("<button>");
        favButton.attr({
          "src": responseG.images.fixed_height.url,
          "class": "fav-button"
        });
        favButton.css("background-color", "darkturquoise");
        favButton.css("border-color", "gray");
        favButton.css("color", "lightslategrey");
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
      // clicking fav button!!
      $(".fav-button").on("click", function () {
        // this.parent takes parent element which is the div with giph and giph data
        var wholeDiv = $(this).parent();
        console.log($(this).parent());
        // if fav giphs . attr width is more than 70% then
        // if($("#fav-giphs").attr(width) < "70%"){
          $("#fav-giphs").append(wholeDiv);
          // else appen wholeDiv to fav-giphs-two
          // }else {
            // $("#fav-giphs-two").append(wholeDiv);
            // }
            $(wholeDiv).addClass("new-fav-div");
          }) // end of on click function
          
          
          
          
          // $(".fav-button").on('click', function(event) {
            //   // 'this' here = externalObject
            //   this.fnFromExternalObject($(event.currentTarget).data(".gif"));
            // }.bind(externalObject));
            
            
            // function showgiphsarray(){
              //   for (var i = 0; favGiphsArray.length; i++){
                //     var b = $("#fav-button");
                //     favGiphsArray.append("#fav-giphs");
                //   }
                // }
                
                
                $(".gif").on("click", function () {
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
                
              });// end of first ajax call. giphy one
              
              // writing second ajax call for movie info
              var queryURLtwo = "https://www.omdbapi.com/?t=" + giphName + "&apikey=trilogy";
              
              // Creating an AJAX call for the specific movie button being clicked
              $.ajax({
                url: queryURLtwo,
                method: "GET"
              }).then(function (response) {
                console.log(response);
                // Creating a div to hold the movie
                // var movieDiv = $("<div class='movie'>");
                var movieDiv = $("<div class='aroundGifs movieDiv'>");
                
                // Storing the rating data
                var rating = response.Rated;
                
                // Creating an element to have the rating displayed
                var pOne = $("<p>").text("Rating: " + rating);
                
                // Displaying the rating
                movieDiv.append(pOne);
                
                // Storing the release year
                var released = response.Released;
                
                // Creating an element to hold the release year
                var pTwo = $("<p>").text("Released: " + released);
                
                // Displaying the release year
                movieDiv.append(pTwo);
                
                // Storing the plot
                var plot = response.Plot;
                
                // Creating an element to hold the plot
                var pThree = $("<p>").text("Plot: " + plot);
                
                // Appending the plot
                movieDiv.append(pThree);
                
                // Retrieving the URL for the image
                var imgURL = response.Poster;
                
                // Creating an element to hold the image
                var image = $("<img>").attr("src", imgURL);
                
                // Appending the image
                movieDiv.append(image);
                
                // Putting the div we just made into results-div
                $("#results-two").append(movieDiv);
                
              }); // end of second ajax call
              ////// not working right
              
              
              // writing 3rd api for superhero data
              // var queryURLthree = "https://superheroapi.com/api/10214859933028426/search/" + giphName;
              var queryURLthree = "https://superheroapi.com/api/10214859933028426/search/" + giphName + "/id/biography";
              // https://superheroapi.com/api/access-token/search/name
              // 10214859933028426	api key
              
              // Creating an AJAX call for the specific movie button being clicked
              console.log(queryURLthree);
              $.ajax({
                url: queryURLthree,
                method: "GET"
              }).then(function (response) {
                console.log("QUERY URL: " + queryURLthree);
                console.log(response);
                console.log("my response is "+response.results[0]);
                // if(response === true){

                // making var to hold file path of first result in search
                // var ourHeroResponse = response.results[i];
                var heroDataDiv = $("<div class='aroundGifs movieDiv'>");
                
                // making loop to loop through all names of hero
                for (i=0; i < response.results.length; i++){
                  // // Storing hero name
                  var name = response.results[i].name;
                  // // Creating an element to have the name displayed
                  var addP = $("<p>").text("Version "+[i+1]+" : " + name);
                  // // Displaying the name
                  heroDataDiv.append(addP);
                  // console.log(name);
                  
                  var addP2 = $("<p>").text("Aliases: ");
                  for (j=0; j < response.results[i].biography.aliases.length; j++){
                    var aliasesA = response.results[i].biography.aliases[j];
                    // console.log(aliasesA);
                    addP2.append(aliasesA + ", ");
                    heroDataDiv.append(addP2);
                  }
                  var baseA = response.results[i].work.base;
                  var addP5 = $("<p>").text("Base: "+ baseA);
                  heroDataDiv.append(addP5);

                  
                  // cant figure out how to display
                  // adding  response.results[i].connections.group-affiliation[l]
                  // var addP3 = $("<p>").text("Groups: ");
                  // for (l=0; l < response.results[i].connections.group-affiliation.length; l++){
                    // var groupsFound = response.results[i].connections.group-affiliation.show([l]);
                    // console.log(groupsFound);
                    // addP3.append(groupsFound + ", ");
                    // heroDataDiv.append(addP3);
                    // }
                    
                    // // making image for each hero-- browser doesnt support it
                    // // // Retrieving the URL for the image
                    // var addPicture = $("<img>");
                    // var heroImg = response.results[i].image.url;
                    // // // Creating an element to hold the image
                    // var image = $("<img>").attr("src", heroImg);
                    // // // Appending the image
                    // image.append(image);
                    // // // Putting the div we just made into results-div
                    // heroDataDiv.append(heroImg);
                    
                  }; // end of loop for name
                    var publisherA = response.results[0].biography.publisher;
                    var addP4 = $("<p>").text("Publisher: "+ publisherA);
                    heroDataDiv.prepend(addP4);
                    
                      $("#results-two").append(heroDataDiv);
                    
                
                  }); // end of 3rd api search
                  
                }; // end of displayresults
              
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
                  // adding css to each button
                  // a.attr({
                  //   "margin": "2px",
                  //   "background-color": "yellow",
                  //   "border-radius": "25%"
                    
                  // });
          
                  a.css("margin", "2px");
                  a.css("background-color", "darkturquoise");
                  a.css("border-radius", "10px"); 
                  a.css("padding", "8px"); 
                  a.css("font-size", "15px"); 
                  a.css("color", "grey");


                 // Adding the button to the buttons-view div
                  $("#buttons-view").append(a);

                  // style the individual giphs by grabbing class we added to each giph
                  // $(".aroundGifs").css("border-style", "double");
                  // $(".aroundGifs").css("margin", "2px");
                  // $(".aroundGifs").css("max-width", "600px");
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

  // add another api that will search of there is a movie connected with the name searched 
  // and then prepend to newDiv







});