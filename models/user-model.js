'use strict';

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: {type: String, required: true},
  email: String,
  password: {type: String, required: true}
});

module.exports = mongoose.model('User', userSchema);
