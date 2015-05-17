'use strict';

var AddPostPage = function () {

	this.title = element(by.id('title'));
	this.description = element(by.id('message'));
	this.source = element(by.id('author'));
	this.addPostButton = element(by.css('button[type="submit"]'));

	/*
	 Add a the necessary info for a new post and submit the post button
	 */
	this.addPost = function (title, description, source) {

		expect(this.title.isPresent()).toBeTruthy();
		expect(this.description.isPresent()).toBeTruthy();
		expect(this.source.isPresent()).toBeTruthy();
		expect(this.addPostButton.isPresent()).toBeTruthy();

		this.title.sendKeys(title);
		this.description.sendKeys(description);
		this.source.sendKeys(source);

		this.addPostButton.click();
	};

	this.getPage = function (path) {
		browser.get(path);
		browser.waitForAngular();
	};
};

module.exports = AddPostPage;