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
var submitBtn = document.getElementById('new-movie-submit');

submitBtn.addEventListener('click', function (e) {
	e.preventDefault(); //prevent default action (aka submitting form)
	//get values of form
	var newTitle = document.getElementById('new-movie-title');
	var newRating = document.getElementById('new-movie-rating');

	// console.log(newTitle.value);
	// console.log(newRating.value);

	//create new elements with id's and text content
	var newTd = document.createElement('td');
	newTd.setAttribute('id', 'movie2-td');

	var newDiv = document.createElement('div');
	newDiv.setAttribute('id', 'existing-movie2');
	newDiv.setAttribute('class', 'existing-movie-container');

	var newUl = document.createElement('ul');
	newUl.setAttribute('id', 'movie2-list');

	var newLiTitle = document.createElement('li');
	newLiTitle.setAttribute('id', 'movie2-title');
	var newTitleText = document.createTextNode(newTitle.value);
	newLiTitle.appendChild(newTitleText);

	var newLiRating = document.createElement('li');
	newLiRating.setAttribute('id', 'movie2-rating');
	newLiRating.setAttribute('class', 'rating');
	var newRatingText = document.createTextNode(newRating.value);
	newLiRating.appendChild(newRatingText);

	var newH3 = document.createElement('h3');
	newH3.setAttribute('id', 'movie2-label');
	var newH3Text = document.createTextNode('Movie 2');
	newH3.appendChild(newH3Text);

	//NAppend li --> ul
	newUl.appendChild(newLiTitle);
	newUl.appendChild(newLiRating);
	//Append h3 and ul --> newDiv
	newDiv.appendChild(newH3);
	newDiv.appendChild(newUl);
	newTd.appendChild(newDiv);

	//console.log(newTd);

	//Add new div after existing-movie1
	var existingMovies = document.getElementById('em-row1');
	existingMovies.insertBefore(newTd, existingMovies.lastChild);

	//Reset form back to blank
	document.getElementById('new-movie-form').reset();

	//format rating
	formatRating();

	var movies = document.getElementsByClassName('existing-movie-container');
	console.log('No of Movies: ' + movies.length);

}, false);

//Add eventListener to submit button
//Prevent default
//Get form values
//Create elements with id's
//Nest elements
//Insert into document
//Clear form
//Format rating
//ALLOW MAX OF 4 td's per row

