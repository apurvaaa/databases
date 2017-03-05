var models = require('../models');

//var request = require('request');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function(messages) {  
        // res.sendStatus(200);
        res.send(messages);
        console.log('success at messages get');
      });
    },
    post: function (req, res) {
      console.log('inside post', req.body);
      var message = [req.body.text, req.body.userName, req.body.roomName];    
      models.messages.post(message, function() {
        console.log('success at messages get');
        res.sendStatus(201);
      });
    } 
  },

  users: {
    get: function (req, res) {
      models.users.get(function(user) {
        res.json(user);
        console.log('in user get: ', user);
      });
    },
    post: function (req, res) {
      var user = [req.body.userName];    
      models.users.post(user, function() {
        console.log('post user done : ');
        res.sendStatus(201);
      });
    } 
  },

  rooms: {
    get: function (req, res) {
      models.rooms.get(function(room) {
        res.json(room);
        
      });
    },
    post: function (req, res) {
      var room = [req.body.roomName];    
      models.rooms.post(room, function() {
        console.log('post room unsuccessful');
        res.sendStatus(201);
      });
    } 
  },
};

