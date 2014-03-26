var assert = require("assert");
var app = require("../app.js").app;
var chai = require("chai"), should = chai.should();

describe("http", function () {
	it("should exist", function () {
		should.exist(app.http);
	})
})