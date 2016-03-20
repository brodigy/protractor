app.controller('GridController', ['$scope',
    function ($scope)  {

        $scope.theGrid = {
            paginationPageSizes: [5, 10, 25],
            paginationPageSize: 5,
            columnDefs: [
                { name: 'name' },
                { name: 'gender' },
                { name: 'company' }
            ]
        };

        $scope.theGrid.data = [
            {
                "gender": "Cox",
                "name": "Carney",
                "company": "male"
            },
            {
                "gender": "Cox",
                "name": "Carney",
                "company": "male"
            },
            {
                "gender": "Cox",
                "name": "Carney",
                "company": "male"
            },
            {
                "gender": "Cox",
                "name": "Carney",
                "company": "male"
            },
            {
                "gender": "Cox",
                "name": "Carney",
                "company": "male"
            },
            {
                "gender": "Cox",
                "name": "Carney",
                "company": "male"
            },
            {
                "gender": "Cox",
                "name": "Carney",
                "company": "male"
            },
            {
                "gender": "Cox",
                "name": "Carney",
                "company": "male"
            },
            {
                "gender": "Cox",
                "name": "Carney",
                "company": "male"
            },
            {
                "gender": "Cox",
                "name": "Carney",
                "company": "male"
            },
            {
                "gender": "Cox",
                "name": "Carney",
                "company": "male"
            },
            {
                "gender": "Cox",
                "name": "Carney",
                "company": "male"
            },
            {
                "gender": "Cox",
                "name": "Carney",
                "company": "male"
            },
            {
                "gender": "Cox",
                "name": "Carney",
                "company": "male"
            }

        ];

    }]);