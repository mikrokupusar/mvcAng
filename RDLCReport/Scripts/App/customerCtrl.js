(function () {
    'use strict';
    //create angularjs controller
    var app = angular.module('app', []); //set and get the angular module
    app.controller('customerController', ['$scope', '$http', customerController]);

    //angularjs controller method
    function customerControler($scope, $http) {

        //declare var for main ajax load and entry or edit mode
        $scope.loading = true;
        $scope.addMode = false;

        //get all customer info
        $http.get('/api/Customer/').success(function (data) {
            $scope.customers = data;
            $scope.loading = false;
        })
        .error(function () {
            $scope.error = "An Error has occured while loading posts";
            $scope.loading = false;
        });

        //by pressing toggleEdit button ng-click in html this method will be hit
        $scope.toggleEdit = function () {
            this.customer.editMode = !this.customer.editMode;
        };

        //by pressing toggleAdd button
        $scope.toggleAdd = function () {
            $scope.addMode = !$scope.addMode;
        };

        //Insert customer
        $scope.add = function () {
            $scope.loading = true;
            $http.post('/api/Customer/', this.newcustomer).success(function (data) {
                alert("Added Successfully!");
                $scope.addMode = false;
                $scope.customers.push(data);
                $scope.loading = false;
            })
            .error(function (data) {
                $scope.error = "An Error has occured while adding customer " + data;
                $scope.loading = false;
            });
        };

        //Edit customer
        $scope.save = function () {
            alert("Edit");
            $scope.loading = true;
            var frien = this.customer;
            alert(frien);
            $http.put('/api/Customer/' + frien.Id, frien).success(function (data) {
                alert("Saved Successfully.");
                frien.editMode = false;
                $scope.loading = false;
            }).error(function (data) {
                $scope.error = "An Error has occured while editing customer " + data;
                $scope.loading = false;
            });
        };
        //Delete customer
        $scope.deleteCustomer = function () {
            $scope.loading = true;
            var Id = this.customer.Id;
            $http.delete('/api/Customer' + Id).success(function (data) {
                alert('Deleted Successfully.');
                $.each($scope.customers, function (i) {
                    if ($scope.customers[i].Id === Id) {
                        $scope.customers.splice(i, 1);
                        return false;
                    }
                });
                $scope.loading = false;
            }).error(function (data) {
                $scope.error = "An Error has occured while deleting customer " + data;
                $scope.loading = false;
            });
        };
    }
})();