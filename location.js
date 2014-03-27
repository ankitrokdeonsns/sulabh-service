var location = {};
var repository = require("./repository.js").repository;

location.search = function(latitude, longitude, radius){
	return repository.find(latitude, longitude, radius)
}

exports.location = location;