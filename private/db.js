const mongoose = require('mongoose');
const reservationModel = require(__dirname + '/../models/reservations.js');

module.exports = function () {
	mongoose.Promise = global.Promise;
	mongoose.connect('mongodb://localhost/stationf', {useMongoClient: true});

	mongoose.connection.on('error', function(err) {
		console.error(err);
	});

	process.on('SIGINT', function() {
		mongoose.connection.close(function () {
			console.log('Mongoose connection close');
			process.exit(0);
		});
	});
};
