'use strict';

module.exports = function(app) {
  app.factory('RESTResource', ['$http', function($http) {
    var handleError = function(callback, data) {
      return function(res) {
        console.log(res.data);
        callback(res.data);
      };
    };

    var handleSuccess = function(callback, data) {
      return function(res) {
        callback(null, res.data);
      };
    };

    return function(resourceName) {
      var handleRequest = function(method, data, callback) {
        var url = '/api/' + resourceName;
        if (data && data._id) url += '/' + data._id;
        $http({
          method: method,
          url: url,
          data: data
        })
          .then(handleSuccess(callback), handleError(callback));
      };

      return {
        get: function(callback) {
          handleRequest('GET', null, callback);
        },

        save: function(data, callback) {
          handleRequest('POST', data, callback);
        },

        update: function(data, callback) {
          handleRequest('PUT', data, callback);
        },

        destroy: function(data, callback) {
          handleRequest('DELETE', data, callback);
        }
      };
    };
  }]);
};
