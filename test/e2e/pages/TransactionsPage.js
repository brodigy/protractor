'use strict'

var TransactionsPage = function() {

    this.transactionsGrid = element(by.id('rolesGrid'));

    this.get = function() {
        browser.get('');
        browser.waitForAngular();
    };

};

module.exports = TransactionsPage;