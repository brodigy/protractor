app.controller('AuthController', ['$scope', '$state',
	function ($scope, $state) {

		if (!sessionStorage.getItem('auth')) {
			$state.transitionTo('error');
		}

	}]);