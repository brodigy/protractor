'use strict';

var restler = require('restler');

module.exports = {
    clearPosts: function () {

        var options = {
            headers: {'Auth' : 'password'}
        };

        var deferred = protractor.promise.defer();
        restler.get("http://localhost:9090/clear", options)
            .once('success', function (data) {
                return deferred.fulfill(data);
            }).once('error', function (data) {
                return deferred.reject(data);
            }).once('fail', function (data) {
                return deferred.reject(data);
            });

        return deferred.promise;
    }
};