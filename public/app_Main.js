//Add event to page load for formatting of rating
window.addEventListener('load', formatRating, false);

function formatRating() {
	//log events
	//console.log('Page loaded! formatRating running');
	var rating = document.getElementsByClassName('rating');
	for (var i = 0; i < rating.length; i++) {
		var value = parseFloat(rating[i].innerHTML);
		rating[i].innerHTML = value + '/5';
		//debug only -> console.log(rating[i]);
	}
	// xhr.open('GET', '/load', true);
	// xhr.send(null);
}

//Added event listener on submit button to take form input and
//add new td and/or row to table of existing movies
$('#new-movie-submit').on('click', function(e){
	e.preventDefault();//Prevents submit

	//Get values from form and count of existing movies for row logic
	var newTitle = $('#new-movie-title').val();
	var newRating = $('#new-movie-rating').val();
	var existingMovieCount = $('.existing-movie-container').length;
	var newCount = existingMovieCount + 1; // No of current movie entry
	var rowCount = $('.table-row').length;

	//For debugging
	// console.log(newTitle);
	// console.log(newRating);
	// console.log(existingMovieCount);
	// console.log(rowCount);

	//Reset all form elements
	$('#new-movie-form')[0].reset();

	//Create new elements with id's/classes
	var newMovieTd = $('<td>').attr('id', 'movie'+newCount+'-td');
	var newDiv, newH3, newUl, newLiTitle, newLiRating;
	newLiRating = $('<li>').addClass('rating').attr('id', 'movie'+newCount+'-rating').text(newRating);
	newLiTitle = $('<li>').attr('id', 'movie'+newCount+'-title').text(newTitle);
	newUl = $('<ul>').attr('id', 'movie'+newCount+'-list').append(newLiTitle, newLiRating);
	newH3 = $('<h3>').attr('id', 'movie'+newCount+'-label').text('Movie '+newCount);
	newDiv = $('<div>').addClass('existing-movie-container').attr('id', 'existing-movie'+newCount).append(newH3, newUl);
	newMovieTd.append(newDiv);

	//Check if there are 3 or less items in this row
	//if == 4 row is full! Create new row
	//if row count.
	var latestRowCount = $('#em-row'+rowCount).children('td').length;

	console.log(latestRowCount);

	var numLatestRowCount = parseFloat(latestRowCount);

	if(numLatestRowCount <= 3){//add to current row
		$('#em-row'+rowCount).append(newMovieTd);
	}else{//create new row and add all elements here
		var rowNum = rowCount + 1;
		var newRow = $('<tr>').addClass('table-row').attr('id', 'em-row'+rowNum);
		newRow.append(newMovieTd);
		$('#existing-movies-tbody').append(newRow);

	}

	formatRating();
});

//Ajax practice to get data from JSON file
var xhr = new XMLHttpRequest();

xhr.onload = function() {
	if (xhr.status === 200) {
		responseObject = JSON.parse(xhr.response);
		console.log(responseObject);
	}
}

xhr.open('GET', '/load', true);
xhr.send(null);
