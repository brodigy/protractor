'use strict';

var TransactionsPage = function () {

	this.transactionsGrid = element(by.id('rolesGrid'));

	this.email = element(by.id('email'));
	this.password = element(by.model('password'));
	this.submitLogin = elemet(by.css('button[type="submit"]'));


	this.setCredentials = function(email, password) {
		expect(this.email.isPresent()).toBeTruthy();
		expect(this.password.isPresent()).toBeTruthy();

		this.email.sendKeys(email);
		this.email.sendKeys(password);
	};


};

module.exports = TransactionsPage;