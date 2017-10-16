const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../private/rooms.json');
const rooms = JSON.parse(fs.readFileSync(filePath, 'utf8')).rooms;

const mongoose = require('mongoose');
const Reservation = require(__dirname + '/../models/reservations.js');

function formatDate(filters) {
	console.log('date = ' + filters.date);
    var resDate = new Date(filters.date);
    var hour = parseInt(filters.time)
	console.log(resDate);
    //manage the error in some way
    if (hour < 0 || hour > 23)
        return (false)
    resDate.setUTCHours(hour);
	console.log(resDate);
    console.log('date ' + resDate);
    return (resDate);
}

function roomExists(name) {
	for (var i = 0; i < rooms.length; i++) {
		if (room.name === name)
			return (true);
	}
	return (false);
}

module.exports = function (req, res) {
	//check the values (types)
	//check date is later than now
	
	if (!roomExists(req.body.roomName)) {
		res.status(400);
		return (res.json({error: "Bad Request", message: "This room does not exist"}));
	}

	var resDate = formatDate(req.body);
	//check date is not false (in the past)
	
	reservation.findOne({roomName: req.body.roomName, date: resDate}, function (err, result) {
		if (err) {
			res.status(500);
			res.json({error: "Internal Server Error", message: "Something went wrong"});
		}
		else if (result.length > 0) {
			res.status(409);
			res.json({
				error: "Conflict",
				message: "A reservation already exists for this room at this date/hour"
			});
		}
		else {
			var reservation = new Reservation({
				roomName: req.body.roomName,
				date: resDate
			});
			reservation.save(function (err) {
				if (err) {
					res.status(500);
					res.json({error: "Internal Server Error", message: "Something went wrong"});
				}
				else
					res.json({message: 'done'});
			});
		}
	});
};
