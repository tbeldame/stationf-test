const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../private/rooms.json');
const rooms = JSON.parse(fs.readFileSync(filePath, 'utf8')).rooms;

const mongoose = require('mongoose');
const Reservation = require(__dirname + '/../models/reservations.js');

module.exports = function (req, res) {
	//check the values (types)
	//check date is later than now
	//check hour is number 0-24
	//check room exists

	console.log('addreservation');
	console.log(req.body);


	var reservation = new Reservation({
		userId: req.body.userId,
		roomName: req.body.roomName,
		date: Date.now()
	});

	reservation.save(function (err) {
		if (err) console.error(err);
		console.log('reservation added');
	});

	res.json({status: 'ok'});
};
