var sys = require('sys'),
    WebSocket = require('websocket-client').WebSocket;

var frame = '~m~';

function stringify(message){
  if (Object.prototype.toString.call(message) == '[object Object]'){
    return '~j~' + JSON.stringify(message);
  } else {
    return String(message);
  }
};

var encode = function(messages){
  var ret = '', message,
      messages = Array.isArray(messages) ? messages : [messages];
  for (var i = 0, l = messages.length; i < l; i++){
    message = messages[i] === null || messages[i] === undefined ? '' : stringify(messages[i]);
    ret += frame + message.length + frame + message;
  }
  return ret;
};

var client = new WebSocket('ws://localhost:80/socket.io/websocket');
client.send(encode('from client'));

client.onmessage = function(m) {
	console.log('Got message: ' + sys.inspect(m));
};

