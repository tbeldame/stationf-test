var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

app.use(bodyParser.json());

//Routes files
//Api
var getRooms = require('./routes/getrooms.js');
//var addReservation = require('./routes/addReservation.js');
//var deleteReservation = require('./routes/getrooms.js');

//Pages


//Routes
//Api
app.get('/api/rooms', getRooms);
//app.get('/api/reservation', getReservation);
//app.post('/api/reservation', addReservation);
//app.delete('/api/reservation', deleteReservation);

//Pages
app.get('/', function(req, res) {
	res.send('Hello');
});


app.listen(3001);
console.log('Started');
