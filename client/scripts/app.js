var app = {
  server: 'http://127.0.0.1:3000/classes/messages',
  //lastUpdated: new Date()
};

app.init = function() {
  console.log(app.lastUpdated);
  app.fetch();
  $('#chats').on('click', '.username', function(e) {
    app.handleUsernameClick($(e.target).text());
  });
  $('#send').on('submit', app.handleSubmit);
  $('#send').on('click', app.handleSubmit);
  $('#room').on('change', app.selectRoom);
  $('#createRoom').on('click', app.createRoom);
  setInterval(app.fetchNewest, 5000);
};

// ajax calls
app.send = function(message) {
  $.ajax({
    url: app.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log(data);
    },
    error: function (data) {
      console.error('chatterbox: Failed to post message');
    }
  });
};

app.fetch = function() { 
  $.ajax({
    url: app.server,
    type: 'GET',
    contentType: 'application/json',
    // data: 'order=-createdAt',
    success: function(data) {
      displayData(data);
    },
    error: function (data) {
      console.error('chatterbox: Failed to get messages');
    }
  });
};

app.fetchNewest = function() {
  $.ajax({
    url: app.server,
    type: 'GET',
    contentType: 'application/json',
    // data: 'order=-createdAt',
    dataFilter: function(data) {
      console.log('data in fetch newest', data);
      console.log('type of data', typeof data);
      var dataObject = JSON.parse(data);
      console.log('dataobject in fetch newest', dataObject);
      var dataArray = [];
      var dataOuputObject = {};
      for (var i = 0; i < dataObject.length; i++) {
        var messageDate = new Date(dataObject[i].createdAt);  
        if (messageDate > app.lastUpdated) {
          dataArray.push(dataObject[i]);
        }
      }
      dataOuputObject.results = dataArray;
      return JSON.stringify(dataOuputObject);
    },
    success: function(data) {
      displayData(data);
      app.lastUpdated = new Date();
    },
    error: function (data) {
      console.error('chatterbox: Failed to get messages');
    }
  });
};

function displayData(data) {
  console.log('data in display data : ', data);
  data.results.forEach(m => $('#chats').prepend('<div class="message ' + m.roomname + ' ' + m.username + '">' + '<div class="username">@' + 
    htmlDecode(m.username) + '</div>' + htmlDecode(m.text) + '</div>'));
  var rooms = [];
  data.results.forEach(m => rooms.push(htmlDecode(m.roomname)));
  var uniqueRooms = rooms.filter(function(item, pos) {
    return rooms.indexOf(item) === pos;
  });

  var currentRooms = [];
  $('#room option').each(function() {
    currentRooms.push($(this).text());
  });

  if (currentRooms.length === 0) {
    $.each(uniqueRooms, function(i, item) {
      $('#room').append($('<option>', {
        value: 'roomname',
        text: item
      }));
    });
  } else {
    $.each(uniqueRooms, function(i, item) {
      if (currentRooms.indexOf(item) === -1) {
        $('#room').append($('<option>', {
          value: 'roomname',
          text: item
        }));
      }
    });
    
  }
}

// page rendering
app.clearMessages = function() {
  $('#chats').html('');
};

app.renderMessage = function(message) {
  $('#chats').prepend('<div class="message ' + message.roomname + ' ' + message.username + '">' 
    + '<div class="username">@' + message.username + '</div>' + message.text + '</div>');
};

app.renderRoom = function(room) {
  $('#room').append('<div>' + room + '</div>');

};

app.handleUsernameClick = function(username) {
  username = username.slice(1);
  $('.' + username).css('font-weight', 'bold');
  $('.' + username).css('background-color', '#ADD8E6');
};

app.handleSubmit = function() {
  var messageText = htmlDecode($('#message').val());
  var username = window.location.search.substring(10);
  var room = $('#room option:selected').text();
  var message = { 'username': username, 'text': messageText, 'roomname': !room ? 'lobby' : room };
  app.send(message);
  app.renderMessage(message);
};

app.selectRoom = function() {
  var room = $('#room option:selected').text();
  $('.message').hide();
  $('.' + room).show();
};

app.createRoom = function() {
  $('#room').append($('<option>', {
    value: 'roomname',
    text: htmlDecode($('#roomName').val())
  }));
};

// XSS handling
function htmlEncode(value) {
  return $('<div/>').text(value).html();
}

function htmlDecode(value) {
  return $('<div/>').html(value).text();
}
