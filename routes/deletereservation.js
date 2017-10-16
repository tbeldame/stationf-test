const mongoose = require('mongoose');
const Reservation = require(__dirname + '/../models/reservations.js');

module.exports = function (req, res) {
	//check the values (types)

	Reservation.findOneAndRemove({_id: req.params.id}, function (err, result) {
		if (err) {
			res.status(500);
			res.json({error: "Internal Server Error", message: "Something went wrong"});
		}
		if (!result) {
			res.status(400);
			res.json({error: "Bad Request", message: "This reservation does not exist"});
		}
		res.json({message: 'done'});
	});
};
