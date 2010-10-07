/*
 * Tasslehoff is a node-based socket.io client with aspirations to be a chatbot
 * 
 * contact: dpritchett@gmail.com
 *          http://github.com/dpritchett
 *          @dpritchett on twitter
 */
var sys = require('sys'),
    WebSocket = require('websocket-client').WebSocket,
    ioutils = require('./support/socket.io/lib/socket.io/utils.js');

var client = new WebSocket('ws://localhost:80/socket.io/websocket');

// Note that decode returns an array of messages, we're just handling the first for now
client.onmessage = function(m) {
        m = ioutils.decode(m)[0];
        console.log('Got message: ' + sys.inspect(m));
        if (m.substr(0, 3) == '~h~'){
                client.send(
                                ioutils.encode('~h~' + m.substr(3)));
        }
};

// had to delay this because i was sending before the connection was up
setTimeout( function() {
        client.send(
                ioutils.encode(
                        { content: "I'm bored!", name: "Tasslehoff" }
                        )
                );
},
1000);
