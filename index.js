var express = require("express"); //requre express
var app = express(); //instantiate express
// var bodyParser = require("body-parser");
var fs = require('fs');

//Enter server logic here
app.use(express.static("public"), express.json());

app.get('/getMovies', function (req, res) {
    console.log('Request received!');
    //Added logic to respond to GET request to get latest JSON file info
    let rawdata = fs.readFileSync('public/movies.json');
    let movies = JSON.parse(rawdata);
    console.log('File read and parsed');
    res.json(movies);
    console.log('Response Sent');
});

//Writing post for new movies to be added is appended
app.post('/sendMovies', function (req, res) {//if post received
    console.log('post received');//Log receipt to console
    console.log(req.body);
    try {

        // let data = JSON.parse(req);
        //Get new title and rating
        var title = req.body.title;
        var rating = req.body.rating;

        //Log new values
        console.log("Movie received:" + title + " Rating received:" + rating);

        //Append new entries to json file
        let rawdata = fs.readFileSync('public/movies.json');//get json from file
        let movies = JSON.parse(rawdata);//parse to json
        console.log('File read and parsed');//log completion

        let newVals = { "title": title, "rating": rating };
        // movies.movies.push('\"title\": \"' + title +'\",\"rating\": ' + rating);
        movies.movies.push(newVals);
        console.log('Pushed new vals to existing json object');

        fs.writeFile("public/movies.json", JSON.stringify(movies), (error) => {if (error) throw err;});
        console.log('File overwritten');

        //Respond with set type, status, and json
        res.set('Content-Type', 'application/JSON');
        res.status(200).send(JSON.stringify({ saved: true }));
        console.log('Post response successful!');

    }
    catch (err) {
        console.log('Error saving movies');
        console.log(err);
        //Respond with set type, status, and json
        res.set('Content-Type', 'application/JSON');
        res.status(500).send(JSON.stringify({ saved: false }));
    }


});

//Start web server on port 3010
app.listen(3010);
console.log('Server running and listening');