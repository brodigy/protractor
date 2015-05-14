app.factory('Interceptor', ['$injector', '$q', function ($injector, $q) {

	return {
		'request': function (config) {
			var key = sessionStorage.getItem('auth');
			if (key != null && config.url.indexOf('login') === -1) {
				config.headers.Auth = key;
			}
			return config || $q.when(config);
		},
		'response': function (response) {
			var auth = response.data.token;

			if (auth != null) {
				sessionStorage.setItem('auth', auth);
			}

			return response || $q.when(response);

		},
		'responseError': function (rejection) {
			if (rejection.status === 401) {
				sessionStorage.clear();
				$injector.get('$state').go('error');
			}
			return $q.reject(rejection);
		}

	};

}]);

app.config(['$httpProvider', function ($httpProvider) {
	$httpProvider.interceptors.push('Interceptor');
}]);
