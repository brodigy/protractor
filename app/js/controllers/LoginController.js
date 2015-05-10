app.controller('LoginController', ['$scope', 'AuthenticationService', '$state',
	function ($scope, AuthenticationService, $state) {

		$scope.password = '';
		$scope.username = '';

		$scope.login = function() {
			AuthenticationService.login({username: $scope.username, password: $scope.password})
				.success(function (data) {
					console.log('success', data);
					$state.go('home');
				})
				.error(function(data) {
					console.log('error', data);
				});

		}
	}]);