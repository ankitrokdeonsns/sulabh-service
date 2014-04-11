var geoSpatialRepository = {};
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sulabh');

var Schema = mongoose.Schema;

var LocationSchema = new Schema({
    name: String,
    coordinates: [Number, Number]
}, { versionKey: false });

var LocationModel = mongoose.model('locations', LocationSchema);

geoSpatialRepository.findAll = function(callBack) {
    LocationModel.find({}).exec(callBack);
}

geoSpatialRepository.find = function(latitude, longitude, radius, callBack) {
    var miles = radius * 0.62137;
    LocationModel.find({
        coordinates:{
            $geoWithin:{
                $centerSphere:
                    [[latitude,longitude], miles/3959]}}}).exec(callBack);
}

geoSpatialRepository.save = function (data) {
    var location = new LocationModel(data);
    location.save(function (error, data) {});
}

geoSpatialRepository.remove = function(){
    LocationModel.remove({},function(){});
}

exports.geoSpatialRepository = geoSpatialRepository;