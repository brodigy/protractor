'use strict';

var app = angular.module('protractorApp', ['ui.router', 'angular-growl', 'ngSanitize']);

app.config(['$stateProvider', '$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/login');

		$stateProvider
			.state('login', {
				url: '/login',
				templateUrl: 'views/login.html',
				controller: 'LoginController'
			})
			.state('auth', {
				abstract: true,
				controller: 'AuthController',
				templateUrl: 'views/auth.html'
			})
			.state('home', {
				url: '/home',
				templateUrl: 'views/home.html',
				controller: 'HomeController',
				parent: 'auth'
			})
			.state('add', {
				url: '/add',
				templateUrl: 'views/add.html',
				controller: "AddPostController",
				parent: 'auth'
			})
			.state('error', {
				url: '/error',
				templateUrl: 'views/error.html',
			})
	}]);


app.config(['growlProvider', function (growlProvider) {
	growlProvider.globalTimeToLive(5000);
	growlProvider.onlyUniqueMessages(false);
	growlProvider.globalEnableHtml(true);
}]);