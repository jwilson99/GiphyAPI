$(document).ready(function(){
    //creates an array of categories
    var categories = ["happy","sad","angry","confused","surprised","tired","excited","annoyed","scared"];

    //create a button for each category and append it to the #buttons div
    $(categories).each(function render(i) {
        $('<input type="button" class=categoryButton value="' + categories[i] +'"/>').appendTo($("#buttons"));
    });

    //when you click a category button
    $(".categoryButton").on("click",function(){

       //empty the gif div
        $("#gif").empty();

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

                //stores rating data
                var rating = "Rating: " + response.data[j].rating;

                //creates a new image element
                var newImage = $("<img>");

                //gives the img a src based on response data
                newImage.attr("src","https://i.giphy.com/media/" + response.data[j].id + "/200_s.gif");

                //gives the image a data-animate attribute
                newImage.attr("data-animate","https://i.giphy.com/media/" + response.data[j].id + "/200.gif");

                //gives the image a data-still attribute
                newImage.attr("data-still","https://i.giphy.com/media/" + response.data[j].id + "/200_s.gif");

                //gives the image a data-state attribute
                newImage.attr("data-state","still");

                //gives the image a class
                newImage.attr("class","categoryImage");

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
    $("#addButton").on("click", function(event){

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

            //for each item in the categories arrays
            for (var k = 0; k < categories.length; k++){

                //creates new button
                var newButton = $("<button>");

                //gives the button a class
                newButton.addClass("categoryButton");

                //adds text the buttons
                newButton.text(categories[k]);

                //appends the button to the buttons div including new input
                $("#buttons").append(newButton);
            }
        }
    })
});