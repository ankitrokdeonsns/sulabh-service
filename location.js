var location = {};
var repository = require("./geoSpatialRepository.js").geoSpatialRepository;

location.search = function(latitude, longitude, radius){
	return repository.find(latitude, longitude, radius)
}

exports.location = location;