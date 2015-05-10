app.factory('AuthenticationService', ['$q', '$http', function($q, $http) {

	return {
		login : function(credentials) {
			return $http.get('http://localhost:9090/login', {
					params: {
						username: credentials.username,
						password: credentials.password
					}
			});
		}
	};

}]);