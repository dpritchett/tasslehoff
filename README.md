What is this?
-------------
Tasslehoff should be a server-side client for [socket.io](http://github.com/LearnBoost/Socket.IO-node) apps.  For instance, I've written a [simple chatbox](http://github.com/dpritchett/chatbox) using socket.io that runs as its own node application and I wanted to write a chatbot that connects as a client using a completely separate node app.

How does it work?
-----------------
Tasslehoff uses pgriess's [node-websocket-client](http://github.com/pgriess/node-websocket-client) to handle the connection to socket.io and it adds a bit of socket.io-specific message handling on top of the basic websocket support.

INSTALL
-------
* `$ git clone git://github.com/dpritchett/tasslehoff.git --recursive`
* `$ cd tasslehoff`

Do a test run!
--------------
* `$ node client.js dpritchett.no.de`
* Open [dpritchett.no.de](http://dpritchett.no.de) in a browser to see your client spamming the chatroom via socket.io.

