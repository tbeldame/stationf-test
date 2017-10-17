const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../private/rooms.json');
const rooms = JSON.parse(fs.readFileSync(filePath, 'utf8')).rooms;
const moment = require('moment');
const mongoose = require('mongoose');
const Reservation = require(__dirname + '/../models/reservations.js');

function equipmentInRoom(roomEquipments, equipment) {
	for (let i = 0; i < roomEquipments.length; i++) {
		if (roomEquipments[i].name === equipment)
			return (true);
	}
	return (false);
};

function roomMatch(room, filters) {
	if (filters.capacity > room.capacity)
		return (false);
	if (filters.projector === 'true' && !equipmentInRoom(room.equipements, 'Retro Projecteur'))
		return (false);
	if (filters.tv === 'true' && !equipmentInRoom(room.equipements, 'TV'))
		return (false);
	return (true);
};

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

function checkAvailability(res, rooms, date, index) {
	if (index == rooms.length)
		return (res.json({rooms: rooms}));
	Reservation.find({roomName: rooms[index].name, date: date}, function (err, result) {
		if (err) {
			res.status(500);
			res.json({error: "Internal Server Error", message: "Something went wrong"});
		}
		if (result.length > 0) {
			rooms.splice(index, 1);
			checkAvailability(res, rooms, date, index);
		}
		else
			checkAvailability(res, rooms, date, index + 1);
	});
	return ;
}

module.exports = function (req, res) {
	let filteredRooms = [];
	let resDate, capacity;

	//Fields checking
	resDate = formatDate(req.query);
	if (!resDate) {
		res.status(400);
		res.json({error: "Bad Request", message: "Search date is invalid"});
	}
	capacity = parseInt(req.query.capacity);
	if (capacity > 30 || capacity < 1) {
		res.status(400);
		res.json({error: "Bad Request", message: "Search date is invalid"});
	}

	//Getting rooms
	for (let i = 0; i < rooms.length; i++) {
		if (roomMatch(rooms[i], req.query))
			filteredRooms.push(rooms[i]);
	}
	if (filteredRooms.length == 0)
		return (res.json({rooms: filteredRooms}));
	else
		checkAvailability(res, filteredRooms, resDate, 0);
};
