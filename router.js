var journey = require('journey');
var router = new(journey.Router);
var locations = require("./db_handler.js").database;

router.get('/hello').bind(function (req, res) {
    locations.find({},{"_id":0, "name": 1, "coordinates":1}).exec(function(err,locations){
        res.send({"locations":locations});
    })
});

require('http').createServer(function (request, response) {
    var body = "";
    console.log("server started");
    request.addListener('data', function (chunk) { body += chunk });
    request.addListener('end', function () {
        
        router.handle(request, body, function (result) {
            
            response.writeHead(result.status, result.headers);
            response.end(result.body);
        });
    });
}).listen(3000);
