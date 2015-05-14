app.controller('LoginController', ['$scope', 'AuthenticationService', '$state', 'growl',
	function ($scope, AuthenticationService, $state, growl) {

		$scope.password = '';
		$scope.username = '';
		$scope.invalidLogin = false;

		$scope.login = function() {
			AuthenticationService.login({username: $scope.username, password: $scope.password})
				.success(function (data) {
					$state.go('home');
				})
				.error(function(data) {
					$scope.invokeErrorMessage();
					console.log('Login Failed');
					$scope.invalidLogin = true;
				});
		}


		$scope.invokeErrorMessage = function() {
			growl.addErrorMessage('Login failed');
		}
	}]);