app.controller('LoginController', ['$scope', 'AuthenticationService', '$state', 'growl',
	function ($scope, AuthenticationService, $state, growl) {

		$scope.password = '';
		$scope.email = '';

		$scope.login = function () {
			AuthenticationService.login({email: $scope.email, password: $scope.password})
				.success(function (data) {
					growl.addSuccessMessage('Login successful');
					$state.go('home');
				})
				.error(function (data) {
					growl.addErrorMessage('Login failed');
					console.log('Login Failed');
				});
		};


		$scope.isFormInvalid = function () {
			return ($scope.loginForm.email.$dirty && !$scope.loginForm.email.$valid)
				|| ($scope.loginForm.password.$dirty && !$scope.loginForm.password.$valid);
		};

		$scope.isReadyToSave = function () {
			return $scope.loginForm.$valid;
		};

	}]);