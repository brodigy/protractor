exports.config = {

	specs: [
		'./e2e/homeMockedSpec.js'
	],

	seleniumServerJar: '../node_modules/protractor/selenium/selenium-server-standalone-2.45.0.jar',

	capabilities: {
		'browserName': 'chrome'
	},

	baseUrl: 'http://localhost:8881/',

	onPrepare: function () {
		browser.driver.manage().window().setSize(1920, 1080);
	},

	params: {
		login: {
			email: 'alex@endava.com',
			password: 'password'
		}
	},

	jasmineNodeOpts: {
		onComplete: null,
		isVerbose: false,
		showColors: true,
		includeStackTrace: true,
		defaultTimeoutInterval: 20000
	}
};