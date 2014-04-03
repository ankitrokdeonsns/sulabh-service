var geoSpatialRepository = {};
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/repository');

var Schema = mongoose.Schema;

var LocationSchema = new Schema({
    type: String,
    coordinates: [Number,Number]
});

var Location = mongoose.model('repository', LocationSchema);

var db = mongoose.connection;


//geoSpatialRepository.find = function(){
//    var query = Location.find({}, function(error, data){});
//
//    return query.exec(function(err, data){
//        console.log("DATA ************************** ");
//        console.log (JSON.stringify(data));
//        gdata = data;
//
//        if(gdata!= null )
//            throw
//        //return data;
//    });
//}

var gdata = {data:{}};
var query = Location.find({}, function(error, data){});
query.exec(function(err, data){
  console.log("DATA ************************** ");
        gdata.data = data;
});
geoSpatialRepository.find = function(){
    return gdata.data;
}

geoSpatialRepository.save = function(data){
    var location = new Location(data);
    location.save(function(error,data){});
}

exports.geoSpatialRepository = geoSpatialRepository;