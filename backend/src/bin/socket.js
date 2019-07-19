import socketLib from 'socket.io';

export default (server) => {
  var io = socketLib(server);
  io.on('connection', (socket) => onConnect(socket));
}

function onConnect(socket) {
  socket.emit('log', 'hello from the other side');
  socket.emit('log', 'check out the code:');
  socket.emit('log', 'https://github.com/campbellcole/assassin');
}
