var fs = require('fs');
var path = require('path');

var filePath = path.join(__dirname, '../private/rooms.json');
var rooms = JSON.parse(fs.readFileSync(filePath, 'utf8'));

module.exports = function (req, res) {
	res.json(rooms);
};
