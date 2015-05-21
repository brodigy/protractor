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

};

module.exports = HomePage;