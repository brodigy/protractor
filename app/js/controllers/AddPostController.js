app.controller('AddPostController', ['$scope', '$state', 'PostsService', 'growl', function($scope, $state, PostsService, growl) {

	$scope.post = {title : '', message : '', author : ''};

	$scope.savePost = function() {
		console.log(angular.toJson($scope.post));
		PostsService.addPost($scope.post).then(
			function(data) {
				$state.go('home');
			},
			function(error) {
				growl.addErrorMessage('Something went wrong when saving your post');
			}
		);
	};

}]);