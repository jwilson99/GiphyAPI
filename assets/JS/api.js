$(document).ready(function(){
    //creates an array of categories
    var categories = ["happy","sad","angry","confused","surprised","tired","excited","annoyed","scared"];

    //create a button for each category and append it to the #buttons div
    $(categories).each(function render(i) {
        $('<input type="button" class=categoryButton value="' + categories[i] +'"/>').appendTo($("#buttons"));
    });

    //when you click a category button
    $(document).on("click",".categoryButton",function(){

       //empty the gif div
        $("#gifs").empty();

       //create and send an AJAX request based on the value of the button
        $.ajax({
            url: "https://api.giphy.com/v1/gifs/search?api_key=ce69ca247693435abefbd3b1fa395849&limit=10&q=" + this.value,
            method: "GET"

        //when the response is received
        }).done(function(response){

            //log the response to the console
            console.log(response);

            //for each element in response.data
            $(response.data).each(function(j){

                //creates a new div
                var newDiv = $("<div>");
                newDiv.addClass("gifContain");

                //stores rating data
                var rating = "Rating: " + response.data[j].rating +"<br>";

                //creates a new image element
                var newImage = $("<img>");

                //gives the img a src based on response data
                newImage.attr("src","https://i.giphy.com/media/" + response.data[j].id + "/200_s.gif");

                //assigns the image various attributes
                newImage.attr("data-animate","https://i.giphy.com/media/" + response.data[j].id + "/200.gif");

                newImage.attr("data-still","https://i.giphy.com/media/" + response.data[j].id + "/200_s.gif");

                newImage.attr("data-state","still");

                newImage.attr("title","Click to start or stop this gif!");

                newImage.attr("alt","shows a gif related to the clicked button");

                newImage.addClass("categoryImage");

                //appends rating to newDiv
                newDiv.append(rating);

                //appends image to newDiv
                newDiv.append(newImage);

                //appends the newDiv to the gifs div
                $("#gifs").append(newDiv);
            });
        });
    });

    //when the create button is clicked
    $(".addButton").on("click", function(event){

        //override existing default conditions for the input button
        event.preventDefault();

        //grabs text from the text box
        var userInput = $("#userInput").val();

        //makes new input lower case
        userInput = userInput.toLowerCase();

        //checks to see if the text box is empty or a repeat value
        if (userInput !== "" && categories.indexOf(userInput) === -1){

            //empties the buttons div
            $("#buttons").empty();

            //adds the text from the text box to the categories array
            categories.push(userInput);

            $(categories).each(function render(k) {
                $('<input type="button" class=categoryButton value="' + categories[k] +'"/>').appendTo($("#buttons"));
            });
        }
    });

    //adds a click event to categoryImage class elements
    $(document).on("click", ".categoryImage",
        function(event){

        //creates a variable based on the image's data-state
        var state = $(this).attr("data-state");

        //if the state is still
        if (state === "still"){

            //set src to data-animate
            $(this).attr("src", $(this).attr("data-animate"));

            //sets data-state to animate
            $(this).attr("data-state","animate");

            //else
        } else {

            //set src to data-still
            $(this).attr("src", $(this).attr("data-still"));

            //sets data-state to still
            $(this).attr("data-state","still");
        }
    })
});