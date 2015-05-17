'use strict';

var HomePage = function () {

	this.addPostLinks = element(by.id('navbar')).all(by.css('a'));
	this.listOfPosts = element.all(by.repeater('post in posts'));

	this.clickLink = function (linkName) {
		this.addPostLinks.filter(function (elem, index) {
			return elem.getText().then(function (text) {
				return text === linkName;
			})
		}).then(function (filteredElements) {
			filteredElements[0].click();
		});
	};

	this.getNrOfPosts = function (nr) {
		this.listOfPosts.count().then(function (nrFound) {
			nr = nrFound;
		});
	};

	this.testAccount = function () {
		var deferred = protractor.promise.defer();

		element.all(by.repeater('post in posts')).count().then(function (nrFound) {
			return deferred.fulfill(nrFound);
		});

		return deferred.promise;
	};

};

module.exports = HomePage;