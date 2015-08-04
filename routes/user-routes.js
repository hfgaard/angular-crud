'use strict';

var bodyParser = require('body-parser');
var User = require(__dirname + '/../models/user-model');

module.exports = function(router) {
  router.use(bodyParser.json());
  
  router.get('/users', function(req, res) {
    User.find({}, function(err, data) {
      if (err) {
        return res.status(404).json({msg: 'Error'});
      }
      res.json(data);
    });
  });

  router.get('/users/:id', function(req, res) {
    User.find({'_id': req.params.id}, function(err, data) {
      if (err) {
        return res.status(404).json({msg: 'Error'});
      }
      res.json(data);
    });
  });

  router.post('/users', function(req, res) {
    var user = new User(req.body);
    user.save(function(err) {
      if (err) {
        return res.status(400).json({msg: 'User failed to save.'});
      }
      res.json(req.body);
    });
  });

  router.put('/users/:id', function(req, res) {
    User.update({'_id': req.params.id}, req.body, function(err, data) {
      if (err) {
        return res.status(404).json({msg: 'Error'});
      }
      res.json({msg: 'User has been updated'});
    });
  });

  router.delete('/users/:id', function(req, res) {
    User.remove({'_id': req.params.id}, function(err, data) {
      if (err) {
        return res.status(404).json({msg: 'Error'});
      }
      res.json({msg: 'User has been removed'});
    });
  });
};
