exports.config = {

    specs: [
        './et/**/*ETSpec.js',
        './it/**/*ITSpec.js'
    ],

    capabilities: {
        'browserName': 'chrome',
        shardTestFiles: true,
        maxInstances: 2
    },

    baseUrl: 'http://localhost:8888/',

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