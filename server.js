var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));

//Routes files
var getRooms = require('./routes/getrooms.js');
//var addReservation = require('./routes/addReservation.js');
//var deleteReservation = require('./routes/getrooms.js');

//Routes
app.get('/api/rooms', getRooms);
app.get('/api/rooms2', function(req, res) {
	console.log('getRooms2');
var rooms = {
		"rooms": [
			{
				"name": "Salle #1",
				"description": "Salle #1",
				"capacity": 5,
				"equipements": [
					{
						"name": "TV"
					},
					{
						"name": "Retro Projecteur"
					}
				],
				"createdAt": "2016-12-07T12:39:29.812Z",
				"updatedAt": "2016-12-08T17:31:39.489Z"
			},
			{
				"name": "Salle #2",
				"description": "Salle #2",
				"capacity": 10,
				"equipements": [
					{
						"name": "Retro Projecteur"
					}
				],
				"createdAt": "2016-12-07T12:39:55.384Z",
				"updatedAt": "2016-12-07T13:33:37.184Z"
			},
			{
				"name": "Salle nulle",
				"description": "Salle nulle",
				"capacity": 26,
				"equipements": [
					{
						"name": "TV"
					},
					{
						"name": "Retro Projecteur"
					}
				],
				"createdAt": "2016-12-09T16:45:49.096Z",
				"updatedAt": "2016-12-09T16:45:49.096Z"
			},
			{
				"name": "Salle propre",
				"description": "Salle propre",
				"capacity": 42,
				"equipements": [
					{
						"name": "Retro Projecteur"
					}
				],
				"createdAt": "2016-12-09T16:45:49.096Z",
				"updatedAt": "2016-12-09T16:45:49.096Z"
			}
		]
	};
	res.json(rooms);
});
//app.get('/api/reservation', getReservation);
//app.post('/api/reservation', addReservation);
//app.delete('/api/reservation', deleteReservation);

app.get('*', function(req, res) {
	res.sendFile(__dirname + '/public/index.html')
});


app.listen(3001);
console.log('Started');
