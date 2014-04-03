var assert = require("assert");

var locationsRepository = require("../geoSpatialRepository.js").geoSpatialRepository;
var chai = require("chai"),
	should = chai.should(),
	expect = chai.expect,
	assert = chai.assert;

describe("finding locations from the database", function(){
    //setup
    var data = {
        "type":"point",
        "coordinates":[20,20]
    };
    before(function(){
        locationsRepository.save(data);
    });

    it("should find the data present in location repository",function(){
        //call
        var actual = locationsRepository.find();
        //assertion
        console.log("*::::"+(JSON.stringify(actual)))
        console.log("success");
    });

    after(function(){

    });

});