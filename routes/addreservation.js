//const fs = require('fs');
//const path = require('path');
const mongoose = require('mongoose');
const Reservation = require(__dirname + '/../models/reservations.js');

module.exports = function (req, res) {
	//check the values (types)
	

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
