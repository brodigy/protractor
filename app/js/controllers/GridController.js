app.controller('GridController', ['$scope', 'AuthenticationService', 'growl', '$state',
    function ($scope, AuthenticationService, growl, $state) {

        $scope.user = {
            username: '',
            firstName: '',
            lastName: '',
            gender: 'Select Gender',
            password: ''
        };

        $scope.selectGender = function (val) {
            $scope.user.gender = val;
        };

        $scope.isFormInvalid = function () {
            return ($scope.userForm.username.$dirty && !$scope.userForm.username.$valid)
                || ($scope.userForm.password.$dirty && !$scope.userForm.password.$valid);
        };

        $scope.isReadyToSave = function () {
            return $scope.userForm.$valid;
        };

        $scope.saveUser = function () {
            console.log(angular.toJson($scope.user));
            AuthenticationService.saveUser($scope.user).then(
                function (data) {
                    $state.go('grid', {}, {reload: true});
                },
                function (error) {
                    growl.addErrorMessage('Something went wrong when saving your user');
                }
            );
        };

        $scope.theGrid = {
            paginationPageSizes: [5, 10, 25],
            paginationPageSize: 5,
            columnDefs: [
                {name: 'username'},
                {name: 'firstName'},
                {name: 'lastName'},
                {name: 'gender'},
                {name: 'password'}
            ]
        };

        var init = function () {
            AuthenticationService.getUsers().then(
                function (data) {

                    if (data.data.length != 0) {
                        $scope.theGrid.data = data.data;
                    }

                },
                function (error) {
                    growl.addErrorMessage('Something went wrong when getting users');
                }
            );
        };
        init();

    }]);