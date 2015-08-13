'use strict';

require('angular/angular');
require('angular-route');
require('./services/services');

var userApp = angular.module('userApp', ['services', 'ngRoute']);

require('./users/users')(userApp);

userApp.config(['$routeProvider', function($route) {
  $route
    .when('/users', {
      templateUrl: '/js/users/templates/index_view.html',
      controller: 'usersController'
    })
    .otherwise({
      redirectTo: '/users'
    });
}]);
