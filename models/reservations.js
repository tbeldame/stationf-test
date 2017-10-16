const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var reservationsSchema = new Schema({
	roomName: String,
	date: Date
});

module.exports = mongoose.model('reservations', reservationsSchema);
