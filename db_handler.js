var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/locations');

var Schema = mongoose.Schema;

var LocationSchema = new Schema({
    name: String
}, { versionKey: false });

var database = mongoose.model('points', LocationSchema);

exports.database = database;