var assert = require("assert");

var locationsRepository = require("../geoSpatialRepository.js").geoSpatialRepository;
var chai = require("chai"),
	should = chai.should(),
	expect = chai.expect,
	assert = chai.assert;

describe("finding one location from the database", function(){
    //setup
    var actual = {
        "type":"point",
        "coordinates":[20,20]
    };

    before(function(){
        locationsRepository.save(actual);
    });

    var expected = [{
        "type":"point",
        "coordinates":[20,20]
    }];

    it("should find the data present in location repository", function() {
        //call
        locationsRepository.findAll(function(error, data) {
            //assertion
            expect(data.coordinates).deep.equals(expected.coordinates);
            expect(data.type).deep.equals(expected.type);
        });
    });

    after(function(){
        locationsRepository.remove(actual);
    });

});

describe("finding multiple locations from database", function(){
    var data1 = {
        "type":"point",
        "coordinates":[20,20]
    };
    var data2 = {
        "type":"point",
        "coordinates":[42,72]
    };

    var expected = [data1,data2];

    before(function(){
        locationsRepository.save(data1);
        locationsRepository.save(data2);
    });

    it("should find the data present in location repository", function() {
            //call
        locationsRepository.findAll(function(error, data) {
            //assertion
            for(var i=0;i<data.length;i++){
                for(var j=0;j<data[i].coordinates;j++)
                    expect(data[i][j].coordinates).eql(expected[i][j].coordinates);
                expect(data[i].type).eql(expected[i].type);
            }
        });
    });

    after(function(){
        locationsRepository.remove(data1);
        locationsRepository.remove(data2);
    });

});

describe("finding locations within a particular radius", function(){

    //setup
    var actual = {
        "type":"point",
        "coordinates":[18.533333,73.866667]
    };

    before(function(){
        locationsRepository.save(actual);
    });

    var expected = [actual];

    var latitude = 18.527743700000000000;
    var longitude = 73.853300699999980000;
    var radius = 1.5;

    it("should give locations around 1.5km radius", function() {
        // call
        locationsRepository.find(latitude, longitude, radius, function(error, data) {
            // assertion
            for(var i=0;i<data.length;i++){
                for(var j=0;j < data[i].coordinates;j++)
                    expect(data[i][j].coordinates).eql(expected[i][j].coordinates);
                expect(data[i].type).eql(expected[i].type);
            }
            expect(data.length).to.not.equal(0);
        });
    });

    after(function(){
        locationsRepository.remove(actual);
    });

});


describe("finding locations within a particular radius", function(){

    //setup
    var actual = {
        "type":"point",
        "coordinates":[18.533333,73.866667]
    };

    before(function(){
        locationsRepository.save(actual);
    });

    var expected = [actual];

    var latitude = 18.527743700000000000;
    var longitude = 73.853300699999980000;
    var radius = 1;

    it("should not give locations around 1km radius when not present", function() {
        // call
        locationsRepository.find(latitude, longitude, radius, function(error, data) {
            // assertion
            for(var i=0;i<data.length;i++){
                for(var j=0;j < data[i].coordinates;j++)
                    expect(data[i][j].coordinates).eql(expected[i][j].coordinates);
                expect(data[i].type).eql(expected[i].type);
            }
            expect(data.length).to.equal(0);
        });
    });

    after(function(){
        locationsRepository.remove(actual);
    });

});
