What is this?
-------------
Tasslehoff should be a server-side client for [socket.io](http://github.com/LearnBoost/Socket.IO-node) apps.  For instance, I've written a simple chatbox using socket.io that runs as its own node application and I wanted to write a chatbot that connects as a client using a completely separate node app.

How does it work?
-----------------
Tasslehoff uses pgriess's [node-websocket-client](http://github.com/pgriess/node-websocket-client) to handle the connection to socket.io and it adds a bit of socket.io-specific message handling on top of the basic websocket support.
