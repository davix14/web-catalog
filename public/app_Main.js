const maxPerRow = 4;

//Practice making json objects
// var data = "{\"movie\":"+newTitle()+",\"rating\":"+newRating+"()}";
// var obj = JSON.parse(data);
// console.log(obj);

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
    var newMovieTd, newDiv, newH3, newUl, newLiTitle, newLiRating;
    //Fill vars with new elements with attributes
    newLiRating = $('<li>').addClass('rating').attr('id', 'movie' + newCount + '-rating').text(newRating); //New li
    newLiTitle = $('<li>').attr('id', 'movie' + newCount + '-title').text(newTitle); //New li
    newUl = $('<ul>').attr('id', 'movie' + newCount + '-list').append(newLiTitle, newLiRating); //new ul and added li x2
    newH3 = $('<h3>').attr('id', 'movie' + newCount + '-label').text('Movie ' + newCount); //New h3 label
    newDiv = $('<div>').addClass('existing-movie-container').attr('id', 'existing-movie' + newCount).append(newH3, newUl); //New div for title and ul
    newMovieTd = $('<td>').attr('id', 'movie' + newCount + '-td').append(newDiv); //New td for all new movie tags

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
    // var data = "{\"title\":\"" + newTitle + "\",\"rating\":" + newRating + "}"; //Add form data to json string
    // //var obj = JSON.parse(data);//JSON string turned into JSON object
    // console.log(data);
    // var data = JSON.stringify("{\"title\":\"" + newTitle + "\",\"rating\":" + newRating + "}"); //Add form data to json string
    var data = JSON.stringify({title: newTitle, rating: parseFloat(newRating)});
    //Redoing using jQuery .ajax
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

    //Redoing the post request w/ jQuery FAILED Empty POST body
    // $.post('/sendMovies', data, null, 'json')
    // .done(function(res){
    //     console.log('Successfully Posted!');
    //     console.log(res);

    // }).fail(function(res){
    //     console.log('Failed to Post');
    //     console.log(res);
    // });

    // var xtp = new XMLHttpRequest();
    // xtp.open('POST', '/sendMovies', true);
    // xtp.setRequestHeader('Content-Type', 'application/json');
    // xtp.load = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log('SUCCESS!!');
    //     };
    // };
    // xtp.send(data);
}