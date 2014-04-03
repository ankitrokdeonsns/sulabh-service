var assert = require("assert");
var location = require("../location.js").location;
var repository = require("../geoSpatialRepository.js").geoSpatialRepository;
var sinon = require("sinon");
var chai = require("chai");
var should = chai.should();
var	expect = chai.expect;

describe("searching locations within a given radius", function(){
	var latitude = 180, longitude = 703, radius = 2;
	var mockedFind;

	before(function(){
        mockedFind = sinon.mock(repository);
	});

	it("should return no locations", function(){
        mockedFind.expects("find").withArgs(latitude,longitude,radius).returns(undefined);
	    var results = location.search(latitude,longitude,radius);
        expect(results).to.be.undefined;
    });

    it("should return locations when available", function(){
        var data = {
            type: "point",
            coordinates: [20,25]
        };
        var latitude = 180, longitude = 703, radius = 2;

        mockedFind.expects("find").withArgs(latitude,longitude,radius).returns(data);
        var results = location.search(latitude,longitude,radius);
        expect(results).to.deep.equal(data);
    });

    after(function(){
        mockedFind.restore();
    });

});