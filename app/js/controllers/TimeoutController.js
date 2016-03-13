app.controller('TimeoutController', ['$scope', '$interval', '$state',
    function ($scope, $interval, $state) {

        $scope.remainingSeconds = 5;

        $interval(function(){
            $scope.remainingSeconds --;
            if ($scope.remainingSeconds === 0) $state.go('login');
        }, 1000, 5)

    }]);