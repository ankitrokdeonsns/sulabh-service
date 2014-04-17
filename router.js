var journey = require('journey');
var router = new(journey.Router);
var geoSpatialRepository = require('./geoSpatialRepository.js').geoSpatialRepository;

router.get('/locations').bind(function (req, res, params) {
    var latitude = params.latitude;
    var longitude = params.longitude;
    var callBack = function (error, data){
        var response = {};
        response["locations"] = data;
        console.log("sending response.." + data);
        res.send(response);
    };
    geoSpatialRepository.find(latitude, longitude, 2, callBack);
});

router.get('/add').bind(function (req, res, params) {
    var data = {
        "name": params.name,
        "rating": params.rating,
        "coordinates":[params.latitude, params.longitude],
        "operational":params.operational,
        "hygienic":params.hygienic,
        "free":params.free,
        "type":params.kind,
        "suitableFor":[params.suitableFor]
    }
    geoSpatialRepository.save(data);
    console.log("inserted data.."+ JSON.stringify(data));
    res.send("Added Successfully!!");
});

require('http').createServer(function (request, response) {
    var body = "";
    request.addListener('data', function (chunk) { body += chunk });
    request.addListener('end', function () {
        
        router.handle(request, body, function (result) {
            response.writeHead(result.status, result.headers);
            response.end(result.body);
        });
    });
}).listen(3000);