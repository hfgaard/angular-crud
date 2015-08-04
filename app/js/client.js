'use strict';

require('angular/angular');

var userApp = angular.module('userApp', []);

var userController = userApp.controller('userController', ['$scope', function($scope) {
  $scope.username = 'Username';
  $scope.email = 'Email';
  $scope.password = 'Password';

  $scope.submitUser = function() {
    alert($scope.username + ' has been submitted!');
  };
}]);
