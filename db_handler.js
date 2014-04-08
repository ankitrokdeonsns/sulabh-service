var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sulabh');

var Schema = mongoose.Schema;

var LocationSchema = new Schema({
    name: String,
    coordinates: [Number, Number]
}, { versionKey: false, _id: false });

var database = mongoose.model('locations', LocationSchema);

exports.database = database;