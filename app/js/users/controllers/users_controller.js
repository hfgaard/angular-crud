'use strict';

module.exports = function(app) {
  app.controller('usersController', ['$scope', 'RESTResource', function($scope, resource) {
    $scope.users = [];
    $scope.errors = [];
    var User = new resource('users');

    $scope.getAll = function() {
      User.get(function(err, data) {
        if (err) return $scope.errors.push({msg: 'error getting users'});
        $scope.users = data;
      });
    };

    $scope.create = function(user) {
      $scope.newUser = null;
      User.save(user, function(err, data) {
        if (err) return $scope.errors.push({msg: 'error saving user: ' + user.username});
        $scope.users.push(data);
      });
    };

    $scope.destroy = function(user) {
      User.destroy(user, function(err, data) {
        if (err) return $scope.errors.push({msg: 'error deleting user: ' + user.username});
        $scope.users.splice($scope.users.indexOf(user), 1);
      });
    };

    $scope.update = function(user) {
      User.update(user, function(err, data) {
        if (err) return $scope.errors.push({msg: 'error updating user: ' + user.username});
        user.editing = false;
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
    };
  }]);
};
