'use strict';

describe('transaction view', function () {
	var gridTestUtils = require('./utils/gridTestUtils.js');
	var mockInjector = require('./utils/mockInjector.js');
	var transactionMocks = require('./mocks/transactionsMocks.js');
	var TransactionPage = require('./pages/transactionsPage.js');
	var transactionPage;

	describe('date picker', function () {

		beforeEach(function () {
			browser.addMockModule('portalServerMockModule', mockInjector.inject, transactionMocks.mockedTransactions, transactionMocks.mockedMetadata);
			transactionPage = new TransactionPage();
			transactionPage.get();
		});

		it('should load the transactions grid on the home page', function () {
			expect(browser.getLocationAbsUrl()).toMatch('/home');
			expect(transactionPage.transactionsGrid.isDisplayed()).toBeTruthy();
		});

		it('should load the first transaction in the transactions grid', function () {
			expect(browser.getLocationAbsUrl()).toMatch('/home');
			expect(transactionPage.transactionsGrid.isDisplayed()).toBeTruthy();

			gridTestUtils.expectRowValuesMatch('rolesGrid', 0, ['11/05/2015 09:32:17', '11396289378', '', '2,000.00', '2,000.00', 'GBP', '', 'Repeat', 'Success', 'Visa Debit']);
		});

		it('should load all the rows in the grid', function () {
			expect(browser.getLocationAbsUrl()).toMatch('/home');
			expect(transactionPage.transactionsGrid.isDisplayed()).toBeTruthy();

			gridTestUtils.expectRowCount('rolesGrid', transactionMocks.mockedTransactions.total);
		});

		it('should pre-populate start/end date and time', function () {
			expect(browser.getLocationAbsUrl()).toMatch('/home');

			expect(transactionPage.endMinutes.getAttribute('value')).toEqual('59');
			expect(transactionPage.endHours.getAttribute('value')).toEqual('23');
			expect(transactionPage.endDateTime.getAttribute('value')).toBeTruthy();
			expect(transactionPage.startMinutes.getAttribute('value')).toBeTruthy();
			expect(transactionPage.startHours.getAttribute('value')).toBeTruthy();
			expect(transactionPage.startDateTime.getAttribute('value')).toBeTruthy();

			browser.getLocationAbsUrl().then(function (url) {
				transactionPage.checkUrlPrams(url, ['fromDate', 'toDate']);
			});

			transactionPage.expectDateValidationMessages(false);
			expect(transactionPage.searchButton.isEnabled()).toBeTruthy();
		});

		it('should show validation error when end date is smaller then start date', function () {
			expect(browser.getLocationAbsUrl()).toMatch('/home');

			transactionPage.setStartDate('01/01/2033', '12', '34');
			transactionPage.matchDisplayedErrorMessage('We were unable to run your report. Please check and amend your selection.');
			transactionPage.matchDisplayedErrorMessage('Your End date must be later than your Start date');
			transactionPage.expectDateValidationMessages(true);

			expect(transactionPage.searchButton.isEnabled()).toBeFalsy();
		});

		it('should match end and start date when previous date is selected in calendar widget', function () {
			expect(browser.getLocationAbsUrl()).toMatch('/home');

			transactionPage.setStartDate('04/05/2015', '00', '00');
			transactionPage.setEndDate('07/05/2015', '00', '00');
			transactionPage.setCalendarWidgetDay(transactionPage.startCalendarIcon, transactionPage.startCalendar, transactionPage.startCalendarDaysButtonList, -1, true);
			transactionPage.setCalendarWidgetDay(transactionPage.endCalendarIcon, transactionPage.endCalendar, transactionPage.endCalendarDaysButtonList, -1, true);

			expect(transactionPage.startDateTime.getAttribute('value')).toMatch('03/05/2015');
			expect(transactionPage.endDateTime.getAttribute('value')).toMatch('06/05/2015');
			transactionPage.expectDateValidationMessages(false);
			expect(transactionPage.searchButton.isEnabled()).toBeTruthy();
		});

		it('should not be able to select dates in the future from the calendar', function () {
			expect(browser.getLocationAbsUrl()).toMatch('/home');
			var initialStartDate = transactionPage.startDateTime.getAttribute('value');
			var initialEndDate = transactionPage.endDateTime.getAttribute('value');

			//attempt to select the next day in the future from the grid and expect to fail
			transactionPage.setCalendarWidgetDay(transactionPage.startCalendarIcon, transactionPage.startCalendar, transactionPage.startCalendarDaysButtonList, 1, false);
			transactionPage.setCalendarWidgetDay(transactionPage.endCalendarIcon, transactionPage.endCalendar, transactionPage.endCalendarDaysButtonList, 1, false);

			//expect that the two dates haven't changed since the calendar click has failed
			expect(transactionPage.startDateTime.getAttribute('value')).toMatch(initialStartDate);
			expect(transactionPage.endDateTime.getAttribute('value')).toMatch(initialEndDate);

			transactionPage.expectDateValidationMessages(false);
			expect(transactionPage.searchButton.isEnabled()).toBeTruthy();
		});

		it('should show validation message when invalid character is inserted in start date', function () {
			var invalidStartDate = '04/0a/2015';
			expect(browser.getLocationAbsUrl()).toMatch('/home');

			transactionPage.setStartDate(invalidStartDate, '00', '00');
			transactionPage.expectDateValidationMessages(true);
			transactionPage.matchDisplayedErrorMessage('We were unable to run your report. Please check and amend your selection.');
			transactionPage.matchDisplayedErrorMessage('Your Start date of ' + invalidStartDate + ' is an invalid date');
			expect(transactionPage.searchButton.isEnabled()).toBeFalsy();
		});

		it('should show validation message when invalid character is inserted in end date', function () {
			var invalidEndDate = '04/0a/2290';
			expect(browser.getLocationAbsUrl()).toMatch('/home');

			transactionPage.setEndDate(invalidEndDate, '00', '00');
			transactionPage.expectDateValidationMessages(true);
			transactionPage.matchDisplayedErrorMessage('We were unable to run your report. Please check and amend your selection.');
			transactionPage.matchDisplayedErrorMessage('Your End date of ' + invalidEndDate + ' is an invalid date');
			expect(transactionPage.searchButton.isEnabled()).toBeFalsy();
		});

		it('should show validation message when both start and end date are empty', function () {
			expect(browser.getLocationAbsUrl()).toMatch('/home');
			transactionPage.setStartDate('', '00', '00');
			transactionPage.setEndDate('', '00', '00');

			transactionPage.expectDateValidationMessages(true);
			transactionPage.matchDisplayedErrorMessage('We were unable to run your report. Please check and amend your selection.');
			transactionPage.matchDisplayedErrorMessage('Your Start date can not be empty');
			transactionPage.matchDisplayedErrorMessage('Your End date can not be empty');
			expect(transactionPage.searchButton.isEnabled()).toBeFalsy();
		});

		it('should show validation message for 29/02/2015', function () {
			expect(browser.getLocationAbsUrl()).toMatch('/home');
			transactionPage.setStartDate('29/02/2015', '00', '00');

			transactionPage.expectDateValidationMessages(true);
			transactionPage.matchDisplayedErrorMessage('We were unable to run your report. Please check and amend your selection.');
			transactionPage.matchDisplayedErrorMessage('Your Start date of 29/02/2015 is an invalid date');
			expect(transactionPage.searchButton.isEnabled()).toBeFalsy();
		});

		it('should show validation message for non existent date', function () {
			var nonExistingDate = '32/02/2015';
			expect(browser.getLocationAbsUrl()).toMatch('/home');
			transactionPage.setStartDate(nonExistingDate, '00', '00');

			transactionPage.expectDateValidationMessages(true);
			transactionPage.matchDisplayedErrorMessage('We were unable to run your report. Please check and amend your selection.');
			transactionPage.matchDisplayedErrorMessage('Your Start date of ' + nonExistingDate + ' is an invalid date');
			expect(transactionPage.searchButton.isEnabled()).toBeFalsy();
		});

		it('should show validation message when start date is smaller then minimum allowed date', function () {
			var minimumAllowedDate = '01/01/1999';
			expect(browser.getLocationAbsUrl()).toMatch('/home');
			transactionPage.setStartDate(minimumAllowedDate, '00', '00');

			transactionPage.expectDateValidationMessages(true);
			transactionPage.matchDisplayedErrorMessage('We were unable to run your report. Please check and amend your selection.');
			transactionPage.matchDisplayedErrorMessage('Your Start date of ' + minimumAllowedDate + ' is less then the minimum date of 01/01/2000');
			expect(transactionPage.searchButton.isEnabled()).toBeFalsy();
		});

		it('should show validation message when both start and end date are in the future', function () {
			var futureStartDate = '01/01/2033';
			expect(browser.getLocationAbsUrl()).toMatch('/home');
			transactionPage.setStartDate(futureStartDate, '00', '00');
			transactionPage.setEndDate('01/01/2034', '00', '00');

			transactionPage.expectDateValidationMessages(true);
			transactionPage.matchDisplayedErrorMessage('We were unable to run your report. Please check and amend your selection.');
			transactionPage.matchDisplayedErrorMessage('Your Start date of ' + futureStartDate + ' is in the future');
			expect(transactionPage.searchButton.isEnabled()).toBeFalsy();
		});

	});

	describe('pagination', function () {
		//build a tqs response that will contain 100 transactions
		var paginationTransactionMocks = transactionMocks.addTransactions(100);

		beforeEach(function () {
			browser.addMockModule('portalServerMockModule', mockInjector.injectPagination, paginationTransactionMocks, transactionMocks.mockedMetadata);
			transactionPage = new TransactionPage();
			transactionPage.get();
		});

		it('should select pagination size to be 25 items per page', function () {
			expect(browser.getLocationAbsUrl()).toMatch('/home');
			expect(transactionPage.transactionsGrid.isDisplayed()).toBeTruthy();

			transactionPage.selectPaginationSize('25', transactionPage.paginationPagesList);
			//expect to find 25 transactions loaded in the grid when pagination has the size 25
			//note that the actual grid will only render 27 rows for a pagination bigger then 25 e.g 50, 100
			expect(transactionPage.gridRowsList.count()).toEqual(25);
			expect(transactionPage.gridCountLabel.getText()).toEqual('1 - 25 of 100 items');
		});

		it('should select pagination size to be 50 items per page', function () {
			expect(browser.getLocationAbsUrl()).toMatch('/home');
			expect(transactionPage.transactionsGrid.isDisplayed()).toBeTruthy();

			transactionPage.selectPaginationSize('50', transactionPage.paginationPagesList);
			//expect to find 25 transactions loaded in the grid when pagination has the size 25
			//note that the actual grid will only render 27 rows for a pagination bigger then 25 e.g 50, 100

			expect(transactionPage.gridRowsList.count()).toBeGreaterThan(25);
			expect(transactionPage.gridCountLabel.getText()).toEqual('1 - 50 of 100 items');
		});

		it('should select next page when pagination size is 25', function () {
			expect(browser.getLocationAbsUrl()).toMatch('/home');
			expect(transactionPage.transactionsGrid.isDisplayed()).toBeTruthy();

			expect(transactionPage.gridCountLabel.getText()).toEqual('1 - 25 of 100 items');
			transactionPage.nextPageButton.click().then(function () {
				expect(transactionPage.gridCountLabel.getText()).toEqual('26 - 50 of 100 items');
				gridTestUtils.expectCellValueMatch('rolesGrid', 0, 1, paginationTransactionMocks.columnOutput.data[25].TRANSACTIONID);
			});

			transactionPage.nextPageButton.click().then(function () {
				expect(transactionPage.gridCountLabel.getText()).toEqual('51 - 75 of 100 items');
				gridTestUtils.expectCellValueMatch('rolesGrid', 0, 1, paginationTransactionMocks.columnOutput.data[50].TRANSACTIONID);
			});

			transactionPage.nextPageButton.click().then(function () {
				expect(transactionPage.gridCountLabel.getText()).toEqual('76 - 100 of 100 items');
				gridTestUtils.expectCellValueMatch('rolesGrid', 0, 1, paginationTransactionMocks.columnOutput.data[75].TRANSACTIONID);
			});
		});

		it('should go to last page when pagination size is 50', function () {
			expect(browser.getLocationAbsUrl()).toMatch('/home');
			expect(transactionPage.transactionsGrid.isDisplayed()).toBeTruthy();

			transactionPage.selectPaginationSize('50', transactionPage.paginationPagesList);
			expect(transactionPage.gridCountLabel.getText()).toEqual('1 - 50 of 100 items');

			transactionPage.lastPageButton.click().then(function () {
				expect(transactionPage.gridCountLabel.getText()).toEqual('51 - 100 of 100 items');
				gridTestUtils.expectCellValueMatch('rolesGrid', 0, 1, paginationTransactionMocks.columnOutput.data[50].TRANSACTIONID);
			});
		});


		it('should go to last page and first page when pagination is size 25', function () {
			expect(browser.getLocationAbsUrl()).toMatch('/home');
			expect(transactionPage.transactionsGrid.isDisplayed()).toBeTruthy();

			expect(transactionPage.gridCountLabel.getText()).toEqual('1 - 25 of 100 items');

			transactionPage.lastPageButton.click().then(function () {
				expect(transactionPage.gridCountLabel.getText()).toEqual('76 - 100 of 100 items');
				gridTestUtils.expectCellValueMatch('rolesGrid', 0, 1, paginationTransactionMocks.columnOutput.data[75].TRANSACTIONID);
			});

			transactionPage.firstPageButton.click().then(function () {
				expect(transactionPage.gridCountLabel.getText()).toEqual('1 - 25 of 100 items');
				gridTestUtils.expectCellValueMatch('rolesGrid', 0, 1, paginationTransactionMocks.columnOutput.data[0].TRANSACTIONID);
			});
		});

		it('should go to third page when page number is inserted directly with pagination set to 25', function () {
			expect(browser.getLocationAbsUrl()).toMatch('/home');
			expect(transactionPage.transactionsGrid.isDisplayed()).toBeTruthy();
			expect(transactionPage.gridCountLabel.getText()).toEqual('1 - 25 of 100 items');

			var ctrlA = protractor.Key.chord(protractor.Key.CONTROL, "a");
			transactionPage.goToPageInput.sendKeys(ctrlA).then(function () {
				transactionPage.goToPageInput.sendKeys("3").then(function () {
					expect(transactionPage.gridCountLabel.getText()).toEqual('51 - 75 of 100 items');
					gridTestUtils.expectCellValueMatch('rolesGrid', 0, 1, paginationTransactionMocks.columnOutput.data[50].TRANSACTIONID);
				})
			});
		});

		it('should go to first page when page number is inserted directly', function () {
			expect(browser.getLocationAbsUrl()).toMatch('/home');
			expect(transactionPage.transactionsGrid.isDisplayed()).toBeTruthy();
			expect(transactionPage.gridCountLabel.getText()).toEqual('1 - 25 of 100 items');

			var ctrlA = protractor.Key.chord(protractor.Key.CONTROL, "a");
			transactionPage.goToPageInput.sendKeys(ctrlA).then(function () {
				transactionPage.goToPageInput.sendKeys("3").then(function () {
					expect(transactionPage.gridCountLabel.getText()).toEqual('51 - 75 of 100 items');
					gridTestUtils.expectCellValueMatch('rolesGrid', 0, 1, paginationTransactionMocks.columnOutput.data[50].TRANSACTIONID);
				});
			});
		});

		it('should go to first page when page number is inserted is out of permitted range with pagination set to 25', function () {
			expect(browser.getLocationAbsUrl()).toMatch('/home');
			expect(transactionPage.transactionsGrid.isDisplayed()).toBeTruthy();
			expect(transactionPage.gridCountLabel.getText()).toEqual('1 - 25 of 100 items');

			var ctrlA = protractor.Key.chord(protractor.Key.CONTROL, "a");
			transactionPage.goToPageInput.sendKeys(ctrlA).then(function () {
				transactionPage.goToPageInput.sendKeys("3").then(function () {
					expect(transactionPage.gridCountLabel.getText()).toEqual('51 - 75 of 100 items');
					gridTestUtils.expectCellValueMatch('rolesGrid', 0, 1, paginationTransactionMocks.columnOutput.data[50].TRANSACTIONID);
				});
			});

			transactionPage.goToPageInput.sendKeys(ctrlA).then(function () {
				transactionPage.goToPageInput.sendKeys("9").then(function () {
					expect(transactionPage.gridCountLabel.getText()).toEqual('1 - 25 of 100 items');
					gridTestUtils.expectCellValueMatch('rolesGrid', 0, 1, paginationTransactionMocks.columnOutput.data[0].TRANSACTIONID);
				});
			});
		});
	});

});