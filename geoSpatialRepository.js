var geoSpatialRepository = {};
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sulabh');

var Schema = mongoose.Schema;

var LocationSchema = new Schema({
    type: String,
    coordinates: [Number, Number]
}, { versionKey: false });

var Location = mongoose.model('locations', LocationSchema);

var db = mongoose.connection;

geoSpatialRepository.findAll = function(callBack) {
    Location.find({}).exec(callBack);
}

geoSpatialRepository.find = function(latitude, longitude, radius, callBack) {
    var miles = radius * 0.62137;

    Location.find({
        coordinates:{
            $geoWithin:{
                $centerSphere:
                    [[latitude,longitude], miles/3959]}}}).exec(callBack);
}

geoSpatialRepository.save = function (data) {
    var location = new Location(data);
    location.save(function (error, data) {});
}

geoSpatialRepository.remove = function(){
    Location.remove({},function(){});
}

exports.geoSpatialRepository = geoSpatialRepository;