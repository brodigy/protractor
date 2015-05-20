exports.config = {

	specs: [
		'./e2e/*.js'
	],

	seleniumAddress: 'http://hub.browserstack.com/wd/hub',

	capabilities: {
		'browserstack.user': 'petrealexandru88@gmail.com',
		'browserstack.key': 'F55Fo1Np5QvmpANB1XuS',
		'browserstack.debug': 'true',
		'browserstack.local': 'true',
		'browserstack.selenium_version': '2.45.0',

		'browserName': 'chrome',
		'version': '39.0',
		'os': 'WINDOWS',
		'os_version': '8',
		'resolution': '1920x1080'
	},

	baseUrl: 'http://localhost:8888',

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
		defaultTimeoutInterval: 120000
	}
};
