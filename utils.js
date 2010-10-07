// functions below are all lifted from socket.io-node
// http://github.com/LearnBoost/Socket.IO-node
// The client(message) function receives strings that look like this
//
//  ~m~4~m~~h~1
//
// * The ~m~ is a 'frame' that delineates pieces of the encoding
// * the 4 is the char count after the second frame
// * the ~h~1 is a "heartbeat" that says 'you will be disconnected if you don't send
//    ~h~1 back to me within a few seconds

var frame = '~m~';

var stringify = function (message){
        if (Object.prototype.toString.call(message) == '[object Object]'){
                return '~j~' + JSON.stringify(message);
        } else {
                return String(message);
        }
};

exports.encode = function(messages){
        var ret = '', message,
            messages = Array.isArray(messages) ? messages : [messages];
        for (var i = 0, l = messages.length; i < l; i++){
                message = messages[i] === null || messages[i] === undefined ? '' : stringify(messages[i]);
                ret += frame + message.length + frame + message;
        }
        return ret;
};

exports.decode = function(data){
        var messages = [], number, n;
        do {
                if (data.substr(0, 3) !== frame) return messages;
                data = data.substr(3);
                number = '', n = '';
                for (var i = 0, l = data.length; i < l; i++){
                        n = Number(data.substr(i, 1));
                        if (data.substr(i, 1) == n){
                                number += n;
                        } else {        
                                data = data.substr(number.length + frame.length)
                                        number = Number(number);
                                break;
                        } 
                }
                messages.push(data.substr(0, number)); // here
                data = data.substr(number);
        } while(data !== '');
        return messages;
};
// END COPY/PASTED CODE FROM SOCKET.IO



