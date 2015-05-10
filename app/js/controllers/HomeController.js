app.controller('HomeController', ['$scope', 'PostsService',
	function ($scope, PostsService) {

		$scope.posts = [];



		PostsService.getPosts()
			.success(function (data) {
				$scope.posts = angular.copy(data);
				console.log('success', data);
			})
			.error(function (data) {
				console.log('error', data);
			});

	}])