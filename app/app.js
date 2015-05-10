'use strict';

var app = angular.module('protractorApp', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/login');

	$stateProvider
		.state('login', {
			url: '/login',
			templateUrl: 'views/login.html',
			controller: 'LoginController'
		})
		.state('home', {
			url: '/home',
			templateUrl: 'views/home.html',
			controller: 'HomeController'
		})
		.state('add', {
			url: '/add',
			templateUrl: 'views/add.html',
			controller: "AddPostController"
		})
}]);