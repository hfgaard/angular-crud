'use strict';

require('../../app/js/client.js');
require('angular-mocks');

describe('users controller', function() {
  var $ControllerConstructor;
  var $httpBackend;
  var $scope;

  beforeEach(angular.mock.module('userApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var usersController = $ControllerConstructor('usersController', {$scope: $scope});
    expect(typeof usersController).toBe('object');
    expect(typeof $scope.getAll).toBe('function');
    expect(Array.isArray($scope.users)).toBe(true);
  });

  describe('REST functionality', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructor('usersController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a get request when getAll is called', function() {
      $httpBackend.expectGET('/api/users').respond(200, [{username: 'test', email: 't@t.com', password: '123', _id: 1}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.users.length).toBe(1);
      expect($scope.users[0].username).toBe('test');
      expect($scope.users[0]._id).toBe(1);
    });

    it('should make a post request when create is called', function() {
      var testUser = {username: 'test2', email: 'b@b.com', password: '123', _id: 2};
      $scope.newUser = testUser;
      expect($scope.users.length).toBe(0);
      $httpBackend.expectPOST('/api/users').respond(200, {username: 'test', email: 'a@a.com', password: '123', _id: 1});
      $scope.create(testUser);
      expect($scope.newUser).toBe(null);
      $httpBackend.flush();
      expect($scope.users.length).toBe(1);
      expect($scope.users[0].username).toBe('test');
      expect($scope.users[0]._id).toBe(1);
    });

    it('should make a put request when update is called', function() {
      var user = {_id: 1, editing: true};
      $httpBackend.expectPUT('/api/users/1').respond(200);
      $scope.update(user);
      $httpBackend.flush();
      expect(user.editing).toBe(false);
    });

    it('should make a delete request when destroy is called', function() {
      var user = {username: 'test', email: 'c@c.com', password: 123, _id: 1};
      $scope.users = [{username: 'second test', _id: 2}, user, {username: 'third test', _id: 3}];
      $httpBackend.expectDELETE('/api/users/1').respond(200);
      $scope.destroy(user);
      $httpBackend.flush();
      expect($scope.users.length).toBe(2);
      expect($scope.users.indexOf(user)).toBe(-1);
      expect($scope.users[0].username).toBe('second test');
      expect($scope.users[1].username).toBe('third test');
    });
  });
});
