//Take input from form and add to "Existing List"
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
	console.log('Page loaded! formatRating running');
	var rating = document.getElementsByClassName('rating');
	for (var i = 0; i < rating.length; i++) {
		var value = parseFloat(rating[i].innerHTML);
		rating[i].innerHTML = value + "/5";
		//debug only -> console.log(rating[i]);
	}
}

//Add new list if the user clicks submit
var submitBtn = document.getElementById('new-movie-submit');

submitBtn.addEventListener('click', function(e){
	e.preventDefault(); //prevent default action (aka submitting form)
	//get values of form
	var newTitle = document.getElementById('new-movie-title');
	var newRaing = document.getElementById('new-movie-rating');

	console.log(newTitle.value);
	console.log(newRaing.value);

	

}, false);