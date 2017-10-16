const mongoose = require('mongoose');
const Reservation = require(__dirname + '/../models/reservations.js');

module.exports = function (req, res) {
	//check the values (types)

	console.log('getreservations');
	console.log(req.query);

	Reservation.find(function(err, reservations) {
		res.json({reservations: reservations});
	});
};
