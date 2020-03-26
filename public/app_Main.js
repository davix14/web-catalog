//Take input from form and add to 'Existing List'
function changeColor() {
	var list;
	list = document.getElementById('movie1-rating');
	list.className = 'good';

}

var link;
link = document.getElementById('movie1-rating');
link.addEventListener('click', changeColor, false);

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
}

//Add new list if the user clicks submit button
// var submitBtn = document.getElementById('new-movie-submit');

// submitBtn.addEventListener('click', function (e) {
// 	e.preventDefault(); //prevent default action (aka submitting form)
// 	//get values of form
// 	var newTitle = document.getElementById('new-movie-title');
// 	var newRating = document.getElementById('new-movie-rating');

// 	// console.log(newTitle.value);
// 	// console.log(newRating.value);

// 	//create new elements with id's and text content
// 	var newTd = document.createElement('td');
// 	newTd.setAttribute('id', 'movie2-td');

// 	var newDiv = document.createElement('div');
// 	newDiv.setAttribute('id', 'existing-movie2');
// 	newDiv.setAttribute('class', 'existing-movie-container');

// 	var newUl = document.createElement('ul');
// 	newUl.setAttribute('id', 'movie2-list');

// 	var newLiTitle = document.createElement('li');
// 	newLiTitle.setAttribute('id', 'movie2-title');
// 	var newTitleText = document.createTextNode(newTitle.value);
// 	newLiTitle.appendChild(newTitleText);

// 	var newLiRating = document.createElement('li');
// 	newLiRating.setAttribute('id', 'movie2-rating');
// 	newLiRating.setAttribute('class', 'rating');
// 	var newRatingText = document.createTextNode(newRating.value);
// 	newLiRating.appendChild(newRatingText);

// 	var newH3 = document.createElement('h3');
// 	newH3.setAttribute('id', 'movie2-label');
// 	var newH3Text = document.createTextNode('Movie 2');
// 	newH3.appendChild(newH3Text);

// 	//NAppend li --> ul
// 	newUl.appendChild(newLiTitle);
// 	newUl.appendChild(newLiRating);
// 	//Append h3 and ul --> newDiv
// 	newDiv.appendChild(newH3);
// 	newDiv.appendChild(newUl);
// 	newTd.appendChild(newDiv);

// 	//console.log(newTd);

// 	//Add new div after existing-movie1
// 	var existingMovies = document.getElementById('em-row1');
// 	existingMovies.insertBefore(newTd, existingMovies.lastChild);

// 	//Reset form back to blank
// 	document.getElementById('new-movie-form').reset();

// 	//format rating
// 	formatRating();

// 	var movies = document.getElementsByClassName('existing-movie-container');
// 	console.log('No of Movies: ' + movies.length);

// }, false);

//Add eventListener to submit button
//Prevent default
//Get form values
//Create elements with id's
//Nest elements
//Insert into document
//Clear form
//Format rating
//ALLOW MAX OF 4 td's per row

//Added event listener on submit button
$('#new-movie-submit').on('click', function(e){
	e.preventDefault();//Prevents submit

	//Get values from form and count of existing movies for row logic
	var newTitle = $('#new-movie-title').val();
	var newRating = $('#new-movie-rating').val();
	var existingMovieCount = $('.existing-movie-container').length;
	var newCount = existingMovieCount + 1; // No of current movie entry
	var rowCount = $('.table-row').length;

	//For debugging
	console.log(newTitle);
	console.log(newRating);
	console.log(existingMovieCount);
	console.log(rowCount);

	//Reset all form elements
	$('#new-movie-form')[0].reset();

	//Create new elements with id's/classes
	var newMovieTd = $('<td>').attr('id', 'movie'+newCount+'-td');
	var newDiv, newH3, newUl, newLiTitle, newLiRating;
	newLiRating = $('<li>').attr('id', 'movie'+newCount+'-rating').text(newRating);
	newLiTitle = $('<li>').attr('id', 'movie'+newCount+'-title').text(newTitle);
	newUl = $('<ul>').attr('id', 'movie'+newCount+'-list').append(newLiTitle, newLiRating);
	newH3 = $('<h3>').attr('id', 'movie'+newCount+'-label').text('Movie '+newCount);
	newDiv = $('<div>').addClass('existing-movie-container').attr('id', 'existing-movie'+newCount).append(newH3, newUl);
	newMovieTd.append(newDiv);

	//Check if there are 3 or less items in this row
	//if == 4 row is full! Create new row
	//if row count.
	var latestRowCount = $('#em-row'+rowCount).children;

	console.log(latestRowCount);

	if(/* latestRowCount.length */0 <= 3){//add to current row
		$('#em-row'+rowCount).append(newMovieTd);
	}else{//create new row and add all elements here
		var rowNum = rowCount + 1;
		var newRow = $('<tr>').addClass('table-row').attr('id', 'em-row'+rowNum);
		newRow.append(newMovieTd);

	}

	formatRating();
});

//Create