var repository = {};
exports.repository = repository;
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/repository');
var db = mongoose.connection;
db.collection('repository').insert({type:"point",coordinates:[84,75]},function(){});
var data = db.collection('repository').find({loc:{$geoWithin:{$centerSphere:[[88,75],10/3959]}}});