'use strict';

require('angular/angular');
require('./services/services');

var userApp = angular.module('userApp', ['services']);

require('./users/users')(userApp);
