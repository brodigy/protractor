'use strict';

var LoginPage = function () {

	this.email = element(by.id('email'));
	this.password = element(by.model('password'));
	this.submitLogin = element(by.css('button[type="submit"]'));
	this.validationMessages = element.all(by.id('validation-messages')).all(by.css('p.error'));

	this.setCredentials = function (email, password) {
		expect(this.email.isPresent()).toBeTruthy();
		expect(this.password.isPresent()).toBeTruthy();

		this.email.sendKeys(email);
		this.password.sendKeys(password);
	};

	this.clearCredentials = function () {
		this.email.clear();
		this.password.clear();
	};

	this.get = function () {
		browser.get('');
		browser.waitForAngular();
	};

	/*
	 Function that will check if the message provided asa a parameter is displayed as a validation error message.
	 */
	this.matchDisplayedErrorMessage = function (message, contain) {
		var listOfDisplayedErrorMessages = [];
		var validationMessages = this.validationMessages;
		validationMessages.count().then(function (nrMessages) {
			validationMessages.each(function (element, index) {
				element.getText().then(function (text) {
					listOfDisplayedErrorMessages.push(text);
					if (index + 1 === nrMessages) {
						if (contain) {
							expect(listOfDisplayedErrorMessages).toContain(message);
						} else {
							expect(listOfDisplayedErrorMessages).not.toContain(message);
						}
					}
				});
			});
		});
	};

};

module.exports = LoginPage;