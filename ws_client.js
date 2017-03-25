const WebSocket = require('ws');
const ws = new WebSocket('https://17790942.ngrok.io ');

ws.on('open', function open() {
  console.log('connected');
});

ws.on('message', function incoming(data, flags) {
  console.log(data);
});

ws.on('close', function close() {
  console.log('closed');
});
