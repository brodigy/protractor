app.factory('AuthenticationService', ['$q', '$http', function($q, $http) {

	return {
		login : function(credentials) {
			return $http.get('http://localhost:9090/login', {
					params: {
						email: credentials.email,
						password: credentials.password
					}
			});
		}
	};

}]);