'use strict';

describe('login page', function () {

	beforeEach(function () {
		browser.get('');
		browser.waitForAngular();
	});

	it('should check that email, password and submit button are present on the login page', function () {
		expect(browser.getLocationAbsUrl()).toMatch('/login');

		expect(element(by.id('email')).isPresent()).toBeTruthy();
		expect(element(by.model('password')).isPresent()).toBeTruthy();
		expect(element(by.css('button[type="submit"]')).isPresent()).toBeTruthy();
		expect(element(by.css('button[type="submit"]')).isEnabled()).toBeFalsy();

	});

	it('should show validation error when email and password are left empty', function () {
		expect(browser.getLocationAbsUrl()).toMatch('/login');

		element(by.id('email')).sendKeys("email@test.com");
		element(by.id('password')).sendKeys("password");
		expect(element(by.css('button[type="submit"]')).isEnabled()).toBeTruthy();

		element(by.id('email')).clear();
		element(by.id('password')).clear();
		expect(element(by.css('button[type="submit"]')).isEnabled()).toBeFalsy();

		var listOfDisplayedErrorMessages = [];
		var validationMessages = element.all(by.id('validation-messages')).all(by.css('p.error'));

		validationMessages.count().then(function (nrMessages) {
			validationMessages.each(function (element, index) {
				element.getText().then(function (text) {
					listOfDisplayedErrorMessages.push(text);
					if (index + 1 === nrMessages) {
						expect(listOfDisplayedErrorMessages).toContain("Email address is required");
						expect(listOfDisplayedErrorMessages).toContain("Password is required");
					}
				});
			});
		});

	});


	it('should show validation error when email is empty', function () {
		expect(browser.getLocationAbsUrl()).toMatch('/login');

		element(by.id('email')).sendKeys("email@test.com");
		element(by.id('password')).sendKeys("password");
		expect(element(by.css('button[type="submit"]')).isEnabled()).toBeTruthy();

		element(by.id('email')).clear();
		expect(element(by.css('button[type="submit"]')).isEnabled()).toBeFalsy();

		var listOfDisplayedErrorMessages = [];
		var validationMessages = element.all(by.id('validation-messages')).all(by.css('p.error'));

		validationMessages.count().then(function (nrMessages) {
			validationMessages.each(function (element, index) {
				element.getText().then(function (text) {
					listOfDisplayedErrorMessages.push(text);
					if (index + 1 === nrMessages) {
						expect(listOfDisplayedErrorMessages).toContain("Email address is required");
						expect(listOfDisplayedErrorMessages).not.toContain("Password is required");
					}
				});
			});
		});
	});

	it('should successfully login and redirect to home page', function () {
		var params = browser.params.login;
		expect(browser.getLocationAbsUrl()).toMatch('/login');

		element(by.id('email')).sendKeys(params.email);
		element(by.id('password')).sendKeys(params.password);
		expect(element(by.css('button[type="submit"]')).isEnabled()).toBeTruthy();
		element(by.css('button[type="submit"]')).click();

		expect(browser.getLocationAbsUrl()).toMatch('/home');
	});

});