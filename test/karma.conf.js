module.exports = function(config){
    config.set({
        basePath : '../',
        files : [
            'build/js/vendor.js',
            'build/js/app.js',
            'build/templates/*.html',
            'test/specs/**/*.js'
        ],

        frameworks: ['jasmine'],
        browsers : ['PhantomJS'],

        plugins : [
            "karma-chrome-launcher",
            "karma-firefox-launcher",
            "karma-html2js-preprocessor",
            "karma-jasmine",
            "karma-junit-reporter",
            "karma-phantomjs-launcher",
            'karma-coverage'
        ],

        junitReporter : {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};
