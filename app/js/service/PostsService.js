app.factory('PostsService', ['$q', '$http', function ($q, $http) {

	var BASE_URL= 'http://localhost:9090';

	return {
		getPosts: function () {
			return $http.get(BASE_URL + '/posts')
		},
		addPost: function (post) {
			var deferred = $q.defer();

			$http.post(BASE_URL + '/publishPost', post)
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
		}
	};

}]);