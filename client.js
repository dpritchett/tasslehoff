(function() {
  var SERVER, WebSocket, client, ioutils, response, sys;
  sys = require('sys');
  WebSocket = require('websocket-client').WebSocket;
  ioutils = require('./support/socket.io/lib/socket.io/utils.js');
  SERVER = process.argv[2] || 'localhost:80';
  if (SERVER.search(':' === -1)) {
    SERVER += ':80';
  }
  client = new WebSocket("ws://" + (SERVER) + "/socket.io/websocket");
  response = {
    name: 'Tasslehoff',
    content: 'I\'m bored!'
  };
  client.onmessage = function(m) {
    var _result, currMsg, heartbeat;
    m = ioutils.decode(m);
    heartbeat = '~h~';
    _result = [];
    while (m.length) {
      _result.push((function() {
        currMsg = m.pop();
        console.log("Got message: " + (sys.inspect(currMsg)));
        return currMsg.substr(0, 3) === heartbeat ? client.send(ioutils.encode(heartbeat + currMsg.substr(3))) : null;
      })());
    }
    return _result;
  };
  setInterval(function() {
    return client.send(ioutils.encode(response));
  }, 5000);
}).call(this);
