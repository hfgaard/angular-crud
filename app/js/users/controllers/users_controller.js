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
      $http.post('/api/users', user)
        .then(function(res) {
          $scope.users.push(res.data);
        }, function(res) {
          console.log(res.data);
          $scope.errors.push(res.data);
        });
    };

    $scope.destroy = function(user) {
      $http.delete('/api/users/' + user._id)
        .then(function(res) {
          $scope.users.splice($scope.users.indexOf(user), 1);
        }, function(res) {
          console.log(res.data);
          $scope.errors.push(res.data);
        });
    };

    $scope.update = function(user) {
      user.editing = false;
      $http.put('/api/users/' + user._id, user)
        .then(function(res) {

        }, function(res) {
          console.log(res.data);
          $scope.errors.push(res.data);
        });
    };

    $scope.toggleEdit = function(user) {
      if (user.editing) {
        user.username = user.usernameBackup;
        user.email = user.emailBackup;
        user.password = user.passwordBackup;
        user.usernameBackup = undefined;
        user.emailBackup = undefined;
        user.passwordBackup = undefined;
        user.editing = false;
      } else {
        user.usernameBackup = user.username;
        user.emailBackup = user.email;
        user.passwordBackup = user.password;
        user.editing = true;
      }
    }
  }]);
};
