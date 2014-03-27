var assert = require("assert");
var location = require("../location.js").location;
var repository = require("../repository.js").repository;
var sinon = require("sinon");
var chai = require("chai"),
	should = chai.should(),
	expect = chai.expect;

describe("searching locations within a given radius", function(){
	it("should return no locations", function(){
		repository.find = sinon.stub().returns(undefined);
		var latitude = 18, longitude = 73, radius = 2;
		
		var locations = location.search(latitude, longitude, radius);
		
		expect(locations).to.be.empty;
	})

	it("should return locations", function(){
		var expectedLocations = [{name:"yerawada",latitude:18,longitude:73}];
		repository.find = sinon.stub().returns(expectedLocations);
		var latitude = 18, longitude = 73, radius = 2;
		
		var actualLocations = location.search(latitude, longitude, radius);
		
		expect(actualLocations).not.to.be.empty;
		expect(actualLocations).to.have.length(1);
	})

})