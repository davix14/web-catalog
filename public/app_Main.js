//Take input from form and add to "Existing List"
function addListItem(){
	var list;
	list = document.getElementById('movie1-rating');
	list.className = 'good';

}

var link;
link = document.getElementById('movie1-rating');
link.addEventListener('click', addListItem, false);