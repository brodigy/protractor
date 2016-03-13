'use strict';

fdescribe('locators test', function () {


    beforeEach(function () {
        browser.get('/#/locators')
    });

    it('example 1', function () {
        var input = element(by.model('val'));
        input.clear();
        input.sendKeys('123');
        expect(input.getAttribute('value')).toBe('123');
    });

    it('example 2', function () {

        element(by.repeater('pet in pets').row(1)).getText().then(function(val){
            console.log(val)
        });

        element(by.repeater('pet in pets').row(0).column('pet.name')).getText().then(function(val){console.log(val)});

        element.all(by.repeater('pet in pets').column('pet.age')).getText().then(function(val){console.log(val)});
    });

    it('example 3', function () {

        element.all(by.css('.items li')).each(function(element, index) {
            element.getText().then(function (text) {
                console.log(index, text);
            });
        });

        element.all(by.css('.items li')).filter(function(element) {
            return element.getText().then(function(text) {
                return text === 'Third';
            });
        }).then(function(filteredElements) {
            filteredElements[0].getText().then(function(val){console.log(val)});
        });

    });

    it('example 4', function () {

        element(by.id('divId')).all(by.tagName('div')).get(0).getText().then(function(val){console.log(val)});

    });

});