//const fs = require('fs');
//const path = require('path');
const mongoose = require('mongoose');
const Reservation = require(__dirname + '/../models/reservations.js');

module.exports = function (req, res) {
	//check the values (types)
	

	console.log('addreservation');
	var reservation = new Reservation({userId: '1', roomName: 'salle', date: Date.now()});
	console.log(reservation);

	reservation.save(function (err) {
		if (err) console.error(err);
		console.log('reservation added');
	});

	res.json({status: 'ok'});
};
