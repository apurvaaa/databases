var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      db.getAllMessages(function(results) {
        callback(results);  
      });
    }, 
    post: function (message, callback) {
      db.saveMessage(message, function() {
        callback();
      });

    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      db.getAllUsers(function(results) {
        callback(results);  
      });
    }, 
    post: function (user, callback) {
      db.saveUser(user, function() {
        callback();
      });
    }
  },

  rooms: {
    get: function (callback) {
      db.getAllRooms(function(results) {
        callback(results);  
      });
    }, 
    post: function (room, callback) {
      db.getRooms(room, function() {
        callback();
      });
    }
  },
};

