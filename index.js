var express = require("express");//requre express
var app = express ();//instantiate express

//Enter server logic here
app.use(express.static("public"));

//Start web server on port 3010
app.listen(3010);
