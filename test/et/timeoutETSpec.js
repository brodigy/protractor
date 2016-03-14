'use strict';

describe('timeout page', function () {
    var LoginPage = require('./../pages/login.po.js');
    var TimeoutPage = require('./../pages/timeout.po.js');
    var loginPage, timeoutPage, params;

    beforeEach(function () {
        loginPage = new LoginPage();
        timeoutPage = new TimeoutPage();

        loginPage.get();
        params = browser.params.login;
    });

    it('should successfully redirect to login page after visiting the redirect page', function () {
        expect(browser.getLocationAbsUrl()).toMatch('/login');
        loginPage.setCredentials(params.email, params.password);
        expect(loginPage.submitLogin.isEnabled()).toBeTruthy();
        loginPage.submitLogin.click();

        expect(browser.getLocationAbsUrl()).toMatch('/home');

        browser.get('/#/timeout');
        expect(timeoutPage.timeoutText.isPresent()).toBeTruthy();

        browser.wait(protractor.ExpectedConditions.presenceOf(loginPage.submitLogin), 6000, 'Was redirected to login page');

        expect(loginPage.submitLogin.isPresent()).toBeTruthy();
    });

    it('example for using protractor.KEY', function () {
        expect(browser.getLocationAbsUrl()).toMatch('/login');

        loginPage.email.sendKeys('some email');
        loginPage.email.sendKeys(protractor.Key.CTRL + protractor.Key.A);
        loginPage.email.sendKeys(protractor.Key.BACK_SPACE);
        expect(loginPage.email.getText()).toEqual('');

    });

});