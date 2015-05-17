'use strict';

var TransactionsPage = function () {
	this.transactionsGrid = element(by.id('rolesGrid'));

	this.startDateTime = element(by.id('startDateInput'));
	this.startHours = element.all(by.id('startTimeInput')).all(by.css('input')).get(0);
	this.startMinutes = element.all(by.id('startTimeInput')).all(by.css('input')).get(1);
	this.startCalendarIcon = element.all(by.css('#startDate.input-group')).all(by.css('span.input-group-btn')).all(by.css('button')).get(0);
	this.startCalendar = element.all(by.css('#startDate.input-group')).all(by.model('date'));
	this.startCalendarDaysButtonList = element.all(by.css('#startDate.input-group')).all(by.css('button'));

	this.endDateTime = element(by.id('endDateInput'));
	this.endHours = element.all(by.id('endTimeInput')).all(by.css('input')).get(0);
	this.endMinutes = element.all(by.id('endTimeInput')).all(by.css('input')).get(1);
	this.endCalendarIcon = element.all(by.css('#endDate.input-group')).all(by.css('span.input-group-btn')).all(by.css('button')).get(0);
	this.endCalendar = element.all(by.css('#endDate.input-group')).all(by.model('date'));
	this.endCalendarDaysButtonList = element.all(by.css('#endDate.input-group')).all(by.css('button'));

	this.dateValidationMessages = element.all(by.id('validation-messages')).all(by.css('p.error'));
	this.dateAllValidationMessages = element.all(by.id('validation-messages')).all(by.css('p.error'));
	this.dateHiddenValidationMessages = element.all(by.id('validation-messages')).all(by.css('.ng-hide'));

	this.searchButton = element(by.id('searchButton'));
	this.paginationPagesList = element.all(by.css('.ui-grid-pager-row-count-picker')).all(by.options('o as o for o in grid.options.paginationPageSizes'));
	this.gridRowsList = element.all(by.repeater('(rowRenderIndex, row) in rowContainer.renderedRows track by $index'));
	this.gridCountLabel = element.all(by.css('.ui-grid-pager-count span')).get(0);

	this.firstPageButton = element.all(by.css('.ui-grid-pager-control')).all(by.css('button')).get(0);
	this.previousPageButton = element.all(by.css('.ui-grid-pager-control')).all(by.css('button')).get(1);
	this.nextPageButton = element.all(by.css('.ui-grid-pager-control')).all(by.css('button')).get(2);
	this.lastPageButton = element.all(by.css('.ui-grid-pager-control')).all(by.css('button')).get(3);
	this.goToPageInput = element.all(by.css('.ui-grid-pager-control')).all(by.css('input')).get(0);


	this.setEndDate = function (date, hours, minutes) {
		expect(this.endDateTime.isPresent()).toBeTruthy();
		expect(this.endHours.isPresent()).toBeTruthy();
		expect(this.endMinutes.isPresent()).toBeTruthy();

		this.endDateTime.clear();
		this.endHours.clear();
		this.endMinutes.clear();

		this.endDateTime.sendKeys(date);
		this.endHours.sendKeys(hours);
		this.endMinutes.sendKeys(minutes);
	};

	this.setStartDate = function (date, hours, minutes) {
		expect(this.startDateTime.isPresent()).toBeTruthy();
		expect(this.startHours.isPresent()).toBeTruthy();
		expect(this.startMinutes.isPresent()).toBeTruthy();

		this.startDateTime.clear();
		this.startHours.clear();
		this.startMinutes.clear();

		this.startDateTime.sendKeys(date);
		this.startHours.sendKeys(hours);
		this.startMinutes.sendKeys(minutes);
	};

	/*
	 This function will check if any error validation messages are displayed
	 */
	this.expectDateValidationMessages = function (expectedOutcome) {
		var dateHiddenValidationMessages = this.dateHiddenValidationMessages;
		this.dateAllValidationMessages.count().then(function (allElements) {
			dateHiddenValidationMessages.count().then(function (hiddenElements) {
				if (expectedOutcome) {
					expect(allElements).toBeGreaterThan(hiddenElements);
				} else {
					expect(allElements).toEqual(hiddenElements);
				}
			});
		});
	};

	this.get = function () {
		browser.get('');
		browser.waitForAngular();
	};

	this.getPage = function (path) {
		browser.get(path);
		browser.waitForAngular();
	};

	/*
	 Function that will check if the message provided asa a parameter is displayed as a dat validation error message.
	 */
	this.matchDisplayedErrorMessage = function (message) {
		var listOfDisplayedErrorMessages = [];
		var validationMessages = this.dateValidationMessages;
		validationMessages.count().then(function (nrMessages) {
			validationMessages.each(function (element, index) {
				element.getText().then(function (text) {
					listOfDisplayedErrorMessages.push(text);
					if (index + 1 === nrMessages) {
						expect(listOfDisplayedErrorMessages).toContain(message);
					}
				});
			});
		});
	};

	/*
	 Function that will select another day from the calendar relative to the current selection.
	 The new day that will be selected is computed based on the provided offset.
	 Before selection, the calendar icon will be clicked and a check will be made to verify that the calendar widget is displayed.

	 The function will check if the click was successful or not based on the clickOutcome value
	 */
	this.setCalendarWidgetDay = function (calendarIcon, calendar, calendarButtonsList, offset, clickOutcome) {
		calendarIcon.click().then(function () {
			expect(calendar.isDisplayed()).toBeTruthy();
			calendarButtonsList.each(function (elem, index) {
				elem.getAttribute('class').then(function (classes) {
					if (classes.indexOf('active') !== -1) {
						calendarButtonsList.get(index + offset).click().then(function () {
							//added extra check as some disabled elements are clickable for some browsers
							expect(calendarButtonsList.get(index + offset).isEnabled()).toEqual(clickOutcome);
						}, function (err) {
							expect(clickOutcome).toBeFalsy();
						});
					}
				});
			});
		});
	};

	/*
	 Function that will match the get parameters set on the request with a given array that contains expected params
	 */
	this.checkUrlPrams = function (url, expectedParamNames) {
		var foundParams = [];
		var params = url.substr(url.indexOf('?') + 1);
		params = params.split('&');
		for (var i = 0; i < params.length; i++) {
			var param = params[i].split('=');
			foundParams.push(param[0]);
		}
		expect(foundParams).toMatch(expectedParamNames);
	};

	//This function will select a pagination based on the value provided (possible values: 25, 50, 100)
	this.selectPaginationSize = function (val, paginationSelector) {
		paginationSelector.each(function (element, index) {

			element.getAttribute('label').then(function (text) {
					if (text === val) {
						paginationSelector.get(index).click().then(function () {
							}, function (err) {
							}
						);
					}
				},
				function (err) {
				}
			);
		});
	};

};

module.exports = TransactionsPage;