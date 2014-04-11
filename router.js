var journey = require('journey');
var router = new(journey.Router);
var geoSpatialRepository = require('./geoSpatialRepository.js').geoSpatialRepository;

router.get('/locations').bind(function (req, res) {
    var request = require('url').parse(req.url);
    var latLong = request.query.split("&");
    var latitude = latLong[0].split("=")[1];
    var longitude = latLong[1].split("=")[1];
    var callBack = function (error, data){
        res.send("locations: "+data);
    };
    geoSpatialRepository.find(latitude, longitude, 2, callBack);
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