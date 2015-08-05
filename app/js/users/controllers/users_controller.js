'use strict';

module.exports = function(app) {
  app.controller('usersController', ['$scope', '$http', function($scope, $http) {
    $scope.users = [];
    $scope.errors = [];

    $scope.getAll = function() {
      $http.get('/api/users')
        .then(function(res) {
          $scope.users = res.data;
        }, function(res) {
          console.log(res.data);
          $scope.errors.push(res.data);
        });
    };

    $scope.create = function(user) {
      $scope.newUser = null;
      $http.post('/api/users')
        .then(function(res) {

        }, function(res) {

        });
    };
  }]);
};
