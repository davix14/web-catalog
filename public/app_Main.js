const maxPerRow = 4;

//Add event to page load for formatting of rating
window.addEventListener('load', function () {
    $.getJSON('/getMovies')//Get existing movies from server
        .done(function (data) {//if successful
            for (let i = 0; i < data.movies.length; i++) {//Iterate through the json received and add to the table in the page
                addToTable(newMovieElements(data.movies[i].rating, data.movies[i].title, newMovieCount()), rowCount(), maxPerRow); //Add data to the table
            }
            formatRating();//Format the ratings
        }).fail(function () {//if failed
            console.log('Error loading saved movies! See server log for more info');//log error
        });
    // formatRating();//Format the ratings
    addGeoLocation();
}, false);

function formatRating() {
    //log events
    console.log('formatRating running');
    var rating = document.getElementsByClassName('rating');
    for (var i = 0; i < rating.length; i++) {
        var value = parseFloat(rating[i].innerHTML);
        rating[i].innerHTML = value + '/5';
        //debug only -> console.log(rating[i]);
    };
};

//Added event listener on submit button to take form input and
//add new td and/or row to table of existing movies
$('#new-movie-submit').on('click', function (e) {
    e.preventDefault(); //Prevent form from doing POST
    sendMovies(newTitle(), newRating()); //Send new values to server
    addToTable(newMovieElements(newRating(), newTitle(), newMovieCount()), rowCount(), maxPerRow); //Add data to the table
    $('#new-movie-form')[0].reset(); //reset form
    formatRating(); //formats rating value to correct form

});

//Functions to get values from fields and metadata on the page
newTitle = () => $('#new-movie-title').val();

newRating = () => $('#new-movie-rating').val();

rowCount = () => $('.table-row').length;

newMovieCount = () => ($('.existing-movie-container').length + 1);

//Function to create new elements with new count/info
newMovieElements = function (newRating, newTitle, newCount) {
    //Declare new vars for elements
    var newMovieTd, newDiv, newH3, newImg, newTitleText, newRatingText;//newUl, //newLiTitle, newLiRating;
    //Fill vars with new elements with attributes

    //Trying to add cards w/ bootstrap with generic image

    // newLiRating = $('<li>').addClass('rating').attr('id', 'movie' + newCount + '-rating').text(newRating); //New li
    // newLiTitle = $('<li>').attr('id', 'movie' + newCount + '-title').text(newTitle); //New li
    // newUl = $('<ul>').attr('id', 'movie' + newCount + '-list').append(newLiTitle, newLiRating); //new ul and added li x2
    newTitleText = $('<h5>').addClass('card-text').attr('id','movie'+newCount+'-title-text').append('Title: '+newTitle);
    newRatingText = $('<h5>').addClass('card-text').attr('id', 'movie'+newCount+'-rating-text').append('Rating: '+newRating);
    newH3 = $('<h3>').addClass('card-title').attr('id', 'movie' + newCount + '-label').text('Movie ' + newCount); //New h3 label
    newImg = $('<img>').addClass('card-img-top').attr('id', 'movie'+newCount+'-card-img').attr('src', 'http://localhost:3010/img/cherry.jpg'). attr('alt', 'Card image cap');
    newDiv = $('<div>').addClass('existing-movie-container card').attr('id', 'existing-movie' + newCount).append(newImg, newH3, newTitleText, newRatingText); //New div for title and ul
    newMovieTd = $('<td>').addClass('m-0 p-0').attr('id', 'movie' + newCount + '-td').append(newDiv); //New td for all new movie tags

    return newMovieTd;
};

//Function to check table for items per row and add new row/td
addToTable = function (newMovieTd, rowCount, maxPerRow) {
    //Check if existing row has >4 entries before adding or making new row
    var latestRowCount = $('#em-row' + rowCount).children('td').length;

    console.log(latestRowCount);

    const numLatestRowCount = parseFloat(latestRowCount); //make rowcount into a number type

    if (numLatestRowCount < maxPerRow) { //add to current row
        $('#em-row' + rowCount).append(newMovieTd); //add all new to current row
    } else { //create new row and add all elements here
        const rowNum = rowCount + 1; //Number of next row
        const newRow = $('<tr>').addClass('table-row').attr('id', 'em-row' + rowNum).append(newMovieTd); //Create new row and add td to it
        $('#existing-movies-tbody').append(newRow); //Add new row and all new elements to table

    }
};

//AJAX to post new data
function sendMovies(newTitle, newRating) {
    // console.log('sendMovies called');
    // console.log(data);
    var data = JSON.stringify({ title: newTitle, rating: parseFloat(newRating) });//stringify POST body json payload
    //POST request using jQuery .ajax
    $.ajax({
        type: 'POST',
        url: '/sendMovies',
        data: data,
        dataType: 'json',
        contentType: "application/json",
        timeout: 2000,
        beforeSend: function () {
            console.log('sendMovies called');
            // var data = "{\"title\":\"" + newTitle + "\",\"rating\":" + newRating + "}"; //Add form data to json string
            //var obj = JSON.parse(data);//JSON string turned into JSON object
            console.log(data);
        },
        success: function (res) {
            console.log('Successfully Posted!');
            console.log(res);
        },
        fail: function () {
            console.log('Failed to Post');
            console.log(res);
        }
    });
};

function addGeoLocation() {
    var newDiv, newDivTitle, latTitle, longTitle, lat, long;//Declare new variables
    newDiv = $('<div>').addClass('geolocation-div').attr('id', 'geolocation-div');//create new divs with attr

    if (Modernizr.geolocation) {//if browser supports geolocation
        navigator.geolocation.getCurrentPosition(function (position) { //get current position success funct and fail funct
            var crd = position.coords;//Get coords
            lat = crd.latitude;//get latitude
            long = crd.longitude;//get longitude
            latTitle = $('<h3>').attr('id', 'latTitle').append('Latitude: '+lat);//create latitude html
            longTitle = $('<h3>').attr('id', 'longTitle').append('Longitude: '+long);//create longitude html
            newDivTitle = $('<h2>').attr('id', 'geolocation-title').append('Geolocation');//create title
            newDiv.append(newDivTitle, latTitle, longTitle);//Append lat long and title to div
            $('#page-content').append(newDiv);//add new div to the page

        }, function () {//Fail function
            console.log('User does not want to share location');//log error
        });
    } else {
        console.log('Browser does not support Geolocation');//Browser does not support
    }
};