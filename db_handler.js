var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sulabh');

var Schema = mongoose.Schema;

var LocationSchema = new Schema({
    type: String,
    coordinates: [Number, Number]
}, { versionKey: false });

var database = mongoose.model('locations', LocationSchema);

exports.database = database;