'use strict';

describe('login page', function () {
	var LoginPage = require('./../pages/login.po.js');
	var loginPage;
	var params;

	beforeEach(function () {
		loginPage = new LoginPage();
		loginPage.get();
		params = browser.params.login;
	});

	it('should check that email, password and submit button are present on the login page', function () {
		expect(browser.getLocationAbsUrl()).toMatch('/login');
		expect(loginPage.email.isPresent()).toBeTruthy();
		expect(loginPage.password.isPresent()).toBeTruthy();
		expect(loginPage.submitLogin.isPresent()).toBeTruthy();
		expect(loginPage.submitLogin.isEnabled()).toBeFalsy();
	});

	it('should show validation error when email and password are left empty', function () {
		expect(browser.getLocationAbsUrl()).toMatch('/login');

		loginPage.setCredentials('test@endava.com', 'password');
		expect(loginPage.submitLogin.isEnabled()).toBeTruthy();

		loginPage.clearCredentials();
		expect(loginPage.submitLogin.isEnabled()).toBeFalsy();
		loginPage.matchDisplayedErrorMessage("Email address is required", true);
		loginPage.matchDisplayedErrorMessage("Password is required", true);
	});


	it('should show validation error when email is empty', function () {
		expect(browser.getLocationAbsUrl()).toMatch('/login');

		loginPage.setCredentials('test@endava.com', 'password');
		expect(loginPage.submitLogin.isEnabled()).toBeTruthy();

		loginPage.email.clear();
		expect(loginPage.submitLogin.isEnabled()).toBeFalsy();
		loginPage.matchDisplayedErrorMessage("Email address is required", true);
		loginPage.matchDisplayedErrorMessage("Password is required", false);

	});

	it('should successfully login and redirect to home page', function () {
		expect(browser.getLocationAbsUrl()).toMatch('/login');

		loginPage.setCredentials(params.email, params.password);

		expect(loginPage.submitLogin.isEnabled()).toBeTruthy();
		loginPage.submitLogin.click();

		expect(browser.getLocationAbsUrl()).toMatch('/home');
	});

});