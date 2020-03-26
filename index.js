var express = require("express");//requre express
var app = express ();//instantiate express
var bodyParser = require("body-parser");

//Enter server logic here
app.use(express.static("public"));

//Add logic to parse form input url encoded
//app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res){
	
	res.sendFile('catalog.html');

});

//function to handle post request
// app.post("/catalog.html", function(req, res){
// 	var title = req.body.movie_Title;
// 	var rating = req.body.Rating;
// 	res.send("<h1>Title: " + title + " Rating: " + rating + "</h1>");
// });

//Start web server on port 3010
app.listen(3010);
console.log('Server running and listening');