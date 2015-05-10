'use strict';

describe('transaction view', function() {
    var gridTestUtils = require( './utils/gridTestUtils.spec.js');
    var transactionsMockModule = require('./mocks/TransactionsMocks.js');
    var TransactionPage = require('./pages/TransactionsPage.js');
    var transactionPage;

    beforeEach(function() {
        browser.manage().window().setSize(1920, 1080);
        browser.addMockModule('portalServerMockModule', transactionsMockModule);

        transactionPage = new TransactionPage();
        transactionPage.get();
    });

    it('should load the transactions grid on the home page', function() {
        expect(browser.getLocationAbsUrl()).toMatch('/home');
        expect(transactionPage.transactionsGrid.isDisplayed()).toBeTruthy();
    });

    it('should load the first transaction in the transactions grid', function() {
        expect(browser.getLocationAbsUrl()).toMatch('/home');
        expect(transactionPage.transactionsGrid.isDisplayed()).toBeTruthy();
        gridTestUtils.expectRowValuesMatch('rolesGrid', 0, ['28/04/2015 13:12:42', '11417344252', 'ref', '27.23', '27.23', 'EUR', 'desc', 'PAYMENT', 'SUCCESS', 'MC_CREDIT']);
    });

    it('should load all the rows in the grid', function() {
        expect(browser.getLocationAbsUrl()).toMatch('/home');
        expect(transactionPage.transactionsGrid.isDisplayed()).toBeTruthy();
        gridTestUtils.expectRowCount('rolesGrid', 2);
    });

});