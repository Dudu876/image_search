var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req,res) {
	res.sendFile(path.join(__dirname, './index.html'));	
});

app.use('/',express.static(path.join(__dirname, './')));

var port = process.env.PORT || 5000;
app.listen(port, function() {
	console.log('Listening to port ' + port)
});
