var characters = ["Mr. Lahey", "Ricky", "Bubbles", "Randy", "Trevor and Cory"];
var animateUrl = "";
var staticUrl = ""; 
      // On click function that creates html element that houses user input
      $("#addChar").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter 
        event.preventDefault();

        // Takes user input
        var char = $("#char-input").val().trim();
        // input is moved to character array
        characters.push(act);

        // calling renderButtons which handles the processing of our movie array
        renderButtons();

      });

      $('#addsubmit').on('click', function(){
    var pets = $('#add').val().trim();
    $('#animalbuttons').append('<button data-animal="'+pets+'">'+pets+'</button>')
    return false;
                    });

      // Calling the renderButtons function at least once to display the initial list of characters
      renderButtons();


      // Function for showing characters
      function renderButtons() {

        //Deletes excess buttons
        $("#char-view").empty();

        // Looping through the array of characters
        for (var i = 0; i < characters.length; i++) {

          //Generates a button for characters in the array
          var a = $("<button>");
          // Adding a class
          a.addClass("chars");
          // Adding a data-attribute with a value of the movie at index i
          a.attr("data-name", characters[i]);
          // Providing the button's text with a value of the movie at index i
          a.text(characters[i]);
          // Adding the button to the HTML
          $("#char-view").append(a);
        }
      }


// Adding click event listener for all buttons
    $(document).on('click','button', function() {


      // Grabbing and storing the data-animal property value from the button
      var individualactor = $(this).attr("data-name");

      // Constructing a queryURL using the animal name
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        individualactor + "&api_key=dc6zaTOxFJmzC&limit=10";

      // Performing an AJAX request with the queryURL
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        
        .done(function(response) {

          // storing the data from the AJAX request in the results variable
          var results = response.data;

          // Looping through each result item
          for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var charDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var charImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            charImage.attr("src", results[i].images.fixed_height_still.url);
            charImage.attr("data-animate", results[i].images.fixed_height.url);
            charImage.attr("data-still", results[i].images.fixed_height_still.url);
            charImage.attr("data-state", "still"); // set the image state
            charImage.addClass("gif");


            
            charDiv.append(p);
            charDiv.append(charImage);

            // Prependng to the bottom of the html div
            $("#charsHTML").prepend(charDiv);
          }
        });
        $("#charsHTML").empty();
    });
$(document).on("click", ".gif", function(){
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });