const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require(__dirname + '/private/db.js')();

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));

//Mongoose models


//Routes files
const getRooms = require('./routes/getrooms.js');
const getReservation = require('./routes/getreservations.js');
const addReservation = require('./routes/addreservation.js');
const deleteReservation = require('./routes/deletereservation.js');

//Routes
app.get('/api/rooms', getRooms);
app.get('/api/reservation', getReservation);
app.post('/api/reservation', addReservation);
app.delete('/api/reservation', deleteReservation);

app.get('*', function(req, res) {
	res.sendFile(__dirname + '/public/index.html')
});


app.listen(3001);
console.log('Started');
