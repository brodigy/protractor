'use strict';

xdescribe('home page', function () {
	var LoginPage = require('./pages/login.po.js');
	var HomePage = require('./pages/home.po.js');
	var mockInjector = require('./mocks/mockInjector.js');
	var loginPage, homePage, params;

	beforeEach(function () {
		browser.addMockModule('mockModule', mockInjector.inject);

		loginPage = new LoginPage();
		homePage = new HomePage();

		loginPage.get();
		params = browser.params.login;
	});

	it('should successfully navigate to the home page', function () {
		expect(browser.getLocationAbsUrl()).toMatch('/login');
		loginPage.setCredentials(params.email, params.password);
		expect(loginPage.submitLogin.isEnabled()).toBeTruthy();
		loginPage.submitLogin.click();

		expect(browser.getLocationAbsUrl()).toMatch('/home');
		homePage.listOfPosts.count().then(function(count){
			console.log(count);
		});
		expect(homePage.listOfPosts.count()).toEqual(2);

	});

});