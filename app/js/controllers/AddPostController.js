app.controller('AddPostController', ['$scope', '$state', 'PostsService', function($scope, $state, PostsService) {

	$scope.post = {title : '', message : '', author : ''};

	$scope.savePost = function() {
		console.log(angular.toJson($scope.post));
		PostsService.addPost($scope.post).then(
			function(id) {
				console.log('success');
				//$state.go('home');
			},
			function(error) {
				console.log('error');
				//$state.go('login');
			}
		);
	};

}]);