'use strict';

module.exports = function(app) {
  require('./directives/user_form_directive')(app);
  require('./controllers/users_controller')(app);
};
