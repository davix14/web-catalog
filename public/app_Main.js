//Take list of hotels and add to a visible list
function addListItem(){
	var list;
	list = document.getElementById('Extg_li2');
	list.className = 'good';

}

var link;
link = document.getElementById('Extg_li2');
link.addEventListener('click', addListItem, false);