exports.config = {

    specs: [
        './e2e/*.js'
    ],

    seleniumServerJar: '../node_modules/protractor/selenium/selenium-server-standalone-2.45.0.jar',

    capabilities: {
        'browserName': 'phantomjs'
    },

    baseUrl: 'http://localhost:9999/',

    jasmineNodeOpts: {
        onComplete: null,
        isVerbose: false,
        showColors: true,
        includeStackTrace: true,
        defaultTimeoutInterval: 10000
    }
};
