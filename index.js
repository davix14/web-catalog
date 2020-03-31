var express = require("express");//requre express
var app = express();//instantiate express
// var bodyParser = require("body-parser");
var fs = require('fs');

//Enter server logic here
app.use(express.json());
app.use(express.static("public"));

//Added logic to respond to GET request with JSON info
let rawdata = fs.readFileSync('public/movies.json');
let movies = JSON.parse(rawdata);

app.get('/getMovies', function (req, res) {
	console.log('Request received!');
	res.json(movies);
});

//function to handle post request
app.post('/sendMovies', function (req, res) {
	console.log('post received');
	// var obj = JSON.parse(req.body);
	var title = req.body.title;
	var rating = req.body.rating;
	console.log("Movie received:" + title + " Rating received:" + rating);
	// res.sendStatus(200);
	res.set('Content-Type', 'application/JSON');
	res.send(JSON.stringify({ saved: true }));

});

//Start web server on port 3010
app.listen(3010);
console.log('Server running and listening');