var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

//Routes files
var getRooms = require('./routes/getrooms.js');
//var addReservation = require('./routes/addReservation.js');
//var deleteReservation = require('./routes/getrooms.js');

//Routes
app.get('/api/rooms', getRooms);
//app.get('/api/reservation', getReservation);
//app.post('/api/reservation', addReservation);
//app.delete('/api/reservation', deleteReservation);

app.use(function(req, res) {
	console.log('what');
	res.sendFile(__dirname + '/public/index.html')
});


app.listen(3001);
console.log('Started');
