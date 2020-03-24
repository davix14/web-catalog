//Take list of hotels and add to a visible list
function addListItem(){
	var list;
	list = document.getElementById('movie1-rating');
	list.className = 'good';

}

var link;
link = document.getElementById('movie1-rating');
link.addEventListener('click', addListItem, false);