var sys = require('sys');
var WebSocket = require('websocket-client').WebSocket;

var ws = new WebSocket('ws://dpritchett.no.de');
ws.addListener('data', function(buf) {
        console.log('Got data: ' + console.log(buf));
});
ws.onmessage = function(m) {
        console.log('Got message: ' + m);
}
