#
# Tasslehoff is a node-based socket.io client with aspirations to be a chatbot
# 
# contact: dpritchett@gmail.com
#          http://github.com/dpritchett
#          @dpritchett on twitter
#

sys       = require 'sys'
WebSocket = require('websocket-client').WebSocket
ioutils   = require './support/socket.io/lib/socket.io/utils.js'

#process command-line arguments i.e.
#$ node client.js dpritchett.no.de
SERVER    =  process.argv[2] || 'localhost:80'

if SERVER.search(':') is -1
        SERVER += ':80'

client    = new WebSocket "ws://#{SERVER}/socket.io/websocket"

response  =
        name: 'Tasslehoff'
        content: "I'm bored!"

#note that .onmessage automatically pongs back on heartbeat pings
#in order to avoid being dropped by the server

client.onmessage = (m) ->
        m           = ioutils.decode m    # m should be an array of strings
        heartbeat   = '~h~'

        while currMsg = m.pop()
                console.log "Got message: #{sys.inspect currMsg}"

                # server will drop us if we don't respond to 'heartbeats'
                # by resending the same text asap
                if currMsg.substr(0, 3) is heartbeat
                        client.send ioutils.encode(heartbeat + currMsg.substr(3))

# had to delay this because i was sending before the connection was up
setInterval (-> client.send ioutils.encode response), 5000
