'use strict';

describe('login page', function () {
	var LoginPage = require('./pages/login.po.js');
	var AddPostPage = require('./pages/addPost.po.js');
	var HomePage = require('./pages/home.po.js');
	var loginPage, addPostPage, homePage, params;

	beforeEach(function () {
		loginPage = new LoginPage();
		addPostPage = new AddPostPage();
		homePage = new HomePage();

		loginPage.get();
		params = browser.params.login;
	});

	it('should successfully add a new post', function () {
		expect(browser.getLocationAbsUrl()).toMatch('/login');
		loginPage.setCredentials(params.email, params.password);
		expect(loginPage.submitLogin.isEnabled()).toBeTruthy();
		loginPage.submitLogin.click();

		expect(browser.getLocationAbsUrl()).toMatch('/home');

		homePage.listOfPosts.count().then(function(initialNrOfPosts) {
			homePage.clickLink('Add New Post');
			expect(browser.getLocationAbsUrl()).toMatch('/add');

			addPostPage.addPost("Test Title", "Description for new post", "ENDAVA");
			expect(browser.getLocationAbsUrl()).toMatch('/home');

			expect(homePage.listOfPosts.count()).toEqual(initialNrOfPosts + 1);
		});
	});

});