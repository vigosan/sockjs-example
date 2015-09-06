var http = require('http');
var sockjs = require('sockjs');

var messages = [
  { latitude: '38.9908448', longitude: '-0.5218106', message: 'Ada logged in' },
  { latitude: '48.8588589', longitude: '2.3470599', message: 'Allen logged in' },
  { latitude: '22.3593251', longitude: '114.1408686', massage: 'Gena logged in' },
  { latitude: '-33.7969235', longitude: '150.9224326', message: 'Tomster in the house' }
]

var socketServer = sockjs.createServer();
socketServer.on('connection', perodicallyWrite);

function perodicallyWrite(conn) {
  var index = 0;
  var writeMessage = function() {
    conn.write(messages[index]);
    index = nextIndex(index);
  };

  setInterval(writeMessage, 3000);
}

function nextIndex(index) {
  return index === (messages.length - 1) ? 0 : index + 1;
}

var server = http.createServer();
socketServer.installHandlers(server, { prefix:'/notifications' });
server.listen(8080, '0.0.0.0');
