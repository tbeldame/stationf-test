const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../private/rooms.json');
const rooms = JSON.parse(fs.readFileSync(filePath, 'utf8')).rooms;
const mongoose = require('mongoose');
const Reservation = require(__dirname + '/../models/reservations.js');
const moment = require('moment');

function formatDate(filters) {
	let hours = parseInt(filters.time);
	if (hours < 0 || hours > 23)
		return (false);
	let resDate = moment(filters.date);
	if (!resDate.isValid())
		return (false);
	resDate.hour(parseInt(filters.time));
	if (resDate.isBefore(moment()))
		return (false);
	return (resDate);
}

function roomExists(name) {
	for (let i = 0; i < rooms.length; i++) {
		if (rooms[i].name === name)
			return (true);
	}
	return (false);
}

module.exports = function (req, res) {
	//Checking fields
	if (!roomExists(req.body.roomName)) {
		res.status(400);
		return (res.json({error: "Bad Request", message: "This room does not exist"}));
	}
	let resDate = formatDate(req.body);
	if (!resDate) {
		res.status(400);
		return (res.json({error: "Bad Request", message: "Reservation date is invalid"}));
	}
	Reservation.findOne({roomName: req.body.roomName, date: resDate}, function (err, result) {
		if (err) {
			res.status(500);
			res.json({error: "Internal Server Error", message: "Something went wrong"});
		}
		else if (result) {
			res.status(409);
			res.json({
				error: "Conflict",
				message: "A reservation already exists for this room at this date/hour"
			});
		}
		else {
			let reservation = new Reservation({
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
