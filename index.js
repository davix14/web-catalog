var express = require("express"); //requre express
var app = express(); //instantiate express
// var bodyParser = require("body-parser");
var fs = require('fs');

//Enter server logic here
app.use(express.static("public"), express.json());

app.get('/getMovies', function(req, res) {
    console.log('Request received!');
    //Added logic to respond to GET request to get latest JSON file info
    let rawdata = fs.readFileSync('public/movies.json');
    let movies = JSON.parse(rawdata);
    console.log('File read and parsed');
    res.json(movies);
    console.log('Response Sent');
});

//function to handle post request
app.post('/sendMovies', function(req, res) {
    console.log('post received');
    // var obj = JSON.parse(req.body);
    var title = req.body.title;
    var rating = req.body.rating;
    console.log("Movie received:" + title + " Rating received:" + rating);
    // res.sendStatus(200);
    res.set('Content-Type', 'application/JSON');
    res.status(200).send(JSON.stringify({ saved: true }));

});

//Start web server on port 3010
app.listen(3010);
console.log('Server running and listening');