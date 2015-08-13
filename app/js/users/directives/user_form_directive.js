'use strict';

module.exports = function(app) {
  app.directive('userFormDirective', function() {
    return {
      restrict: 'AC',
      replace: true,
      templateUrl: '/js/users/templates/user_form_template.html',
      scope: {
        save: '&',
        buttonText: '=',
        labelText: '=',
        user: '='
      }
    }
  });
};
