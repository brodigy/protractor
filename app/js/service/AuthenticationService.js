app.factory('AuthenticationService', ['$q', '$http', function($q, $http) {

    var BASE_URL= 'http://localhost:9090';

	return {
		login : function(credentials) {
			return $http.get(BASE_URL + '/login', {
					params: {
						email: credentials.email,
						password: credentials.password
					}
			});
		},
		saveUser: function (user) {
			var deferred = $q.defer();

			$http.post(BASE_URL + '/saveUser', user)
				.success(function (data) {
					var result = {};
					if (data) {
						result = angular.fromJson(data);
					}
					deferred.resolve(result);
				})
				.error(function (data) {
					deferred.reject(angular.fromJson(data));
				});
			return deferred.promise;
		},
        getUsers: function () {
            return $http.get(BASE_URL + '/users')
        },
	};

}]);