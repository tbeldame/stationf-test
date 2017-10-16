const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../private/rooms.json');
const rooms = JSON.parse(fs.readFileSync(filePath, 'utf8')).rooms;
const mongoose = require('mongoose');
const Reservation = require(__dirname + '/../models/reservations.js');

function equipmentInRoom(roomEquipments, equipment) {
	for (var i = 0; i < roomEquipments.length; i++) {
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
	var resDate = new Date(filters.date);
	var hour = parseInt(filters.time)
	//manage the error in some way
	if (hour < 0 || hour > 23)
		return (false)
	resDate.setUTCHours(hour);
	return (resDate);
}

function checkAvailability(res, rooms, date, index) {
	if (index == rooms.length)
		return (res.json({rooms: rooms}));
	Reservation.find({roomName: rooms[index].name, date: date}, function (err, result) {
		//manage error here 500?
		
		if (err) console.error(err);
		
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
	//check the values (types)
	var filteredRooms = [];
	var resDate ;

	for (var i = 0; i < rooms.length; i++) {
		if (roomMatch(rooms[i], req.query))
			filteredRooms.push(rooms[i]);
	}
	resDate = formatDate(req.query);
	//check Date is not false
	if (filteredRooms.length == 0)
		return (res.json({rooms: filteredRooms}));
	else
		checkAvailability(res, filteredRooms, resDate, 0);
};
