app.controller('HomeController', ['$scope', 'PostsService', 'growl',
	function ($scope, PostsService, growl) {

		$scope.posts = [];

		PostsService.getPosts()
			.success(function (data) {
				$scope.posts = angular.copy(data);
			})
			.error(function (data) {
				growl.addErrorMessage('We could not find any posts');
				console.log('error');
			});

	}]);