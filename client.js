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

//process command-line arguments i.e.
//$ node client.js dpritchett.no.de
var $SERVER = ( process.argv[2] || "localhost:80")
if($SERVER.search(":") == -1){
        $SERVER += ":80";
}


var client = new WebSocket('ws://' + $SERVER + '/socket.io/websocket');

// Note that decode returns an array of messages, we're just handling the first for now
client.onmessage = function(m) {
        m = ioutils.decode(m)[0];
        console.log('Got message: ' + sys.inspect(m));
        // server will drop us if we don't respond to 'heartbeats'
        // by resending the same text asap
        var heartbeat = '~h~'
                if (m.substr(0, 3) == heartbeat){
                        client.send(
                                        ioutils.encode(heartbeat + m.substr(3)));
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
