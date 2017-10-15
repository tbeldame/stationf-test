const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../private/rooms.json');
const rooms = JSON.parse(fs.readFileSync(filePath, 'utf8')).rooms;

function equipmentInRoom(roomEquipments, equipment) {
	console.log(roomEquipments);
	for (var i = 0; i < roomEquipments.length; i++) {
		if (roomEquipments[i].name === equipment)
			return (true);
	}
	return (false);
};

function roomMatch(room, filters) {
	if (filters.capacity > room.capacity)
		return (false);
	if (filters.projector && !equipmentInRoom(room.equipements, 'Retro Projecteur'))
		return (false);
	if (filters.tv && !equipmentInRoom(room.equipements, 'TV'))
		return (false);
	return (true);
};

module.exports = function (req, res) {
	//check the values (types)
	var filteredRooms = [];

	console.log('getrooms');
	console.log(rooms.length);
	console.log(req.query);

	for (var i = 0; i < rooms.length; i++) {
		if (roomMatch(rooms[i], req.query))
			filteredRooms.push(rooms[i]);
	}
	console.log(filteredRooms);
	res.json({rooms: filteredRooms});
};
