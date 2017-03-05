var mysql = require('mysql');

var connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'chat'
});

connection.connect(function (err) {
  if (err) {
    console.err('error connecting : ', err);
    return;
  }
  console.log('connected to database : ', connection.threadId);
});

module.exports = {
  getAllMessages: function(callback) {
    var sql = 'SELECT m.id, m.text, r.roomName, u.userName from messages as m LEFT OUTER JOIN rooms as r on (m.roomId = r.id) LEFT OUTER JOIN users as u on (u.id = m.userId)';
    connection.query(sql, function(error, results) {
      if (error) {
        console.err('error while fetching messages from db : ', error);
        throw error;
      } 
      console.log('results while getting : ', results);
      callback(results);
    });
  },

  saveMessage: function(message, callback) {
    var sql = 'INSERT INTO messages(text, userId, roomId) \
               value(?, (select id from users where userName = ? limit 1), (select id from rooms where roomName = ? limit 1))';
    connection.query(sql, message, function(error, results) {
      if (error) {
        console.err('error while saving a message into db : ', error);
        throw error;
      } 
      callback();
    });
  },

  getUser: function(callback) {
    var sql = 'SELECT * from users';
    connection.query(sql, function(error, results) {
      if (error) {
        console.err('error while fetching user from db : ', error);
        throw error;
      } 
      callback(results);
    });
  },

  saveUser: function(user, callback) {
    var sql = 'INSERT INTO users(userName) values (?)';
    connection.query(sql, user, function(error) {
      if (error) {
        console.err('error while saving a user into db : ', error);
        throw error;
      } 
      callback();
    });
  },

  getRoom: function(callback) {
    var sql = 'SELECT * from rooms';
    connection.query(sql, function(error, results) {
      if (error) {
        console.err('error while fetching room from db : ', error);
        throw error;
      } 
      callback(results);
    });
  },

  saveRoom: function(user, callback) {
    var sql = 'INSERT INTO rooms(roomName) values(?)';
    connection.query(sql, user, function(error) {
      if (error) {
        console.err('error while saving a room into db : ', error);
        throw error;
      } 
      callback();
    });
  }

};

