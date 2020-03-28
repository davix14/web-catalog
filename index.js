var express = require("express");//requre express
var app = express();//instantiate express
var bodyParser = require("body-parser");
var fs = require('fs');
//Enter server logic here
app.use(express.static("public"));

//Add logic to parse form input url encoded

let rawdata = fs.readFileSync('public/movies.json');
let movies = JSON.parse(rawdata);

app.get('/load', function (req, res) {
	console.log('Request received!');
	res.json(movies);
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